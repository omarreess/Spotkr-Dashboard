import {useEffect} from "react";
import toastFactory from "../factories/toastFactory";
import {useSelector} from "react-redux";

export const toastLoader = (isLoading) => {
    if (typeof isLoading === 'string') {
        const tableLoading = useSelector(state => state[isLoading].all.loading)
        const deleteLoading = useSelector(state => state[isLoading].deleteLoading);
        isLoading = tableLoading || deleteLoading
    }

    useEffect(() => {
        if (isLoading) {
            toastFactory.dismiss()
            toastFactory.loading('Loading')
        } else {
            toastFactory.dismiss()
        }
    }, [isLoading])
}