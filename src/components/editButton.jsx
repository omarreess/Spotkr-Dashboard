import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { PropTypes } from "prop-types";

const EditButton = ({ disabled, fullWidth, backGround, onClick, text, type }) => {

  const { t } = useTranslation();
  return (
    <Button
      disabled={disabled}
      fullWidth={fullWidth || false}
      variant="contained"
      sx={{ background: `${backGround || '#bd0f0f'}`, margin: 2 }}
      onClick={onClick}
      type={type}
    >
      {t(text)}
    </Button>
  );
};
EditButton.propTypes={
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  backGround: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
  type: PropTypes.string,
}
export default EditButton;
