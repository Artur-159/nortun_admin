import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { HomeAPI } from "../../../../services/home";
import { accumulateBannerData } from "../../../../utils/home-banner";
import { setBanners } from "../../../../store/home/slice";
import Toast from "../../../../helpers/status-text";
import MainButton from "../../../../components/button/button";
import Back from "../../../../components/back-btn/back-btn";
import Form from "../form/form";
import EditIcon from "@mui/icons-material/Edit";

import styles from "../../styles.module.scss";

const EditHomeBanner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();

  const { status, oneHomeBanner, banners } = useSelector((state) => state.home);

  const defaultValues = {
    ...oneHomeBanner,
  };

  const { reset, control, handleSubmit } = useForm({
    defaultValues,
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      data = accumulateBannerData(banners, data);
      await dispatch(HomeAPI.putUpdateHomeBanner(data)).unwrap();
      navigate("/home");
    } catch (error) {
      Toast.error(error.message);
    }
  });

  useEffect(() => {
    (async () => {
      try {
        await dispatch(HomeAPI.getOneHomeBanner(userId)).unwrap();
        dispatch(setBanners({}));
      } catch (error) {
        Toast.error(error.message);
      }
    })();
  }, [dispatch, userId]);

  useEffect(() => {
    reset(oneHomeBanner);
  }, [reset, dispatch, oneHomeBanner]);

  return (
    <div>
      <Back />
      <h1>Create home banner</h1>
      <Form control={control} status={status} banners={banners} />
      <MainButton
        onClick={onSubmit}
        variant="contained"
        className={styles.btn}
        startIcon={<EditIcon />}
      >
        Create
      </MainButton>
    </div>
  );
};

export default EditHomeBanner;
