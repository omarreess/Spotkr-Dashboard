import CustomMuiButton from "./CustomMuiButton";
import { Box, TextField, Typography } from "@mui/material";
import CustomOptions from "./CustomOptions";
// import { useFormik } from "formik";
import { t } from "i18next";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import CustomImgInput from "../../modules/site/setting/pages/CustomImgInput";
export default function CustomContainerFormWithImage({
  lang,
  changeLangAction,
  formLanguageSwitcher,
  dataDescription,
  dataTitle,
  updateTitle,
  updateDescription,
  dataLoopObject,
  isDispatch,
  validationForm,
  sumbitFuction,
  submitIcon,
  formik,
  imgs,
}) {
  const [img, setImg] = useState(imgs);
  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setImg(image);
  };
  useEffect(() => {}, [lang]);
  const dispatch = useDispatch();
  const showtitle = typeof dataTitle === "object" ? true : false;
  return (
    <Box
      display="flex"
      // bgcolor={(theme) => theme.palette.bg.main}
      padding={2}
      flexDirection={"column"}
      gap={5}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "90%",
          margin: "auto",
        }}
        onSubmit={formik.handleSubmit}
      >
        <CustomOptions
          onClick={changeLangAction}
          formLanguageSwitcher={formLanguageSwitcher}
        />

        <Typography variant="h5">{t("Title")}</Typography>

        {showtitle && (
          <TextField
            multiline
            fullWidth
            name="title"
            id="title"
            required
            onChange={(values) => {
              dispatch(updateTitle(values.target.value));
            }}
            onBlur={formik.handleBlur}
            value={dataTitle[lang]}
            variant="outlined"
            placeholder="Enter title"
          />
        )}

        <TextField
          multiline
          fullWidth
          rows={4}
          name="description"
          id="description"
          required
          onChange={(values) => {
            dispatch(updateDescription(values.target.value));
          }}
          onBlur={formik.handleBlur}
          value={dataDescription[lang]}
          variant="outlined"
          placeholder="Enter description"
        />
        {img && (
          <Box>
            <CustomImgInput />
          </Box>
        )}
        <Box display="flex" justifyContent={"end"}>
          <CustomMuiButton
            isDispatch={isDispatch}
            onClick={sumbitFuction}
            startIcon={submitIcon}
            text="Submit"
            type="Submit"
          />
        </Box>
      </form>
    </Box>
  );
}
