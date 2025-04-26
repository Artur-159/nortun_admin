import { Routes, Route, useNavigate } from "react-router-dom";
import { adminRoutes, subRoutes, guestRoutes } from "./page-routes";
import Home from "../pages/home-banner/home-banner";
import { useEffect } from "react";

const MainRoutes = () => {
  const adminRole = localStorage.getItem("adminRole");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && !adminRole) {
      navigate("/login");
      localStorage.clear();
    }
  }, [token, adminRole, navigate]);

  return (
    <Routes>
      {token && adminRole === "4" ? (
        <>
          {adminRoutes?.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          {adminRoutes?.map((route) =>
            route?.children?.map((subRoute) => (
              <Route
                key={subRoute.path}
                path={subRoute.path}
                element={subRoute.element}
              />
            ))
          )}
          <Route key={Date.now()} path="/home" element={<Home />} />
        </>
      ) : token && adminRole === "3" ? (
        <>
          {subRoutes?.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          {subRoutes?.map((route) =>
            route?.children?.map((subRoute) => (
              <Route
                key={subRoute.path}
                path={subRoute.path}
                element={subRoute.element}
              />
            ))
          )}
          <Route key={Date.now()} path="/home" element={<Home />} />
        </>
      ) : token && adminRole === "2" ? (
        <>
          {subRoutes?.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          {subRoutes?.map((route) =>
            route?.children?.map((subRoute) => (
              <Route
                key={subRoute.path}
                path={subRoute.path}
                element={subRoute.element}
              />
            ))
          )}
          <Route key={Date.now()} path="/home" element={<Home />} />
        </>
      ) : (
        guestRoutes?.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))
      )}
    </Routes>
  );
};

export default MainRoutes;
