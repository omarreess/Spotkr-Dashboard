import { Box, Switch, ButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomPagenation from "../../../components/CustomPagenation/CustomPagenation.jsx";
import Header from "../../../components/Header.jsx";
import CustomTableBox from "../../../components/customTableBox/CustomTableBox.jsx";
import CustomToolTip from "../../../components/CustomToolTip/customToolTip.jsx";
import useMainHooks from "../../../hooks/useMainHooks.jsx";
import {
  changeCouponsStatus,
  deleteCoupons,
  fetchCouponsDataByPage,
  getCoupons,
} from "../redux/action.js";
import EditButton from "../../../components/editButton.jsx";
import { Link } from "react-router-dom";
import CustomDelete from "../../../components/CutsomDelete/CustomDelete.jsx";

const CouponsTable = () => {
  const { t, sidebarRTL, dispatch } = useMainHooks();
  const [pageSize, setPageSize] = useState(10);
  const data = useSelector((state) => state.couponsSlice.couponsData) || [];
  const links = data?.links;
  const loading = useSelector((state) => state.couponsSlice.loading) || false;

  useEffect(() => {
    dispatch(getCoupons({ pageSize }));
  }, [dispatch, pageSize]);

  const columns = [
    { field: "id", headerName: t("ID"), width: 100 },
    {
      field: "code",
      headerName: t("code"),
      width: 150,
      renderCell: (params) => <CustomToolTip text={params.row.code} />,
    },
    {
      field: "discount",
      headerName: t("Discount"),
      width: 100,
      renderCell: (params) => (
        <CustomToolTip text={`${params.row.discount} %`} />
      ),
    },
    {
      field: "number_of_users",
      headerName: t("Number Of Users"),
      width: 180,
      renderCell: (params) => (
        <CustomToolTip text={params.row.number_of_users} />
      ),
    },
    {
      field: "used_by_users",
      headerName: t("Used"),
      width: 100,
      renderCell: (params) => <CustomToolTip text={params.row.used_by_users} />,
    },
    {
      field: "remaining",
      headerName: t("Remaining"),
      width: 120,
      renderCell: (params) => (
        <CustomToolTip
          text={params.row.used_by_users - params.row.number_of_users}
        />
      ),
    },
    {
      field: "created_at",
      headerName: t("Created At"),
      width: 200,
      renderCell: (params) => <CustomToolTip text={params.row.created_at} />,
    },
    {
      field: "Valid_Till",
      headerName: t("Valid Till"),
      width: 200,
      renderCell: (params) => <CustomToolTip text={params.row.valid_till} />,
    },
    {
      field: "Status",
      headerName: t("Status"),
      width: 100,
      renderCell: (params) => (
        <Switch
          defaultChecked={params.row.status}
          disabled={loading}
          onChange={() => {
            dispatch(
              changeCouponsStatus({
                id: params.row.id,
                status: params.row.status ? 0 : 1,
              })
            );
          }}
        />
      ),
    },
    {
      field: "actions",
      headerName: t("Actions"),
      width: 150,
      renderCell: (params) => (
        <ButtonGroup
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
            <CustomDelete
              id={params.row.id}
              action={deleteCoupons}
              rerenderAction={getCoupons}
              pageSize={pageSize}
            />
          
        </ButtonGroup>
      ),
    },
  ];

  const tableData = {
    rows: data?.data || [],
    loading: loading,
    pageSize: pageSize,
    onPageSizeChange: (newPageSize) => setPageSize(newPageSize),
    columns: columns,
  };

  return (
    <Box m="20px">
      <Box
        display="flex"
        flexDirection={sidebarRTL ? "row-reverse" : "row"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("Coupons")} />
        <Link to="add"><EditButton text="add"/></Link>
      </Box>

      <CustomTableBox
        tableData={tableData}
        action={getCoupons}
        CustomPagenation={
          <CustomPagenation
            action={fetchCouponsDataByPage}
            currentPage={data?.meta?.current_page}
            prevPage={links?.prev}
            nextPage={links?.next}
            lastPage={links?.last}
            firstPage={links?.first}
          />
        }
      />
    </Box>
  );
};
export default CouponsTable;
