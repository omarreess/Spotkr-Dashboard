/* eslint-disable react/prop-types */
// import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import { DataGrid } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../pages/global/sidebar/sidebarContext";
// import CustomToolTip from "../CustomToolTip/customToolTip";

const CustomTable = (props) => {
  function generateRandom() {
    var length = 8,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }
  const columns = props.columns;
  // ?.map(function (element) {
  //   if (element.field !== "actions") {
  //     element.renderCell = (params) => (
  //       <CustomToolTip text={t(params.row[element.field])} />
  //     );
  //   }
  //   return element;
  // });
  const { sidebarRTL } = useSidebarContext();
  const { t } = useTranslation();
  return (
    <DataGrid
      sx={{
        fontWeight: "bold",
        fontSize: "14px",
      }}
      rows={props.rows}
      autoHeight
      // components={{
      //   Toolbar: GridToolbar,
      // }}
      // getRowId={true}
      columns={sidebarRTL ? columns.reverse() : columns}
      loading={props.loading}
      pageSize={props.pageSize}
      onPageSizeChange={props.onPageSizeChange}
      disableSelectionOnClick={true}
      rowHeight={props.rowHeight || 50}
      showCellRightBorder={true}
      getRowId={props.getRowId ? () => generateRandom() : null}
      rowsPerPageOptions={[5, 10, 15]}
      dir={sidebarRTL ? "rtl" : "ltr"}
      componentsProps={{
        pagination: {
          labelRowsPerPage: t("rowsPerPageText"),
          dir: sidebarRTL ? "rtl" : "ltr",
        },
      }}
    />
  );
};
export default CustomTable;
