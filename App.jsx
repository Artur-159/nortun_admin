import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "./store/auth/slice";
import Layout from "./components/layout/layout";
import MainRoutes from "./router/main-router";
import Header from "./components/header/header";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminRole = localStorage.getItem("adminRole");

    if (token && adminRole) {
      dispatch(setIsAuthenticated({ token, adminRole }));
    }
  }, [dispatch]);

  return (
    <Layout>
      <Header />
      <div className="main_container">
        <MainRoutes />
      </div>
    </Layout>
  );
};

export default App;
