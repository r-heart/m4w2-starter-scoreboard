import Button from "./Button";
import PropTypes from "prop-types";

export default function Buttons({ buttons, handleClick }) {
  return (
    <div className="flex flex-row gap-x-4">
      {buttons.map((button) => (
        <Button key={button} text={button} handleClick={handleClick} />
      ))}
    </div>
  );
}

Buttons.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleClick: PropTypes.func.isRequired,
};
