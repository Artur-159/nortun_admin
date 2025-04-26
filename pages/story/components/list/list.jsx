import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StoryAPI } from "../../../../services/story";
import { setModalOpen } from "../../../../store/modal/slice";
import params from "../../../../helpers/params";
import MainButton from "../../../../components/button/button";
import BasicModal from "../../../../components/modal/modal";
import { Edit, Delete } from "@mui/icons-material";

import styles from "../../styles.module.scss";

const List = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { storiesList } = useSelector((state) => state.story);

  const handleEdit = (id) => navigate(`${id}`);

  const handleDelete = async (id) => {
    try {
      await dispatch(StoryAPI.deleteStory(id)).unwrap();
      await dispatch(StoryAPI.getStories(params())).unwrap();
      dispatch(setModalOpen(false));
    } catch (error) {}
  };

  useEffect(() => {
    (async () => {
      await dispatch(StoryAPI.getStories(params())).unwrap();
    })();
  }, [dispatch]);

  return (
    <>
      {storiesList?.length > 0 &&
        storiesList.map((item) => (
          <div key={item.id} className={styles.home__banner__list}>
            <div>{item?.name}</div>
            <div className={styles.home__banner__list__btn}>
              <MainButton
                variant="outlined"
                startIcon={<Edit />}
                onClick={() => handleEdit(item.id)}
              >
                Edit
              </MainButton>

              <BasicModal
                color="error"
                variant="contained"
                title="Delete Story"
                startIcon={<Delete />}
              >
                <p>
                  Are you sure you want to delete this story? This action cannot
                  be undone.
                </p>
                <MainButton
                  color="error"
                  variant="contained"
                  startIcon={<Delete />}
                  className={styles.home_banner}
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </MainButton>
              </BasicModal>
            </div>
          </div>
        ))}
    </>
  );
};

export default List;
