import {useEffect, useState} from "react";
import {getCurrentPage, getPerPage, updatePaginationParams} from "../helpers/paginationHelper";

const usePagination = (getAllDataLogic) => {
    const [currentPerPage, setCurrentPerPage] = useState(getPerPage());
    const [currentPage, setCurrentPageState] = useState(getCurrentPage());

    useEffect(() => {
        getAllDataLogic();
    }, [currentPage, currentPerPage]);

    const handlePageChange = (page) => {
        setCurrentPageState(page);
        updatePaginationParams(page, currentPerPage);
    };

    const handlePerPageChange = (perPage) => {
        setCurrentPerPage(perPage);
        updatePaginationParams(currentPage, perPage);
    };

    return {
        currentPerPage,
        currentPage,
        handlePageChange,
        handlePerPageChange
    };
};

export const generatePaginationObject = (object, meta) => {
    return {
        meta,
        currentPerPage: object.currentPerPage,
        currentPage: object.currentPage,
        handlePageChange: object.handlePageChange,
        handlePerPageChange: object.handlePerPageChange
    }
}
export default usePagination;
