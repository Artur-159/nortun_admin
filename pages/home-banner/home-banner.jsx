import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import MainButton from "../../components/button/button";
import { HomeAPI } from "../../services/home";
import params from "../../helpers/params";
import BasicModal from "../../components/modal/modal";
import { setModalOpen } from "../../store/modal/slice";
import { Add, Edit, Delete } from "@mui/icons-material";
import Toast from "../../helpers/status-text";

import styles from "./styles.module.scss";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list } = useSelector((state) => state.home);

  const handlerLinkClick = () => navigate("create");
  const editHandler = (id) => navigate(`${id}`);

  const deleteHandler = async (id) => {
    try {
      await dispatch(HomeAPI.deleteHomeBanner(id)).unwrap();
      await dispatch(HomeAPI.getHomeBanners(params())).unwrap();
      dispatch(setModalOpen(false));
    } catch (error) {
      Toast.error(error.message);
    }
  };

  useEffect(() => {
    (async () => {
      await dispatch(HomeAPI.getHomeBanners(params())).unwrap();
    })();
  }, [dispatch]);

  return (
    <div className={styles.home}>
      <h1>Home</h1>

      <h3>Banner</h3>
      <MainButton
        onClick={handlerLinkClick}
        startIcon={<Add />}
        variant={"contained"}
      >
        Create
      </MainButton>
      <div>
        {!list?.length ? (
          <h4>empty...🥲</h4>
        ) : (
          list?.map((item) => (
            <div key={item.id} className={styles.home__banner__list}>
              <div>
                <div>{item?.name}</div>
              </div>
              <div className={styles.home__banner__list__btn}>
                <MainButton
                  variant="outlined"
                  startIcon={<Edit />}
                  onClick={() => editHandler(item.id)}
                >
                  Edit
                </MainButton>

                <BasicModal
                  variant="contained"
                  title="Delete"
                  color="error"
                  startIcon={<Delete />}
                >
                  <p>
                    Are you sure you want to proceed with this action? This
                    action cannot be undone.
                  </p>
                  <MainButton
                    color="error"
                    variant="contained"
                    startIcon={<Delete />}
                    onClick={() => deleteHandler(item.id)}
                    className={styles.home_banner}
                  >
                    Delete
                  </MainButton>
                </BasicModal>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
