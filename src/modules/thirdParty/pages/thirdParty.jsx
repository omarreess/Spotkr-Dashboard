import { Box, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomPagenation from "../../../components/CustomPagenation/CustomPagenation.jsx";
import Header from "../../../components/Header.jsx";
import CustomTableBox from "../../../components/customTableBox/CustomTableBox.jsx";
import CustomToolTip from "../../../components/CustomToolTip/customToolTip.jsx";
import useMainHooks from "../../../hooks/useMainHooks.jsx";
import { changeThirdPartyStatus, fetchThirdPartyDataByPage, getThirdParty } from "../redux/action.js";
import { Link } from "react-router-dom";
import EditButton from "../../../components/editButton.jsx";

const ThirdPartyTable = () => {
  const { t, sidebarRTL, dispatch, colors } = useMainHooks();
  const [pageSize, setPageSize] = useState(10);
  const data = useSelector((state) => state.thirdPartySlice.thirdPartyData) || [];
  const loading = useSelector((state) => state.thirdPartySlice.loading)||false;
  const links = data?.links;

  useEffect(() => {
    dispatch(getThirdParty({ pageSize: pageSize }));
  }, [dispatch, pageSize]);

  const columns = [
    { field: "id", headerName: t("ID"), width:100},
    {
      field: "name",
      headerName: t("name"),
      width:200,
      renderCell: (params) => <CustomToolTip text={params.row.name}/>,
    },
    {
      field: "username",
      headerName: t("User Name"),
      width:150,
      renderCell: (params) => <CustomToolTip text={params.row.username}/>,
    },
    {
      field: "email",
      headerName: t("email"),
      width:300,
      renderCell: (params) =><CustomToolTip text={params.row.email}/>,
    },
    {
      field: "phone",
      headerName: t("phone"),
      width:200,
      renderCell: (params) =><CustomToolTip text={params.row.phone}/>,
    },
    {
      field: "type",
      headerName: t("Type"),
      width:200,
      renderCell: (params) =><CustomToolTip text={params.row.type}/>,
    },
    {
      field: "Status",
      headerName: t("Status"),
      width:100,
      renderCell: (params) =><Switch defaultChecked={params.row.status} disabled={loading} onChange={()=>dispatch(changeThirdPartyStatus({id: params.row.id, status:params.row.status? 0 : 1}))} />,
    },
    {
      field: "Show Activities",
      headerName: t("Show Activities"),
      width:200,
      renderCell: (params) =><Link to={`${params.row.id}/activities`}><EditButton text="Show Activities"/></Link>,
    },
  ];
  
  const tableData = {
    rows:  data?.data || [],
    loading: loading,
    pageSize: pageSize,
    onPageSizeChange: (newPageSize) => setPageSize(newPageSize),
    columns: columns,
  };
  console.log(data)
  return  (
    <Box m="20px">
      <Box
        display="flex"
        flexDirection={sidebarRTL ? "row-reverse" : "row"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("Third Party")} />
      </Box>

      <CustomTableBox
        tableData={tableData}
        action={getThirdParty}
        CustomPagenation={
          <CustomPagenation
            action={fetchThirdPartyDataByPage}
            currentPage={data?.meta?.current_page}
            prevPage={links?.prev}
            nextPage={links?.next}
            lastPage={links?.last}
            firstPage={links?.first}
          />
        }
      />
    </Box>
  )
};
export default ThirdPartyTable;
