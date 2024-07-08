import {Link} from "react-router-dom";
import {Plus} from "react-feather";
import {Button} from "reactstrap";

const AddButton = (props) => {
    return <Button className='ms-2' color='primary' tag={Link} {...props}>
        <Plus size={15} />
        <span className='align-middle ms-50'>Add Record</span>
    </Button>
}

export default AddButton;