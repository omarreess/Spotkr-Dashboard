import { Typography, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { tokens } from "../../../theme";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();
  const { pathname } = useLocation()

  return (
      <MenuItem
        className="customFont"
        component={<button />}
        active={selected === title}
        style={{
          color: colors.grey[200],
          margin: "0 1.2rem",
        }}
        onClick={() => setSelected(title)}
        icon={icon}
        routerLink={<Link to={to} />}
      >
        <Typography
          className="customFont"
          sx={{ fontSize: "16px", fontWeight: 600, background: pathname == `/${to}` ? '#bd0f0f' : '', borderRadius: '10px', paddingX: pathname == `/${to}` ? '5px' : '' }}
          >
          {t(title)}
        </Typography>
      </MenuItem>
    )
};
Item.propTypes = {
  to: PropTypes.string,
  title: PropTypes.string,
  permission: PropTypes.string,
  icon: PropTypes.element,
  selected: PropTypes.string,
  setSelected: PropTypes.func,
  type: PropTypes.string,
}
export default Item;
