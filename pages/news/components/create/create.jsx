import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form from "../form/form";
import MainButton from "../../../../components/button/button";
import Back from "../../../../components/back-btn/back-btn";
import Toast from "../../../../helpers/status-text";
import { DEFAULT_VALUES } from "../../../../constant/news";
import { NewsAPI } from "../../../../services/news";
import { validationSchema } from "../validation/validation";
import { yupResolver } from "@hookform/resolvers/yup";

import styles from "./styles.module.scss";

const Create = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mediaList } = useSelector((state) => state.image);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = handleSubmit(async (formData) => {
    try {
      formData.image_am = mediaList?.am ? mediaList.am[0] : null;
      formData.image_en = mediaList?.en ? mediaList.en[0] : null;
      formData.image_ru = mediaList?.ru ? mediaList.ru[0] : null;
      formData.detailed_image = mediaList?.detailed_image
        ? mediaList?.detailed_image[0]
        : null;

      await dispatch(NewsAPI.create(formData)).unwrap();
      navigate("/news");
      Toast.success("Successfully created");
    } catch (error) {
      Toast.error(error.message);
    }
  });

  return (
    <div className={styles.create_news}>
      <Back />
      <h1 className={styles.title}>Create news</h1>
      <Form control={control} errors={errors} mediaList={mediaList} />
      <MainButton
        type="submit"
        onClick={onSubmit}
        variant="contained"
        className={styles.create_btn}
      >
        Create news
      </MainButton>
    </div>
  );
};

export default Create;
