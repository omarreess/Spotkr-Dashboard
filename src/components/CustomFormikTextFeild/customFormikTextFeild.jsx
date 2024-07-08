import { Box, TextField } from "@mui/material";
import PropTypes from "prop-types";
import CustomLable from "../CustomLable";
import useMainHooks from "../../hooks/useMainHooks";

export const CustomFormikTextFeild = ({
  onBlur,
  fullWidth,
  disabled,
  isMulti,
  rows,
  placeholder,
  onChange,
  value,
  error,
  name,
  type,
  helperText,
  required,
  title,
}) => {
  const { t, sidebarRTL } = useMainHooks();
  return (
    <Box dir={sidebarRTL ? "rtl" : "ltr"}>
      {/* {title && <CustomLable title={title} />} */}
      {
        title && <CustomLable requiredString={"vv"} title={title} />
      }

      <TextField
        fullWidth={fullWidth || true}
        disabled={disabled || false}
        required={required || false}
        vavariantriant="outlined"
        multiline={isMulti || false}
        type={type || "text"}
        min={1}
        rows={rows}
        placeholder={t(placeholder)}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        name={name}
        error={error}
        helperText={helperText}
        dir={sidebarRTL ? "rtl" : "ltr"}
        sx={{ gridColumn: "span 4" }}
        inputProps={{
          style: { fontSize: "22px", fontWeight: "bolder" },
        }}
      />
    </Box>
  );
};
CustomFormikTextFeild.propTypes = {
  onBlur: PropTypes.func.isRequired,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  isMulti: PropTypes.bool,
  rows: PropTypes.number,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  helperText: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
};