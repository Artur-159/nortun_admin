import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "../../services/auth";
import TextInput from "../../components/text-input/text-input";
import MainButton from "../../components/button/button";
import Toast from "../../helpers/status-text";

import styles from "./styles.module.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "superadmin@gmail.com",
      password: "superadmin@gmail.com",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await dispatch(AuthAPI.postLogin(data)).unwrap();
      Toast.success("Successfully logged in :)");
      navigate("/home");
    } catch (error) {
      Toast.error(error.message);
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <div className={styles.lock_icon}>
          <img width={25} height={30} src="/icons/lock.svg" alt="lock" />
        </div>
        <h1 className={styles.login_title}>Sign in</h1>
        <span className={styles.login_text}>
          Welcome, please sign in to continue
        </span>
        <div className={styles.login_form}>
          <TextInput
            control={control}
            errors={errors}
            type="login"
            name="email"
            placeholder="email"
            className={styles.login_input}
          />
          <TextInput
            control={control}
            errors={errors}
            name="password"
            type="password"
            placeholder="password"
            className={styles.login_input}
          />
        </div>
        {/* <MainCheckbox
          control={control}
          name="remember"
          label="Remember me"
          className={styles.remember_me}
        /> */}
        <div className={styles.btn_log_reg}>
          <MainButton
            type="submit"
            onClick={onSubmit}
            variant="contained"
            className={styles.btn}
          >
            Sign in
          </MainButton>
        </div>
      </div>
    </div>
  );
};
export default Login;
