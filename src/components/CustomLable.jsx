import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../pages/global/sidebar/sidebarContext";
import  PropTypes  from "prop-types";

const CustomLable = ({ title, margin, body }) => {
  const { t } = useTranslation();
  const { sidebarRTL } = useSidebarContext();
  return (
    <label
      className="customFont"
      dir={sidebarRTL ? "rtl" : "ltr"}
      style={{
        margin: margin,
        marginTop: "1rem",
        marginBottom: "1rem",
        fontSize: "18px",
        fontWeight: "Bold",
      }}
    >
      {t(title)}
      {body ? ` : ${body}` : null}
    </label>
  );
};
CustomLable.propTypes = {
  title: PropTypes.string.isRequired,
  margin: PropTypes.string,
  body: PropTypes.string,
}
export default CustomLable;
