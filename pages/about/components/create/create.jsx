import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { AboutAPI } from "../../../../services/about";
import Toast from "../../../../helpers/status-text";
import MainButton from "../../../../components/button/button";
import AddIcon from "@mui/icons-material/Add";
import Form from "../form/form";

import styles from "../../about.module.scss";

const Create = ({ className }) => {
  const dispatch = useDispatch();

  const { mediaList } = useSelector((state) => state.image);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      description_am: "",
      description_ru: "",
      description_en: "",
      image: "",
    },
  });

  const onSubmit = handleSubmit(async (formData) => {
    try {
      formData.image = mediaList.about_image[0];

      await dispatch(AboutAPI.create(formData)).unwrap();
      Toast.success("Successfully done");
    } catch (error) {
      Toast.error(error.message);
    }
  });

  return (
    <div className={clsx(className, styles.about)}>
      <h2>Create About Us</h2>
      <Form control={control} image={mediaList} />
      <MainButton
        onClick={onSubmit}
        variant="contained"
        className={styles.btn}
        startIcon={<AddIcon />}
      >
        Create
      </MainButton>
    </div>
  );
};

export default Create;
