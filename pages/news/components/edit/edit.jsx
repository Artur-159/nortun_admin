import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import MainButton from "../../../../components/button/button";
import Form from "../form/form";
import { NewsAPI } from "../../../../services/news";
import Back from "../../../../components/back-btn/back-btn";
import Toast from "../../../../helpers/status-text";
import { setMediaList } from "../../../../store/image/slice";

const Edit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { oneNews } = useSelector((state) => state.news);
  const { mediaList } = useSelector((state) => state.image);

  const defaultValues = oneNews ? { ...oneNews } : {};

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const onSubmit = handleSubmit(async (formData) => {
    try {
      formData.image_am = mediaList?.am ? mediaList.am[0] : null;
      formData.image_en = mediaList?.en ? mediaList.en[0] : null;
      formData.image_ru = mediaList?.ru ? mediaList.ru[0] : null;
      formData.detailed_image = mediaList?.detailed_image
        ? mediaList?.detailed_image[0]
        : null;

      await dispatch(NewsAPI.update(formData)).unwrap();
      Toast.success("Successfully updated");
      navigate("/news");
    } catch (error) {
      Toast.error(error.message);
    }
  });

  useEffect(() => {
    (async () => {
      try {
        await dispatch(NewsAPI.getOne(id)).unwrap();
      } catch (error) {
        Toast.error(error.message);
      }
    })();
  }, [dispatch, id]);

  useEffect(() => {
    if (oneNews) {
      reset(oneNews);
      dispatch(
        setMediaList({
          am: oneNews.image_am ? [oneNews.image_am] : [],
          en: oneNews.image_en ? [oneNews.image_en] : [],
          ru: oneNews.image_ru ? [oneNews.image_ru] : [],
          detailed_image: oneNews.detailed_image
            ? [oneNews.detailed_image]
            : [],
        })
      );
    }
  }, [dispatch, oneNews, reset]);

  return (
    <div>
      <Back />
      <h1>Edit news</h1>
      <Form control={control} errors={errors} mediaList={mediaList} />
      <MainButton onClick={onSubmit} type="submit" variant="contained">
        Edit news
      </MainButton>
    </div>
  );
};

export default Edit;
