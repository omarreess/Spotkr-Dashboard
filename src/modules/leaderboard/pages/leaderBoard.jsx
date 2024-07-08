import { Avatar, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomPagenation from "../../../components/CustomPagenation/CustomPagenation.jsx";
import CustomToolTip from "../../../components/CustomToolTip/customToolTip.jsx";
import Header from "../../../components/Header.jsx";
import CustomTableBox from "../../../components/customTableBox/CustomTableBox.jsx";
import EditButton from "../../../components/editButton.jsx";
import useMainHooks from "../../../hooks/useMainHooks.jsx";
import { TfiCup } from "react-icons/tfi";
import { FaXmark } from "react-icons/fa6";
import { fetchLeaderBoardDataByPage, getLeaderBoard, markWinnder } from "../redux/action.js";

const LeaderBoardTable = () => {
  const { t, sidebarRTL, dispatch } = useMainHooks();
  const [pageSize, setPageSize] = useState(10);
  const data = useSelector((state) => state.leaderBoard.data) || [];
  const links = data?.links;
  const loading = useSelector((state) => state.leaderBoard.loading) || false;
  console.log(data)
  useEffect(() => {
    dispatch(getLeaderBoard({ pageSize }));
  }, [dispatch, pageSize]);

  const columns = [
    { field: "id", headerName: t("ID"), width: 100 },
    { field: "name", headerName: t("Name"), width: 200, renderCell:(params)=>(<CustomToolTip text={params.row?.name}/>) },
    { field: "username", headerName: t("User Name"), width: 200, renderCell:(params)=>(<CustomToolTip text={params.row?.username}/>) },
    { field: "gained_points", headerName: t("Gained Points"), width: 200 },
    { field: "is_winner", headerName: t("Is Winner"), width: 200, renderCell:(params)=>(params.row.is_winner ? <TfiCup size={25} className={"font-[900] text-green-800"} />: <FaXmark size={25} className={"font-[900] text-red-800"} />)},
    { field: "avatar", headerName: t("Photo"), width: 200, renderCell:(params)=>(<Avatar src={params.row.avatar}/>)},
    
      
    {
      field: "actions",
      headerName: t("Actions"),
      width: 500,
      renderCell: (params) => (
        <>
          <EditButton onClick={()=>{
            dispatch(markWinnder({id: params.row.id})).unwrap().then(()=>{
              dispatch(getLeaderBoard({pageSize}))
            })
          }}
          text={"Mark as Winner"}
          backGround={"green"}
          disabled={params.row.is_winner == true}
          />
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
        <Header title={t("Leader Board")} />
      </Box>

      <CustomTableBox
        tableData={tableData}
        action={getLeaderBoard}
        CustomPagenation={
          <CustomPagenation
            action={fetchLeaderBoardDataByPage}
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
export default LeaderBoardTable;
