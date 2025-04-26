import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PartnerAPI } from "../../../../services/partner";
import MainButton from "../../../../components/button/button";
import Form from "../form/form";
import Toast from "../../../../helpers/status-text";
import Back from "../../../../components/back-btn/back-btn";

import styles from "./styles.module.scss";

const Create = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mediaList } = useSelector((state) => state.image);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      active: false,
      sort_number: "",
      url: "",
      image: "",
      images: "",
    },
  });

  const onSubmit = handleSubmit(async (formData) => {
    try {
      formData.images = mediaList.images;
      formData.image = mediaList.main_image[0];

      await dispatch(PartnerAPI.create(formData)).unwrap();
      Toast.success("Story created successfully");
      navigate("/partner");
    } catch (error) {
      Toast.error(error.message);
    }
  });

  return (
    <div className={styles.create_partner}>
      <Back />
      <h1 className={styles.title}>Create Partner</h1>
      <Form control={control} mediaList={mediaList} />
      <MainButton
        onClick={onSubmit}
        type="submit"
        className={styles.create_btn}
      >
        Create Partner
      </MainButton>
    </div>
  );
};

export default Create;
