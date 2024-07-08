import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { useRef } from "react";
import { useSelector } from "react-redux";
import CustomTextFeild from "../../../components/CustomTextFeild/CustomTextFeild.jsx";
import EditButton from "../../../components/editButton.jsx";
import { ROUTES_PATHES } from "../../../constants/routesPathes.js";
import { formatDate } from "../../../helpers/dateFormat.js";
import useMainHooks from "../../../hooks/useMainHooks.jsx";
import { addCoupons, getCoupons } from "../redux/action.js";

const CouponsForm = ({ pageSize }) => {
  const formRef = useRef();
  const loading = useSelector((state) => state.couponsSlice.loading);
  const { sidebarRTL, navigate, dispatch } = useMainHooks();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formRef.current) {
      return;
    }
    const data = {
      code: formRef.current.code.value,
      discount: formRef.current.discount.value,
      number_of_users: formRef.current.number_of_users.value,
      valid_till: formatDate(formRef.current.valid_till.value),
      status: formRef.current.status.checked,
    }
    await dispatch(addCoupons( data ))
      .unwrap()
      .then(() => {
        dispatch(getCoupons({ pageSize }));
        navigate(ROUTES_PATHES.COUPONS);
      });
  };

  return (
    <Box m="20px">
      <form
        ref={formRef}
        onSubmit={handleFormSubmit}
        dir={ "ltr"}
      >
        <div
          style={{ display: "flex", gap: "20px", flexDirection: "row" }}
        >
          <label>Status</label>
          <input

            style={{ width: "1.2rem" }}
            placeholder="Status"
            type="checkbox"
            name="status"
          />
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            gap:"30px",
            padding:"2rem",
            flexWrap: "wrap",
            margin:"1rem auto",
          }}
        >
          <div
            style={{ display: "flex", width: "48%", flexDirection: "column" }}
          >
            <CustomTextFeild placeholder={"code"} name={"code"} type={"text"} />
          </div>

          <div
            style={{ display: "flex", width: "48%", flexDirection: "column" }}
          >
            <CustomTextFeild
              placeholder={"Valid Till"}
              name={"valid_till"}
              type={"datetime-local"}
            />
          </div>
          <div             style={{ display: "flex", width: "48%", flexDirection: "column" }}
>
            <CustomTextFeild
              placeholder={"Number Of Users"}
              name={"number_of_users"}
              type={"number"}
            />
          </div>
          <div             style={{ display: "flex", width: "48%", flexDirection: "column" }}
>
            <CustomTextFeild
              placeholder={"Discount"}
              name={"discount"}
              type={"number"}
            />
          </div>
        </div>
        <EditButton
          text={"Add"}
          fullWidth={true}
          type="submit"
          disabled={loading}
        />
      </form>
    </Box>
  );
};
CouponsForm.propTypes = {
  pageSize: PropTypes.number,
};
export default CouponsForm;
