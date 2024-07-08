import {useEffect, useState} from "react";
import {isObjEmpty} from "../Utils";

const useFormikLogic = (isSubmitting, errors) => {
    const [submit, setShouldSubmit] = useState(true);

    useEffect(() => {
        setShouldSubmit(!isSubmitting && isObjEmpty(errors))
    }, [errors, isSubmitting])

    const shouldSubmit = () => {
        return submit;
    }

    return {shouldSubmit}
}

export default useFormikLogic;