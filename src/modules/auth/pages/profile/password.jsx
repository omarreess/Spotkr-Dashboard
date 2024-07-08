import { useState } from "react";
import { useFormik } from "formik";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Button, useTheme } from "@mui/material";
import { tokens } from "../../../../theme.js";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../../../pages/global/sidebar/sidebarContext.js";
import DefaultButton from "./defaultBtn.jsx";
import { StatuseCode } from "../../../../statuseCodes.js";
import CustomPassword from "../../../../components/PasswordAndConfirmPassword/PassAndConfPass.jsx";
import { profilePasswordSchema } from "../../../../utils/ValidationSchema.js";
import PropTypes from "prop-types";
import { changePassword } from "../../redux/changePassowrd.js";

const PasswordChange = ( ) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { sidebarRTL } = useSidebarContext();

  const formik = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
    validationSchema: profilePasswordSchema,
    onSubmit: async (values) => handleSubmit(values),
  });
  const handleSuccessClose = () => {
    setOpen(false);
    formik.resetForm();
  };
  const handleSubmit = async (values) => {
    console.log(values);
    await dispatch(changePassword({data:values})).then((res) => {
      res.payload.code === StatuseCode.OK && handleSuccessClose();
    });
  };
  const handleClickOpen = () => {
    setOpen(true);
    formik.resetForm();
  };
  const passwordFieldArray = [
    {
      name: "old_password",
      value: formik.values.old_password,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: "old_password",
      req: true,
      error: !!formik.touched.old_password && !!formik.errors.old_password,
      helperText: formik.touched.old_password && formik.errors.old_password,
    },
    {
      name: "new_password",
      value: formik.values.new_password,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: "new_password",
      req: true,
      error: !!formik.touched.new_password && !!formik.errors.new_password,
      helperText: formik.touched.new_password && formik.errors.new_password,
    },
    {
      name: "new_password_confirmation",
      value: formik.values.new_password_confirmation,
      handleChange: formik.handleChange,
      onBlur: formik.handleBlur,
      placeholder: "new_password_confirmation",
      req: true,
      error:
        !!formik.touched.new_password_confirmation &&
        !!formik.errors.new_password_confirmation,
      helperText:
        formik.touched.new_password_confirmation &&
        formik.errors.new_password_confirmation,
    },
  ];
  return (
    <div>
      <DefaultButton
        handleClick={handleClickOpen}
        text={t("Change Password")}
      />
      <Dialog
        fullWidth={true}
        sx={{ width: { xs: "100%", md: "50%" }, margin: "auto", padding: "0" }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogContent dir={sidebarRTL ? "rtl" : "ltr"}>
          {passwordFieldArray.map((item, index) => (
            <CustomPassword
              key={index}
              helperText={item.helperText}
              req={item.req}
              error={item.error}
              name={item.name}
              value={item.value}
              onBlur={item.onBlur}
              onChange={item.handleChange}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => setOpen(false)}
          >
            {t("Cancel")}
          </Button>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 15px",
            }}
            disabled={!formik.isValid || formik.isSubmitting}
            onClick={formik.handleSubmit}
         
          >
            {t("edit")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
PasswordChange.PropTypes = {
  icon: PropTypes.any,
};
export default PasswordChange;
