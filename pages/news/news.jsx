import { useNavigate } from "react-router";
import MainButton from "../../components/button/button";
import List from "./components/list/list";
import { Add } from "@mui/icons-material";

import styles from './styles.module.scss'

const News = () => {
  const navigate = useNavigate();

  const navigateToCreate = () => navigate("create");

  return (
    <div>
      <h1 className={styles.title}>News</h1>
      <MainButton
        startIcon={<Add />}
        variant="contained"
        onClick={navigateToCreate}
      >
        Create
      </MainButton>
      <List />
    </div>
  );
};

export default News;
