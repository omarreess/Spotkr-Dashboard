import { useState } from "react";

export default function useMultiImageRemoveHook() {
  const [removedImgID, setRemovedImgID] = useState([]);
  const handleRemovingImg = (img) => {
    if (img) {
      setRemovedImgID([...removedImgID, img.id]);
    }
  };
  const removeAllImgs = (imgList) => {
    const removedImgs = imgList.map((img) => img?.id);

    setRemovedImgID([...removedImgID, ...removedImgs]);
  };
  return {
    removedImgID,
    setRemovedImgID,
    handleRemovingImg,
    removeAllImgs,
  };
}
