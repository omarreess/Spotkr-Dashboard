import DashboardIcon from '@mui/icons-material/Dashboard';
import { GiPartyPopper } from "react-icons/gi";
import { RiCoupon2Line } from "react-icons/ri";
import { AiFillBook } from "react-icons/ai";
import { FaChalkboardTeacher } from "react-icons/fa";

const RoutesArray = () => {
  return [
    
    {
      lable: "dashboard",
      icon: <DashboardIcon />,
      routes: [
        
        {
          title: "Third Party",
          to: "thirdParty",
          icon: <GiPartyPopper />,
          // permission: "all-product",
          // type: [
          //   USER_TYPES_ENUM.ADMIN,
          //   USER_TYPES_ENUM.MAIN_GARAGE,
          //   USER_TYPES_ENUM.ADMIN_EMPLOYEE,
          // ],
        },
        {
          title: "Coupons",
          to: "coupons",
          icon: <RiCoupon2Line         />,
        },
        {
          title: "Orders",
          to: "orders",
          icon: <AiFillBook />,
        },
        {
          title: "leader-board",
          to: "leader-board",
          icon: <FaChalkboardTeacher  />,
        },
      ],
    },
    
    
    
    
  ];
};

export default RoutesArray;
