import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { setMediaList } from "../../../../store/image/slice";
import Toast from "../../../../helpers/status-text";
import { BranchAPI } from "../../../../services/branch";
import MainButton from "../../../../components/button/button";
import Form from "../form/form";

const Edit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { mediaList } = useSelector((state) => state.image);
  const { oneBranch } = useSelector((state) => state.branch);

  const defaultValues = oneBranch ? { ...oneBranch } : {};

  const { control, handleSubmit, reset } = useForm({
    defaultValues,
  });

  useEffect(() => {
    (async () => {
      try {
        await dispatch(BranchAPI.getOne(id)).unwrap();
      } catch (error) {
        Toast.error(error.message);
      }
    })();
  }, [dispatch, id]);

  useEffect(() => {
    if (oneBranch) {
      reset(oneBranch);
      dispatch(
        setMediaList({
          images: oneBranch.images,
          main_image: [oneBranch.image],
        })
      );
    }
  }, [dispatch, oneBranch, reset]);

  const onSubmit = handleSubmit(async (formData) => {
    formData.images = mediaList.images;
    formData.image = mediaList.main_image[0];
    try {
      await dispatch(BranchAPI.update(formData)).unwrap();
      Toast.success("Story Updated Successfully");
      navigate("/branch");
    } catch (error) {
      Toast.error(error.message);
    }
  });

  return (
    <div>
      <h1>Edit partner</h1>
      <Form control={control} mediaList={mediaList} />
      <MainButton onClick={onSubmit} type="submit">
        Edit Partner
      </MainButton>
    </div>
  );
};

export default Edit;
