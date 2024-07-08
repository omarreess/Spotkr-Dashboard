import {Button, Col} from "reactstrap";
import {Plus, X} from "react-feather";
import {useEffect, useState} from "react";

const useRepeaterLogic = ({defaultCount = 0} = {}) => {
    const [count, setCount] = useState(defaultCount)
    const repeaterItemClass = 'repeater-item';

    useEffect(() => {
        setCount(defaultCount)
    }, [defaultCount]);

    const deleteForm = e => {
        e.preventDefault()
        const slideDownWrapper = e.target.closest('.react-slidedown'),
            form = e.target.closest(`.${repeaterItemClass}`)
        if (slideDownWrapper) {
            slideDownWrapper.remove()
        } else {
            form.remove()
        }
    }

    const repeaterDeleteAction = () => {
        return (<><Col md={2}>
            <Button color='danger' type='button' className='text-nowrap px-1' onClick={deleteForm} outline>
                <X size={14} className='me-50'/>
                <span>Delete</span>
            </Button>
        </Col>
            <Col sm={12}>
                <hr/>
            </Col></>)
    }

    const repeaterAddNew = () => {
        return <Button className='btn-icon' type='button' color='primary' onClick={() => setCount(count + 1)}>
            <Plus size={14}/>
            <span className='align-middle ms-25'>Add New</span>
        </Button>
    }

    return {repeaterDeleteAction, repeaterAddNew, repeaterItemClass, count};
}

export default useRepeaterLogic;