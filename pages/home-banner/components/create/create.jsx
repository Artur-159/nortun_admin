import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { HomeAPI } from "../../../../services/home";
import { setBanners } from "../../../../store/home/slice";
import Toast from "../../../../helpers/status-text";
import { BANNER_DEFAULT_VALUES } from "../../../../constant/home";
import { accumulateBannerData } from "../../../../utils/home-banner";
import MainButton from "../../../../components/button/button";
import Back from "../../../../components/back-btn/back-btn";
import Form from "../form/form";
import AddIcon from "@mui/icons-material/Add";

import styles from "../../styles.module.scss";

const CreateHomeBanner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, banners } = useSelector((state) => state.home);

  const { control, handleSubmit } = useForm({
    defaultValues: BANNER_DEFAULT_VALUES,
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      data = accumulateBannerData(banners, data);
      await dispatch(HomeAPI.postHomeBanner(data)).unwrap();
      dispatch(setBanners({}));
      navigate("/home");
      Toast.success("Հաջողությամբ ստեղծվել է");
    } catch (error) {
      Toast.error(error.message);
    }
  });

  return (
    <div className={styles.home_banner}>
      <Back />
      <h1 className={styles.title}>Create home banner</h1>
      <Form control={control} status={status} banners={banners} />
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

export default CreateHomeBanner;
