import { Avatar, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomLinkButton from "../../../components/CustomLinkButton.jsx";
import CustomPagenation from "../../../components/CustomPagenation/CustomPagenation.jsx";
import CustomToolTip from "../../../components/CustomToolTip/customToolTip.jsx";
import Header from "../../../components/Header.jsx";
import CustomTableBox from "../../../components/customTableBox/CustomTableBox.jsx";
import EditButton from "../../../components/editButton.jsx";
import useMainHooks from "../../../hooks/useMainHooks.jsx";
import useCheckStatus from "../hook/useCheckStatus.jsx";
import { fetchOrdersDataByPage, finishOrder, getOrders } from "../redux/action.js";
import { ORDERS_STATE_ENUM } from "./interface.js";

const OrdersTable = () => {
  const { t, sidebarRTL, dispatch } = useMainHooks();
  const [pageSize, setPageSize] = useState(10);
  const data = useSelector((state) => state.orderSlice.ordersData) || [];
  const links = data?.links;
  const loading = useSelector((state) => state.orderSlice.loading) || false;

  useEffect(() => {
    dispatch(getOrders({ pageSize }));
  }, [dispatch, pageSize]);

  const columns = [
    { field: "id", headerName: t("ID"), width: 100 },
    { field: "userName", headerName: t("User Name"), width: 200, renderCell:(params)=>(<CustomToolTip text={params.row?.user_details.name}/>) },
    { field: "userEmail", headerName: t("User Email"), width: 200, renderCell:(params)=>(<CustomToolTip text={params.row?.user_details.email}/>) },
    { field: "userPhone", headerName: t("User Phone"), width: 200, renderCell:(params)=>(<CustomToolTip text={params.row?.user_details.phone}/>) },
    { field: "activityName", headerName: t("Activity Name"), width: 200, renderCell:(params)=>(<CustomToolTip text={params.row?.activity.name}/>) },
    { field: "activityType", headerName: t("Activity Type"), width: 200, renderCell:(params)=>(<CustomToolTip text={params.row?.activity.type}/>) },
    { field: "activityImage", headerName: t("Activity Image"), width: 200, renderCell:(params)=>(<Avatar src={params.row?.activity.main_image} />) },
    { field: "adults_count", headerName: t("Adults Count"), width: 200 },
    { field: "children_count", headerName: t("Children Count"), width: 200 },
    { field: "sessions_count", headerName: t("Sessions Count"), width: 200 },
    { field: "cost", headerName: t("Cost"), width: 200 },
    { field: "created_at", headerName: t("create at"), width: 200 },
    { field: "calendar_date", headerName: t("Calendar Date"), width: 200 },
    { field: "status", headerName: t("State"), width: 200, renderCell: (params)=>(useCheckStatus({status: params.row.status})
      
    ) },
    
    {
      field: "actions",
      headerName: t("Actions"),
      width: 500,
      renderCell: (params) => (
        <>
          <EditButton onClick={()=>{
            dispatch(finishOrder({id: params.row.id})).unwrap().then(()=>{
              dispatch(getOrders({pageSize}))
            })
          }}
          text={"Finish"}
          disabled={params.row.status !== ORDERS_STATE_ENUM.PAYMENT_DONE}
          />
          <CustomLinkButton text="Show" to={`${params.row.id}`}/>
        </>
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
        <Header title={t("Orders")} />
      </Box>

      <CustomTableBox
        tableData={tableData}
        CustomPagenation={
          <CustomPagenation
            action={fetchOrdersDataByPage}
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
export default OrdersTable;
