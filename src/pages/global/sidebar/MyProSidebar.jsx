import { MenuOutlined } from "@mui/icons-material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Box, IconButton, useTheme } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { tokens } from "../../../theme";
import RoutesArray from "./routesArray";
import "./sidebar.css";
import { useSidebarContext } from "./sidebarContext";
import Item from "./sidebarMenuItem";
const MyProSidebar = () => {
  const { t } = useTranslation();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("brands");
  const { sidebarRTL } = useSidebarContext();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        minHeight: "100vh",
        top: 0,
        // bottom: 0,
        // zIndex: 10000,
        "& .sidebar": {
          border: "none",
        },
        "& .menu-icon": {
          backgroundColor: "transparent !important",
        },
        "& .menu-item": {
          backgroundColor: "transparent !important",
        },
        "& .menu-anchor": {
          color: "inherit !important",
          backgroundColor: "transparent !important",
        },
        "& .sub-menu-content": {
          color: "inherit !important",
          borderRadius:".5rem",
          margin:".2rem auto",
          backgroundColor: `${colors.primary[400]} !important`,
        },

        "& .sc-pyfCe:hover": {
          color: `red !important`,
          transition:"ease-in-out.2s"
          // backgroundColor: "transparent !important",
        },
        "& .menu-item.active": {
          // color: `#bd0f0f !important`,
          // backgroundColor: "#bd0f0f !important",
        }
      }}
    >
      <Sidebar
        className="parentSidebar"
        // breakPoint="md"
        rtl={sidebarRTL}
        collapsed={collapsed}
        width="350px"
        backgroundColor={colors.primary[400]}
      >
        <Menu iconshape="square">
          <MenuItem
            icon={
              collapsed && (
                <MenuOutlined onClick={() => setCollapsed(!collapsed)} />
              )
            }
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-evenly"
                alignItems="center"
              >
                <img
                  src={
                    localStorage.getItem("color-mode") === "dark"
                      ? "/assets/logo.png"
                      : "/assets/logo.png"
                  }
                  className="object-cover"
                  alt="logo"
                  width="150px"
                  height="150px"
                  loading="lazy"
                  style={{
                    // margin: "0px 10px",
                    marginTop:"9rem",
                    "@media (maxWidth:600px)": { margin: "0px 12px" },
                  }}
                />
                {/* <Avatar scr="assets/KSBLOGOPNG.png"/> */}
                <IconButton
                  onClick={() => setCollapsed(!collapsed)}
                  // onClick={

                  // }
                >
                  <CloseOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          <Box paddingLeft={collapsed ? undefined : "12%"}>

            <Menu className="customFont" transitionDuration={2000}>
              {RoutesArray().map((item, index) => (
                <SubMenu
                  className="customFont"
                  icon={item.icon}
                  key={index}
                  label={t(item.lable)}
                >
                  {item.routes.map((menuItem) => (
                    <Item
                      key={menuItem.title}
                      title={t(menuItem.title)}
                      to={menuItem.to}
                      icon={menuItem.icon}
                      selected={selected}
                      setSelected={setSelected}
                      permission={menuItem.permission}
                      type={menuItem.type}
                    />
                  ))}
                </SubMenu>
              ))}
            </Menu>
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default MyProSidebar;
