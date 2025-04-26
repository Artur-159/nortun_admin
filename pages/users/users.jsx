import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { AuthAPI } from "../../services/auth";
import { setOffset, setUserRole } from "../../store/auth/slice";
import { USERS_TABLE_SUBTITLE, ROLE_BUTTONS } from "../../constant/users";
import Params from "../../helpers/params";
import Button from "../../components/button/button";
import UserTable from "./component/users-table/users-table";
import TextInput from "../../components/text-input/text-input";
import SearchIcon from "@mui/icons-material/Search";
import PageTitle from "../../components/page-title/page-title";

import styles from "./styles.module.scss";
import Toast from "../../helpers/status-text";

const Users = () => {
  const [role, setRole] = useState(null);
  const dispatch = useDispatch();
  const adminRoleId = localStorage.getItem("adminRole");
  const { usersList, status, totalUsers, userRole } = useSelector(
    (state) => state.auth
  );
  const { offset } = useSelector((state) => state.pagination);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const onSearch = handleSubmit(async (data) => {
    try {
      data.params = Params(10, offset);

      if (userRole) {
        data.filter_role = userRole;
      }

      data = { ...data.params, ...data };
      delete data.params;
      await dispatch(AuthAPI.getUsersList(data)).unwrap();
    } catch (error) {
      Toast.error(error.message);
    }
  });

  const handleRole = (selectedRole) => {
    dispatch(setOffset(0));
    setRole(selectedRole);
    dispatch(setUserRole(selectedRole));
  };

  useEffect(() => {
    (async () => {
      try {
        let filter_role = userRole;
        let data = Params(6, offset * 6);
        data = { ...data, filter_role };
        await dispatch(AuthAPI.getUsersList(data)).unwrap();
      } catch (error) {
        Toast.error(error.message);
      }
    })();
  }, [dispatch, userRole, offset]);

  return (
    <div className={styles.addAdmin}>
      <PageTitle title="Օգտատերեր" />
      <div className={styles.search_info}>
        <div className={styles.btn_list}>
          {ROLE_BUTTONS?.map((item) => (
            <Button
              key={item.value}
              onClick={() => handleRole(item.value)}
              variant={role === item.value ? "contained" : "outlined"}
            >
              {item.label}
            </Button>
          ))}
        </div>
        <div className={styles.search}>
          <TextInput
            control={control}
            name={"search"}
            size="small"
            placeholder={"Փնտրել"}
            className={styles.search_inp}
          />
          <SearchIcon className={styles.search_icon} onClick={onSearch} />
        </div>
        {adminRoleId === "4" ? (
          <Button className={styles.create_btn_link} variant={"outlined"}>
            <NavLink className={styles.create_user_link} to={"create_user"}>
              Ստեղծել նոր օգտատեր
            </NavLink>
          </Button>
        ) : null}
      </div>
      {!usersList?.length ? (
        <h4>Այս պահին ցանկը դատարկ է</h4>
      ) : (
        <UserTable
          userRole={userRole}
          offset={offset}
          totalUsers={totalUsers}
          status={status}
          list={usersList}
          subTitle={USERS_TABLE_SUBTITLE}
          className={styles.table}
        />
      )}
    </div>
  );
};

export default Users;
