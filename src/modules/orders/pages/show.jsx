import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import useMainHooks from "../../../hooks/useMainHooks";
import Container from "./container";
import { FaXmark } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";
import { getOneOrder } from "../redux/action";

const OrderShow = () => {
  const { id } = useParams();
  const { dispatch } = useMainHooks();
  const data = useSelector(
    (state) => state.orderSlice.oneOrderData?.data
  );
  useEffect(() => {
    dispatch(getOneOrder({ id }));
  }, [id]);

  return (
    <div className="m-[20px auto] p-4 flex flex-row flex-wrap w-full gap-[10px] justify-evenly">
    <div className="w-[45%]">
        <Container>
          <div className="mx-auto font-bold">User Information</div>
          <div className="flex flex-col gap-[20px] flex-wrap font-bold">
          <span>Name: {data?.user_details.name}</span>
          <span>Email: {data?.user_details?.email}</span>
          <span>Phone: {data?.user_details.phone}</span> 
          </div>
        </Container>
      </div>

      <div className="w-[45%]">
        <Container>
          <div className="mx-auto font-bold">Order Information</div>
          <div className="flex flex-col gap-[20px] flex-wrap font-bold">
          <span>Adults Count: {data?.adults_count}</span>
          <span>Children Count: {data?.children_count}</span>
          <span>Cost: {data?.cost}</span>
          <span>Sessions Count: {data?.sessions_count}</span>
          <span>Created at: {data?.created_at}</span>
          <span>Calendar Date: {data?.calendar_date}</span>
            
          
          </div>
        </Container>
      </div>
      <div className="w-[95%]">
        <Container>
          <div className="mx-auto font-bold">Activity Information</div>
          <div className="flex flex-col gap-[20px] flex-wrap font-bold">
          <div className="w-full flex justify-evenly mx-auto flex-row flex-wrap">
          <span>Name: {data?.activity.name}</span>
          <span>Type: {data?.activity.type}</span>
          </div>
          <div className={"flex w-full justify-center items-center p-4 h-[300px]"}>
            <img className={"w-full h-full object-contain"} src={data?.activity.main_image}/>
          </div>
          <div className={"flex w-full justify-center items-center "}>
            <span className={"text-lg p-2"}>{data?.activity.description}</span>
          </div>
            
          
          </div>
        </Container>
      </div>
      
    </div>
  );
};
export default OrderShow;
