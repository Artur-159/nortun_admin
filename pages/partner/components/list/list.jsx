import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PartnerAPI } from "../../../../services/partner";
import { setModalOpen } from "../../../../store/modal/slice";
import params from "../../../../helpers/params";
import MainButton from "../../../../components/button/button";
import BasicModal from "../../../../components/modal/modal";
import { Edit, Delete } from "@mui/icons-material";

import styles from "../../styles.module.scss";

const List = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { partners } = useSelector((state) => state.partner);

  const handleEdit = (id) => navigate(`${id}`);

  const handleDelete = async (id) => {
    try {
      await dispatch(PartnerAPI.delete(id)).unwrap();
      await dispatch(PartnerAPI.getAll(params())).unwrap();
      dispatch(setModalOpen(false));
    } catch (error) { }
  };

  useEffect(() => {
    (async () => {
      await dispatch(PartnerAPI.getAll(params())).unwrap();
    })();
  }, [dispatch]);

  return (
    <>
      <div className={styles.list_block}>
        {partners?.length > 0 &&
          partners.map((item, index) => (
            <div key={index} className={styles.list}>

              <div className={styles.list__btn}>
                <div>{item?.title}</div>
                <div className={styles.btn_block}>

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
                    title="Delete"
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

            </div>
          ))}
      </div>
    </>
  );
};

export default List;
