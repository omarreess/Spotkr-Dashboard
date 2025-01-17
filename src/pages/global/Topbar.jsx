import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { useProSidebar } from "react-pro-sidebar";
import { useSelector } from "react-redux";
import UserDropDown from "../../components/userDropDown/userDropDown";
import { ColorModeContext, tokens } from "../../theme";
import CustomLoader from "./../../components/CustomLoader/CustomLoader";
import { useSidebarContext } from "./sidebar/sidebarContext";
import NotificationContainer from "../../modules/notification/containers/NotificationContainer";

const Topbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const colors = tokens(theme.palette.mode);
  const profileLoading = useSelector((state) => state.profile.profileLoading);
  const { sidebarRTL } = useSidebarContext();
  const { toggleSidebar, broken, rtl } = useProSidebar();
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      flexDirection={sidebarRTL ? "row-reverse" : "row"}
    >
      <Box display="flex">
        {broken && !rtl && (
          <IconButton
            sx={{
              margin: "0 6 0 2",
              color: colors.grey[100],
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => toggleSidebar()}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        )}
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        flexDirection={sidebarRTL ? "row" : "row-reverse"}
      >
        <Box display="flex" alignItems="center">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <LightModeOutlinedIcon fontSize="large" />
            ) : (
              <DarkModeOutlinedIcon fontSize="large" />
            )}
          </IconButton>
            <NotificationContainer />
          <Box>{!profileLoading ? <UserDropDown /> : <CustomLoader />}</Box>
        </Box>
        <Box>
          {broken && rtl && (
            <IconButton
              sx={{ margin: "0 6 0 2" }}
              onClick={() => toggleSidebar()}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;
