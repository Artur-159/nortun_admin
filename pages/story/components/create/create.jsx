import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { StoryAPI } from "../../../../services/story";
import Form from "../form/form";
import MainButton from "../../../../components/button/button";
import Toast from "../../../../helpers/status-text";

import styles from "./styles.module.scss";

const Create = () => {
  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      active: false,
      sort_number: "",
      description: "",
      url: "",
      image: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await dispatch(StoryAPI.postStory(data)).unwrap();
      Toast.success("Story created successfully");
    } catch (error) {
      Toast.error(error.message);
    }
  });

  return (
    <div className={styles.create_story}>
      <h1>Create Form</h1>
      <Form control={control} />
      <MainButton onClick={onSubmit} type="submit" variant="contained">
        Create Story
      </MainButton>
    </div>
  );
};

export default Create;
