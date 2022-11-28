import PropTypes from "prop-types";

export default function Button(props) {
  return (
    <button className="rounded bg-blue-500 px-4 py-2 text-white">
      Add {props.text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.number.isRequired,
};
