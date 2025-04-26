import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setMediaList } from "../../../../store/image/slice";
import { PartnerAPI } from "../../../../services/partner";
import Toast from "../../../../helpers/status-text";
import Form from "../form/form";
import MainButton from "../../../../components/button/button";
import Back from "../../../../components/back-btn/back-btn";

const Edit = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const { onePartner } = useSelector((state) => state.partner);
  const { mediaList } = useSelector((state) => state.image);

  const defaultValues = onePartner ? { ...onePartner } : {};

  const { control, handleSubmit, reset } = useForm({
    defaultValues,
  });

  useEffect(() => {
    (async () => {
      try {
        await dispatch(PartnerAPI.getOne(id)).unwrap();
      } catch (error) {
        Toast.error(error.message);
      }
    })();
  }, [dispatch, id]);

  useEffect(() => {
    if (onePartner) {
      reset(onePartner);
      dispatch(
        setMediaList({
          images: onePartner.images,
          main_image: [onePartner.image],
        })
      );
    }
  }, [dispatch, onePartner, reset]);

  const onSubmit = handleSubmit(async (formData) => {
    formData.images = mediaList.images;
    formData.image =
      mediaList.main_image.length > 0
        ? mediaList.main_image[0]
        : formData.image;
    try {
      await dispatch(PartnerAPI.putUpdatePartner(formData)).unwrap();
      Toast.success("Story Updated Successfully");
      navigate("/partner");
    } catch (error) {
      Toast.error(error.message);
    }
  });

  return (
    <>
      <Back />
      <h1>Edit partner</h1>
      <Form control={control} mediaList={mediaList} />
      <MainButton onClick={onSubmit} type="submit">
        Edit Partner
      </MainButton>
    </>
  );
};

export default Edit;
