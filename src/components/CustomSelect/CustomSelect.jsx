import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import Select from "react-select";
import { useSidebarContext } from "../../pages/global/sidebar/sidebarContext";
import CustomLable from "../CustomLable";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const CustomSelectMenu = ({
  options,
  selected,
  name,
  sx,
  lable,
  isDisabled,
  onChange = null,
  defaultData,
  loading,
  helperText,
  width,
  required,
}) => {
  const { t } = useTranslation();
  const { sidebarRTL } = useSidebarContext();
  const [selectedValue, setSelectedValue] = useState(options?.find(item=>item.id == defaultData));

  useEffect(() => {
    const updatedSelectedObject = options?.find(
      (option) => option?.id == defaultData
    );
    setSelectedValue(updatedSelectedObject || null);
  }, [defaultData, options]);

  const handleOnChange = (selectedOption) => {
    console.log(selectedOption,"selectedOption")
    setSelectedValue(selectedOption);
    if (onChange) {
      onChange(selectedOption);
    }
  };
  console.log("selectedValue", selectedValue);
  console.log("default", defaultData);
  console.log("optionsoptionsoptions", options);
  return (
    <Box
      dir={sidebarRTL ? "rtl" : "ltr"}
      sx={{ margin: "1rem auto", width: width } || sx}
    >
      {lable ? (
        <Box sx={{ display: "flex", alignItems: "start",flexDirection:"row",justifyContent:"start" }}>
          <CustomLable title={lable} />
        </Box>
      ) : null}
      <Select
        placeholder={t("Select Option")}
        isDisabled={!!isDisabled}
        isSearchable={true}
        required={required || false}
        isClearable={true}
        isLoading={loading}
        isMulti={false}
        defaultValue={selectedValue}
        name={name}
        value={selectedValue}
        isOptionDisabled={(SelectedOption) =>
          SelectedOption?.id === selected?.id
        }
        helperText={helperText}
        onChange={handleOnChange}
        getOptionLabel={(option) => option?.name}
        getOptionValue={(option) => option?.id}
        options={options || []}
        styles={{
          menu: (provided) => ({
            ...provided,
            color: "#000",
            direction: sidebarRTL ? "rtl" : "ltr",
          }),
          container: (provided) => ({
            ...provided,
            direction: sidebarRTL ? "rtl" : "ltr",
          }),
          menuPortal: (provided) => ({
            ...provided,
            direction: sidebarRTL ? "rtl" : "ltr",
          }),
        }}
      />
    </Box>
  );
};
CustomSelectMenu.propTypes = {
  options: PropTypes.array.isRequired,
  selected: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  sx: PropTypes.object.isRequired,
  lable: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  defaultData: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  helperText: PropTypes.string,
  width: PropTypes.string,
  required: PropTypes.bool,
};
export default CustomSelectMenu;
