import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CategoryIcon from '@mui/icons-material/Category';
import ConstructionIcon from '@mui/icons-material/Construction';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaletteIcon from '@mui/icons-material/Palette';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SellIcon from '@mui/icons-material/Sell';
import StorageIcon from '@mui/icons-material/Storage';

export const handleRoute = (link) => {
    switch (link) {
        case 'employees_salaries':
            return { href: "/employeePayment", icon: <AccountBalanceWalletIcon sx={{width:"50px",opacity:"0.5", height:"50px"}} /> };
        case 'products':
            return { href: "/products", icon: <Inventory2Icon sx={{width:"50px",opacity:"0.5", height:"50px"}} /> };
        case 'car_fixes':
            return localStorage.getItem("type") === "admin" ? { href: "", icon: <ConstructionIcon sx={{width:"50px",opacity:"0.5", height:"50px"}} /> } : { href: "/car-fix", icon: <DirectionsCarFilledIcon sx={{width:"50px",opacity:"0.5", height:"50px"}} /> };
        case 'expenses':
            return { href: "/expenses", icon: <PriceChangeIcon sx={{width:"50px",opacity:"0.5", height:"50px"}} /> };
        case 'damaged_materials':
            return { href: "/damaged-materials", icon: <DataSaverOnIcon sx={{width:"50px",opacity:"0.5", height:"50px"}} /> };
        case 'purchased_materials':
            return { href: "/sell-product", icon: <SellIcon sx={{width:"50px",opacity:"0.5", height:"50px"}} /> };
        case 'brands':
            return { href: "/brand", icon: <BrandingWatermarkIcon sx={{width:"50px",opacity:"0.5", height:"50px"}} /> };
        case 'colors':
            return { href: "/colors", icon: <PaletteIcon sx={{width:"50px",opacity:"0.5", height:"50px"}} /> };
        case 'cars':
            return { href: "/cars", icon: <DirectionsCarIcon sx={{width:"50px",opacity:"0.5", height:"50px"}} /> };
        case 'visits':
            return { href: "/visits", icon: <PeopleAltIcon sx={{width:"50px",opacity:"0.5", height:"50px"}} /> };
        case 'visitors':
            return { href: "/visitors", icon: <PeopleAltIcon sx={{width:"50px",opacity:"0.5", height:"50px"}} /> };
        case 'visitors_cars':
            return { href: "/visitorsCars", icon: <DirectionsCarIcon sx={{width:"50px",opacity:"0.5", height:"50px"}} /> };
        case 'garages':
            return { href: "/garages", icon: <EmojiTransportationIcon sx={{width:"50px",opacity:"0.5", height:"50px"}} /> };
        case 'storehouses':
            return { href: "/storeHouse", icon: <StorageIcon sx={{width:"50px",opacity:"0.5", height:"50px"}} /> };
        case 'units':
            return { href: "/units", icon: <CategoryIcon sx={{width:"50px",opacity:"0.5", height:"50px"}} /> };
        case 'consumed_products':
            return { href: "/consumed-products", icon: <AssignmentIcon sx={{width:"50px",opacity:"0.5", height:"50px"}} /> };
        case 'tasks':
            return { href: "/tasks", icon: <AnnouncementIcon sx={{width:"50px",opacity:"0.5", height:"50px"}} /> };
        case 'roles':
            return { href: "/roles", icon: <PersonAddIcon sx={{width:"50px",opacity:"0.5", height:"50px"}} /> };
        case 'departments':
            return { href: "/department", icon: <HomeWorkIcon sx={{width:"50px",opacity:"0.5", height:"50px"}} /> };
        case 'jobs':
            return { href: "/job", icon: <LocalShippingIcon sx={{width:"50px",opacity:"0.5", height:"50px"}} /> };
        case 'job_announcements':
            return { href: "/job_announcements", icon: <AnnouncementIcon sx={{width:"50px",opacity:"0.5", height:"50px"}} /> };
        case 'applicants':
            return { href: "/applicants", icon: <PersonAddIcon sx={{width:"50px",opacity:"0.5", height:"50px"}} /> };
        case 'working_shifts':
            return { href: "/working_shifts", icon: <ScheduleIcon sx={{width:"50px",opacity:"0.5", height:"50px"}} /> };
        case 'employees':
            return { href: "/employees", icon: <EmojiPeopleIcon sx={{width:"50px",opacity:"0.5", height:"50px"}} /> };
        case 'vacations':
            return { href: "/vacations", icon: <CalendarTodayIcon sx={{width:"50px",opacity:"0.5", height:"50px"}} /> };
        case 'allowances_penalties_types':
            return { href: "/penalty", icon: <AttachMoneyIcon sx={{width:"50px",opacity:"0.5", height:"50px"}} /> };
        case 'employees_allowances':
            return { href: "/employee_allowances", icon: <AccountBalanceIcon sx={{width:"50px",opacity:"0.5", height:"50px"}} /> };
        case 'employees_penalties':
            return { href: "/EmployeePenalties", icon: <PriceChangeIcon sx={{width:"50px",opacity:"0.5", height:"50px"}} /> };
        default:
            return { href: "", icon: null };
    }
}
