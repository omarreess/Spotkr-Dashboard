import {Info} from "react-feather";
import LinkDropDownItem from "./LinkDropDownItem";

const DetailsDropDownItem = ({ onClick, href, ...props}) => {
    return <LinkDropDownItem onClick={onClick} href={href} {...props}>
        <Info className='font-medium-2' />
    </LinkDropDownItem>
}

export default DetailsDropDownItem;