import {pushSearchParam} from "../helpers/searchHelper";

const useSearch = (getAllDataLogic) => {
    const handleSearch = (value) => {
        pushSearchParam(value)
        getAllDataLogic()
    }

    return {handleSearch}
}

export default useSearch;