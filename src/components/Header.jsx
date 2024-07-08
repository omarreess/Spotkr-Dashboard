import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import  PropTypes  from "prop-types";
import { useSidebarContext } from "../pages/global/sidebar/sidebarContext";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { sidebarRTL } = useSidebarContext();

  return (
    <Box mb="30px" display="flex" justifyContent={sidebarRTL ? "end" : "start"}>
      <Typography
        className="customFont"
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};
Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
}
export default Header;
