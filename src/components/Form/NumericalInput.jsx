import PropTypes from "prop-types";

export default function NumericalInput({ id, placeholder, handleBlur }) {
  return (
    <>
      <label htmlFor={id} className="sr-only">
        {id}
      </label>
      <input
        id={id}
        type="number"
        className="rounded-md border border-gray-300 p-2"
        placeholder={placeholder}
        onBlur={handleBlur}
      />
    </>
  );
}

NumericalInput.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleBlur: PropTypes.func.isRequired,
};
