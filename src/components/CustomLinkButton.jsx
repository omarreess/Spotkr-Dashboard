import { Link } from "react-router-dom";
import EditButton from "./editButton";
import { PropTypes } from "prop-types";

const CustomLinkButton = ({ to, text }) => {
  return (
    <Link to={to}>
      <EditButton text={text} /> 
    </Link>
  );
};
CustomLinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  params: PropTypes.string,
  text: PropTypes.string,
};
export default CustomLinkButton;
