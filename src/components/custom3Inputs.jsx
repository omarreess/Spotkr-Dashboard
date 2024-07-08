import { useEffect, useRef } from "react";

import { useFormik } from "formik";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CustomFormikTextFeild } from "./CustomFormikTextFeild/customFormikTextFeild";


export default function Custom3Inputs({ data, input, mlutiLine, handleOnChange, lang }) {
  const formRef = useRef();
  const { t } = useTranslation()

  const formik = useFormik({
    initialValues: {
      ar: data ? data.ar : "",
      en: data ? data.en : "",
    },
    enableReinitialize: true,
    onChange: (value) => {
      handleOnChange(value);
    },
  });
  const languages = ["ar", "en"];

  useEffect(() => {
    handleOnChange(formik.values);
  }, [lang, formik.values]);
  return (
    <Box>
      <Box>
        <form ref={formRef}>

          {languages.map((language) => (
            lang === language && (
              <CustomFormikTextFeild
                key={language}
                title={`${t(input)} `}
                name={language}
                dir={language === "ar" ? "rtl" : "ltr"}
                fullWidth={true}
                isMulti={mlutiLine}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[language]}
                helperText={formik.touched[language] && formik.errors[language]}
                error={formik.touched[language] && formik.errors[language]}
              />
            )
          ))}

        </form>
      </Box>
    </Box>
  );
}
