import { Box, ButtonGroup, Switch, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CustomPagenation from "../../../components/CustomPagenation/CustomPagenation.jsx";
import CustomToolTip from "../../../components/CustomToolTip/customToolTip.jsx";
import Header from "../../../components/Header.jsx";
import CustomTableBox from "../../../components/customTableBox/CustomTableBox.jsx";
import useMainHooks from "../../../hooks/useMainHooks.jsx";
import {
  changeActivitiesStatus,
  changeCarouselStatus,
  fetchActivitiesDataByPage,
  getActivities,
} from "../redux/action.js";
import { IoCheckmarkCircle } from "react-icons/io5";
import { HiXMark } from "react-icons/hi2";
import CustomLinkButton from "../../../components/CustomLinkButton.jsx";

const ActivitiesTable = () => {
  const { thirdId } = useParams()
  const { t, sidebarRTL, dispatch } = useMainHooks();
  const [pageSize, setPageSize] = useState(10);
  const data = useSelector((state) => state.activitiesSlice.activitiesData) || [];
  const links = data?.links;
  const loading = useSelector((state) => state.activitiesSlice.loading) || false;
  console.log(data)
  useEffect(() => {
    dispatch(getActivities({ pageSize, thirdId }));
  }, [dispatch, pageSize]);

  const columns = [
    { field: "id", headerName: t("ID"), width: 100 },
    {
      field: "name",
      headerName: t("name"),
      width: 150,
      renderCell: (params) => <CustomToolTip text={params.row.name} />,
    },
    {
      field: "category",
      headerName: t("category"),
      width: 150,
      renderCell: (params) => <CustomToolTip text={params.row.category.name} />,
    },
    {
      field: "discount",
      headerName: t("Discount"),
      width: 100,
      renderCell: (params) => (
        <CustomToolTip text={`${params.row.discount||0} %`} />
      ),
    },
    {
      field: "city",
      headerName: t("City"),
      width: 180,
      renderCell: (params) => (
        <CustomToolTip text={params.row.city.name} />
      ),
    },
    {
      field: "include_in_adrenaline_rush",
      headerName: t("Adrenaline"),
      width: 100,
      renderCell: (params) => (params.row.include_in_adrenaline_rush ? <IoCheckmarkCircle style={{color:"green", fontWeight:"bold", fontSize:"30px", margin:".5rem auto"}} /> :<HiXMark style={{color:"red", fontWeight:"bold", fontSize:"30px", margin:".5rem auto"}} /> ),
    },
    {
      field: "include_in_carousel",
      headerName: t("Carousel"),
      width: 100,
      renderCell: (params) => (params.row.include_in_carousel ? <IoCheckmarkCircle style={{color:"green", fontWeight:"bold", fontSize:"30px", margin:".5rem auto"}} /> :<HiXMark style={{color:"red", fontWeight:"bold", fontSize:"30px", margin:".5rem auto"}} /> ),
    },
    {
      field: "main_image",
      headerName: t("Image"),
      width: 120,
      renderCell: (params) => (
        <Avatar
          src={params.row.main_image}
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
      field: "phone",
      headerName: t("phone"),
      width: 200,
      renderCell: (params) => <CustomToolTip text={params.row.phone} />,
    },
    {
      field: "price",
      headerName: t("price"),
      width: 200,
      renderCell: (params) => <CustomToolTip text={params.row.price} />,
    },
    {
      field: "rating_average",
      headerName: t("Rating Average"),
      width: 200,
      renderCell: (params) => <CustomToolTip text={params.row.rating_average} />,
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
              changeActivitiesStatus({
                id: params.row.id,
                thirdId,
                status: params.row.status ? 0 : 1 ,
              })
            );
          }}
        />        
      ),
    },
    {
      field: "Adrenaline Status",
      headerName: t("Adrenaline Status"),
      width: 100,
      renderCell: (params) => (
        <Switch
          defaultChecked={params.row.include_in_adrenaline_rush}
          disabled={loading}
          onChange={() => {
            dispatch(
              changeActivitiesStatus({
                id: params.row.id,
                thirdId,
                status: params.row.status ? 0 : 1 ,
              })
            );
          }}
        />        
      ),
    },
    {
      field: "Carousel Status",
      headerName: t("Carousel Status"),
      width: 100,
      renderCell: (params) => (
        <Switch
          defaultChecked={params.row.include_in_carousel}
          disabled={loading}
          onChange={() => {
            dispatch(
              changeCarouselStatus({
                id: params.row.id,
                thirdId,
                status: params.row.status ? 0 : 1 ,
              })
            );
          }}
        />        
      ),
    },
    {
      field: "actions",
      headerName: t("Actions"),
      width: 500,
      renderCell: (params) => (
        <ButtonGroup
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <CustomLinkButton text={"Show"} to={`show/${params.row?.id}`}/>
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
        <Header title={t("Activities")} />
      </Box>

      <CustomTableBox
        tableData={tableData}
        action={getActivities}
        CustomPagenation={
          <CustomPagenation
            action={fetchActivitiesDataByPage}
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
export default ActivitiesTable;
