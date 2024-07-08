import {Link} from "react-router-dom";
import {Info} from "react-feather";
import PropTypes from "prop-types";

const ShowDropDownItem = ({ onClick, href}) => {
    return <Link size='sm' to={href} color='transparent' className='btn btn-icon' onClick={onClick}>
        <Info className='font-medium-2' />
    </Link>
}

export default ShowDropDownItem;