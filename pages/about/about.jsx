import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AboutAPI } from "../../services/about";
import Edit from "./components/edit/edit";
import Create from "./components/create/create";
import Toast from "../../helpers/status-text";

import styles from "./about.module.scss";

const About = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.about);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(AboutAPI.get()).unwrap();
      } catch (error) {
        Toast.error(error.message);
      }
    })();
  }, [dispatch]);

  return (
    <div className={styles.about_block}>{data?.id ? <Edit /> : <Create />}</div>
  );
};

export default About;
