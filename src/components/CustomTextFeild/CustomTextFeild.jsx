import { TextField } from "@mui/material";
import { useSidebarContext } from "../../pages/global/sidebar/sidebarContext";
import PropTypes from "prop-types";
import CustomLable from "../CustomLable";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const CustomTextFeild = ({
  value,
  isDisabled,
  defaultValue,
  name,
  placeholder,
  onChange,
  autoFocus,
  fullWidth,
  multiline,
  error,
  type
}) => {
  const { sidebarRTL } = useSidebarContext();
  const { t } = useTranslation();
  const [textFieldValue, setTextFieldValue] = useState(value || defaultValue); // Initialize state with value or defaultValue

  useEffect(() => {
    // Update the state only when value changes, not when defaultValue changes
    if (value !== undefined) {
      setTextFieldValue(value);
    }
  }, [value]);

  const handleChange = (event) => {
    setTextFieldValue(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <>
      <CustomLable title={placeholder} />
      <TextField
        error={error}
        multiline={multiline}
        autoFocus={autoFocus || false}
        disabled={isDisabled || false}
        margin="dense"
        placeholder={t(placeholder)}
        type={type || "text"}
        fullWidth={fullWidth || false}
        value={textFieldValue}
        name={name}
        dir={sidebarRTL ? "rtl" : "ltr"}
        onChange={handleChange}
        inputProps={{
          style: { fontSize: "18px", fontWeight: "bold" },
        }}
      />
    </>
  );
};

CustomTextFeild.propTypes = {
  value: PropTypes.string, // Value for controlled component usage
  isDisabled: PropTypes.bool,
  defaultValue: PropTypes.string, // Default value to show in edit mode
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  autoFocus: PropTypes.bool,
  fullWidth: PropTypes.bool,
  multiline: PropTypes.bool,
  error: PropTypes.bool,
};

export default CustomTextFeild;
