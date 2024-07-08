import {useEffect, useState} from "react";

const useImageUrl = (defaultImage) => {
    const [imageUrl, setImageUrl] = useState(defaultImage)

    useEffect(() => {
        setImageUrl(defaultImage || null)
    }, [defaultImage]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImageUrl(url);
        }
    };

    return {imageUrl, handleImageChange};
}

export default useImageUrl;