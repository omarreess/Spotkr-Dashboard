import {useFormik} from "formik";
import FormikConfig from "./formikConfig";
import PropTypes from "prop-types";
import {HttpResponse} from "../../constants/api";
import toastFactory from "../factories/toastFactory";
import {isObjEmpty} from "../Utils";

export const formikInstance = (props) => {
    const formikConfig = FormikConfig(props)

    return useFormik(formikConfig)
}

function setNestedValue(obj, keys, value) {
    const key = keys.shift();

    if (keys.length === 0) {
        obj[key] = value;
        return;
    }

    if (!obj[key]) {
        obj[key] = isNaN(keys[0]) ? {} : [];
    }

    setNestedValue(obj[key], keys, value);
}

function generateNestedObject(flatObject) {
    const nestedObject = {};

    Object.keys(flatObject).forEach(key => {
        const keys = key.split('.');
        setNestedValue(nestedObject, keys, flatObject[key]);
    });

    return nestedObject;
}

export const formikErrorHandler = (response, formikObject) => {

    if (response.code !== HttpResponse.VALIDATION_ERRORS) {
        return;
    }

    const {initialValues, setErrors} = formikObject;

    const errorKeys = Object.keys(initialValues);

    const tmpErrors = generateNestedObject(response.data)

    // const tmpErrors = {}
    //
    // errorKeys.forEach((errorKey) => {
    //     console.log(errorKey);
    //     if (response.data[errorKey] !== undefined) {
    //         tmpErrors[errorKey] = response.data[errorKey]
    //     }
    // })

    if (!isObjEmpty(tmpErrors)) {
        setErrors(tmpErrors)
    }

    const responseErrorKeys = Object.keys(response.data);

    for (let i = 0; i < responseErrorKeys.length; i++) {
        if (!errorKeys.includes(responseErrorKeys[i])) {
            toastFactory.error(response.data[responseErrorKeys[i]])
            break;
        }
    }
}

export const buildFormikParams = (formik) => {
    return {
        setErrors: formik.setErrors,
        initialValues: formik.initialValues,
        setSubmitting: formik.setSubmitting
    }
}

export const generateFormikForm = (formik) => {
    return {
        handleChange: formik.handleChange,
        handleSubmit: formik.handleSubmit,
        handleBlur: formik.handleBlur,
        values: formik.values,
        errors: formik.errors,
        isValid: formik.isValid,
        isSubmitting: formik.isSubmitting,
        setFieldValue: formik.setFieldValue,
        resetForm: formik.resetForm
    }

}
formikInstance.propTypes = {
    initialValues: PropTypes.object,
    validationSchema: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    overrideConfig: PropTypes.object
}