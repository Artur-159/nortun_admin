import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { AboutAPI } from "../../../../services/about";
import Toast from "../../../../helpers/status-text";
import MainButton from "../../../../components/button/button";
import EditIcon from "@mui/icons-material/Edit";
import { setMediaList } from "../../../../store/image/slice";
import Form from "../form/form";

import styles from "../../about.module.scss";

const Edit = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.about);
  const { mediaList } = useSelector((state) => state.image);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: data || {},
  });

  const onSubmit = handleSubmit(async (formData) => {
    formData.image = mediaList.about_image[0];

    try {
      await dispatch(AboutAPI.create(formData)).unwrap();
      Toast.success("Successfully edited");
    } catch (error) {
      Toast.error(error.message);
    }
  });

  useEffect(() => {
    if (data && data.image) {
      dispatch(
        setMediaList({
          about_image: [data.image],
        })
      );
      reset(data);
    }
  }, [dispatch, data, reset]);

  return (
    <div className={styles.about}>
      <h2 className={styles.title}>Edit About Us</h2>
      <Form control={control} image={mediaList} />
      <MainButton
        onClick={onSubmit}
        variant="contained"
        startIcon={<EditIcon />}
        className={styles.btn}
      >
        Edit
      </MainButton>
    </div>
  );
};

export default Edit;
