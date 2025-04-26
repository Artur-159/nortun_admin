import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { StoryAPI } from "../../../../services/story";
import MainButton from "../../../../components/button/button";
import Form from "../form/form";
import Toast from "../../../../helpers/status-text";

const Edit = () => {
  const dispatch = useDispatch();

  const { oneStory } = useSelector((state) => state.story);

  const defaultValues = oneStory ? { ...oneStory } : {};

  const { control, handleSubmit } = useForm({
    defaultValues,
  });

  const onSubmit = handleSubmit(async (formData) => {
    try {
      console.log("Form Submitted:", formData);
      await dispatch(StoryAPI.putUpdateStory(formData)).unwrap();
      Toast.success("Story Updated Successfully");
    } catch (error) {
      Toast.error(error.message);
    }
  });

  return (
    <div>
      <h1>Edit Form</h1>
      <Form control={control} />
      <MainButton onClick={onSubmit} type="submit">
        Edit Story
      </MainButton>
    </div>
  );
};

export default Edit;
