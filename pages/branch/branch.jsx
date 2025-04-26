import { useNavigate } from "react-router-dom";
import MainButton from "../../components/button/button";
import List from "./components/list/list";
import { Add } from "@mui/icons-material";

import styles from "./styles.module.scss";

const Branch = () => {
  const navigate = useNavigate();

  const navigateToCreate = () => {
    navigate("create");
  };

  return (
    <div className={styles.branch}>
      <h1 className={styles.title}>Branch</h1>

      <MainButton
        onClick={navigateToCreate}
        startIcon={<Add />}
        variant="contained"
      >
        Create
      </MainButton>
      <List />
    </div>
  );
};

export default Branch;
