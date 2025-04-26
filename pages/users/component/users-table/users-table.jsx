import { useEffect, useMemo, memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "../../../../services/auth";
import { setModalOpen } from "../../../../store/modal/slice";
import Toast from "../../../../helpers/status-text";
import Params from "../../../../helpers/params";
import Pagination from "../../../../components/pagination/pagination";
import RoleInfo from "../role-info/role-info";
import { setOffset } from "../../../../store/auth/slice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
} from "@mui/material";
import clsx from "clsx";
import ItemActions from "../../../../components/item-actions/item-actions";

import styles from "./styles.module.scss";

const UserTable = ({
  list,
  subTitle,
  className,
  status,
  totalUsers,
  userRole,
  offset,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const options = useMemo(() => {
    const params = Params(6);
    params.offset = offset * 6;
    params.filter_role = userRole;
    return params;
  }, [userRole, offset]);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(AuthAPI.getUsersList(options)).unwrap();
        dispatch(setOffset(options.offset));
      } catch (error) {
        Toast.error(error.message);
      }
    })();
  }, [dispatch, status, userRole, offset, options]);

  const deleteHandler = useCallback(
    async (id) => {
      try {
        await dispatch(AuthAPI.deleteAdmin(id)).unwrap();
        dispatch(setModalOpen(false));
        Toast.success("Հաջողությամբ ջնջված է");
      } catch (error) {
        Toast.error(error.message);
      }
    },
    [dispatch]
  );

  const editHandler = (id) => navigate(`${id}`);

  const showDetail = (id) => navigate(`/${id}`);

  const memoizedSubTitle = useMemo(() => subTitle, [subTitle]);
  const memoizedList = useMemo(() => list, [list]);

  return (
    <div className={clsx(className)}>
      <Paper>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {memoizedSubTitle?.map((item, i) => (
                  <TableCell
                    key={i}
                    align={item === "Delete user" ? "right" : "left"}
                  >
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {memoizedList?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className={styles.th_index} align="left">
                    {row.id}
                  </TableCell>
                  <TableCell>
                    {row?.name} {row?.surname}
                  </TableCell>
                  <TableCell align="left">{row?.email}</TableCell>
                  <TableCell align="left">{row?.phone}</TableCell>
                  <TableCell align="left">{row?.company_id}</TableCell>
                  <TableCell align="left">
                    <RoleInfo defaultValue={row.role} id={row.id} />
                  </TableCell>
                  <TableCell align="right">
                    <ItemActions
                      className={styles.menu}
                      itemId={row.id}
                      editHandler={editHandler}
                      deleteHandler={deleteHandler}
                      handlerShowInfo={showDetail}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {totalUsers > 6 ? (
          <Pagination offset={offset} total={totalUsers} pageCount={6} />
        ) : null}
      </Paper>
    </div>
  );
};

export default memo(UserTable);
