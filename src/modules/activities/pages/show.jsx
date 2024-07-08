import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import useMainHooks from "../../../hooks/useMainHooks";
import { getOneActivity } from "../redux/action";
import Container from "./container";
import { FaXmark } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";
import Map from "../../../components/map";
import ImagesSection from "./oneActivityImagesSection";

const ActivitiesShow = () => {
  const { thirdId, id } = useParams();
  const { dispatch } = useMainHooks();
  const data = useSelector(
    (state) => state.activitiesSlice.oneActivityData?.data
  );
  useEffect(() => {
    dispatch(getOneActivity({ id, thirdId }));
  }, [id, thirdId]);

  console.log(data);
  return (
    <div className="m-[20px auto] p-4 flex flex-row flex-wrap w-full gap-[10px] justify-evenly">
    <ImagesSection data={data}/>
    <div className="w-[45%]">
        <Container>
          <div className="mx-auto font-bold">Basic Information</div>
          <div className="flex flex-col gap-[20px] flex-wrap font-bold">
          <span>Name: {data?.name}</span>
          <span>Address: {data?.address?.address}</span>
          <span>Price: {data?.price}</span>
          <span>Discount: {data?.discount || 0}</span>
          <span>Type: {data?.type}</span>
          <span>Status: {data?.status}</span>
          <span className="flex gap-[10px]">
            Adrenaline Rush:{" "} 
            {data?.include_in_adrenaline_rush ? (
              <IoMdCheckmark className="text-green-700 text-[20px]" />
            ) : (
              <FaXmark className="text-red-700 text-[20px]" />
            )}
          </span>
          <span className="flex gap-[10px]">
            Carousel:{" "}
            {data?.include_in_carousel ? (
              <IoMdCheckmark className="text-green-700 text-[20px]" />
            ) : (
              <FaXmark className="text-red-700 text-[20px]" />
            )}
          </span>
          <span>Created At: {data?.created_at}</span>
          <span>Hold On: {data?.hold_on}</span>

          <Stack spacing={1}>
            <Rating
              name="half-rating-read"
              defaultValue={2.5}
              precision={0.5}
              readOnly
            />
          </Stack> 
          </div>
        </Container>
      </div>

      <div className="w-[45%]">
        <Container>
          <div className="mx-auto font-bold">Contact Information</div>
          <div className="flex flex-col gap-[20px] flex-wrap font-bold">
          <span>Phone: {data?.phone}</span>
          <span>Email: {data?.email}</span>
          <span>Fax: {data?.fax}</span>
          <a href={data?.website} target="_blank">Site Link</a>
            <span>
              {data?.social_links?.map(item=> <a href={item} target="_blank">Social Link</a>)}
            </span>
          <span>
            Open Times:{" "}
            {data?.open_times?.map((item) => (
              <div className=" w-full flex flex-row gap-[10px]">
                <>From:{item.from}</>
                <>to:{item.to}</>
                <>day:{item.day}</>
              </div>
            ))}
          </span>
          </div>
        </Container>
      </div>
      <div className=" w-[95%] mx-auto rounded-md">
        <Map position={data?.address} />
      </div>
    </div>
  );
};
export default ActivitiesShow;
