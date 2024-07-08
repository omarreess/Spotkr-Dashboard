import { Button} from "reactstrap";
import PropTypes from 'prop-types'
import { Edit } from "react-feather";
import {Link} from "react-router-dom";
import LinkDropDownItem from "./LinkDropDownItem";

const EditDropDownItem = ({ onClick, href, ...props}) => {
    return <LinkDropDownItem onClick={onClick} href={href} {...props}>
        <Edit className='font-medium-2' />
    </LinkDropDownItem>
}

export default EditDropDownItem;