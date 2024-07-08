import CustomMuiButton from "./CustomMuiButton";
import { Box, TextField, Typography } from "@mui/material";
import CustomOptions from "./CustomOptions";
// import { useFormik } from "formik";
import { t } from "i18next";
import { useDispatch } from "react-redux";

import hasPermission from "../../utils/haspermission";
import TextEditor from "../CustomTextEditorInput";
export default function CustomContainerForm({
  lang,
  changeLangAction,
  formLanguageSwitcher,
  dataDescription,
  dataTitle,
  updateTitle,
  updateDescription,
  sendedImg,
  isDispatch,
  validationForm,
  sumbitFuction,
  submitIcon,
  formik,
}) {

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
        <Box display='flex' justifyContent='center'>

        <CustomOptions
        lang={lang}
          onClick={changeLangAction}
          formLanguageSwitcher={formLanguageSwitcher}
        />
        </Box>


        <TextEditor 
          id="description"
        
        value={dataDescription[lang]} onChange={(values)=>{
          console.log(values)
          dispatch(updateDescription(values.target.value))
        }}/>
        {/* <Typography variant="h3">{t("description")}</Typography> */}

{/*      
          //   <TextField multiline
          // fullWidth
          // rows={4}
          // dir= {lang =='ar' ? 'rtl':'ltr'}

          // name="description"
          // id="description"
          // required
          // onChange={(values) => {
          //   dispatch(updateDescription(values.target.value));
          // }}
          // inputProps={{
          //   style: { fontSize: "20px" },  
          // }}
          // onBlur={formik.handleBlur}
          // value={dataDescription[lang]}
          // variant="outlined"
          // placeholder="Enter description"
        /> */}

        <Box display="flex" justifyContent={"end"}>
          <CustomMuiButton
          width={"100%"}
          permission={!hasPermission('update-terms_and_conditions')}
          sendedImg={sendedImg}
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
