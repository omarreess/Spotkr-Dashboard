import Button from "@mui/material/Button";
import { useDispatch } from 'react-redux';
import { t} from 'i18next';
import { PropTypes } from 'prop-types';
const CustomMuiButton = ({ text,permission, type, onClick ,isDispatch=true ,startIcon=null,background}) => {
  const dispatch= useDispatch();
  return (
    <Button
      variant="contained"
      display='flex'
      color='success'
      disabled={permission}
      justifyContent='center'
      type={type}
      sx={{
        // width:{width},
        background:`${background}`
      }}
      onClick={()=>{
        
        if(isDispatch){
          dispatch(onClick(text))
        }else{
          onClick(text)
        }
      }}
      // {...props}
      startIcon={startIcon}
    >
      {`${t(text)} `}
    </Button>
  );
};
CustomMuiButton.prototype = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  
  onClick: PropTypes.func.isRequired,
};
export default CustomMuiButton;
