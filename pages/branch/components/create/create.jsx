import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BranchAPI } from "../../../../services/branch";
import Toast from "../../../../helpers/status-text";
import MainButton from "../../../../components/button/button";
import Form from "../form/form";

import styles from "./styles.module.scss";

const Create = () => {
  let dispatch = useDispatch();
  const navigate = useNavigate();

  const { mediaList } = useSelector((state) => state.image);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      active: false,
      sort_number: "",
      title: "",
      image: "",
      images: "",
      coordinate_x: "",
      coordinate_y: "",
      address_am: "",
      address_en: "",
      address_ru: "",
      working_hours_am: "",
      working_hours_en: "",
      working_hours_ru: "",
    },
  });

  const onSubmit = handleSubmit(async (formData) => {
    formData.images = mediaList.images;
    formData.image = mediaList.main_image[0];
    try {
      await dispatch(BranchAPI.create(formData)).unwrap();
      Toast.success("Branch created successfully");
      navigate("/branch");
    } catch (error) {
      Toast.error(error.message);
    }
  });

  return (
    <div className={styles.create_partner}>
      <h1 className={styles.title}>Create Branch</h1>
      <Form control={control} mediaList={mediaList} />
      <MainButton
        onClick={onSubmit}
        type="submit"
        className={styles.create_btn}
      >
        Create Branch
      </MainButton>
    </div>
  );
};

export default Create;
