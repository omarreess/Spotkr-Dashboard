import { CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { userProfile } from "./modules/auth/redux/profile.js";
import Topbar from "./pages/global/Topbar";
import { MyProSidebarProvider } from "./pages/global/sidebar/sidebarContext";
import { ColorModeContext, useMode } from "./theme";
import withGuard from "./with_guard";

const App = () => {
  const [theme, colorMode] = useMode();
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch, token]);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", colorMode.mode);
  }, [colorMode?.mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyProSidebarProvider>
          <div style={{ height: "100%", width: "100%" }}>
            <main>
              <Topbar />
              <Outlet />
              {/* <Copyright variant={"h3"} /> */}
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
export default withGuard(App);
