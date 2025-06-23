import PropTypes from "prop-types";
import clsx from "clsx";

function FormPrimary({
  as: Component = "form",
  children,
  className = "",
  ...props
}) {
  const baseClasses =
    "bg-white p-8 rounded-xl w-full max-w-md space-y-6";

  return (
    <Component className={clsx(baseClasses, className)} {...props}>
      {children}
    </Component>
  );
}

FormPrimary.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default FormPrimary;
