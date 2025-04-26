import { useNavigate } from "react-router";

import MainButton from "../../components/button/button";
import List from "./components/list/list";
import { Add } from "@mui/icons-material";

import styles from "./styles.module.scss";

const Story = () => {
  const navigate = useNavigate();

  const navigateToCreate = () => {
    navigate("create");
  };

  return (
    <div className={styles.story}>
      <h1>Story</h1>
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

export default Story;
