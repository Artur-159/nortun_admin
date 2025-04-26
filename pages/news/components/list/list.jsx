import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NewsAPI } from "../../../../services/news";
import { setModalOpen } from "../../../../store/modal/slice";
import params from "../../../../helpers/params";
import MainButton from "../../../../components/button/button";
import BasicModal from "../../../../components/modal/modal";
import { Edit, Delete } from "@mui/icons-material";
import Pagination from "../../../../components/pagination/pagination";
import { setOneNews } from "../../../../store/news/slice";
import { setMediaList } from "../../../../store/image/slice";

import styles from "../../styles.module.scss";

const List = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { offset } = useSelector((state) => state.pagination);
  const { news, total } = useSelector((state) => state.news);

  const handleEdit = (id) => {
    dispatch(NewsAPI.getOne(id));
    navigate(`${id}`);
  };

  const handleDelete = async (id) => {
    await dispatch(NewsAPI.remove(id)).unwrap();
    await dispatch(NewsAPI.getAll(params(20, offset * 20))).unwrap();

    dispatch(setModalOpen(false));
  };

  useEffect(() => {
    dispatch(NewsAPI.getAll(params(20, offset * 20)));
    dispatch(setOneNews(null));
  }, [dispatch, offset]);

  useEffect(() => {
    dispatch(setMediaList({}));
  }, [dispatch]);

  return (
    <>
    <div className={styles.list_block}>
      {news?.length > 0 &&
        news.map((item) => (
          <div key={item.id} className={styles.news_item}>
            <div>
              {item?.id}. {item?.title_en}
            </div>
            <div className={styles.action_btns}>
              <MainButton
                variant="outlined"
                startIcon={<Edit />}
                onClick={() => handleEdit(item.id)}
              >
                Edit
              </MainButton>

              <BasicModal
                color="error"
                title="Delete"
                variant="contained"
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
                  onClick={() => handleDelete(item.id)}
                  className={styles.home_banner}
                >
                  Delete
                </MainButton>
              </BasicModal>
            </div>
          </div>
        ))}
    </div>
      <Pagination total={total} offset={offset} />
    </>
  );
};

export default List;
