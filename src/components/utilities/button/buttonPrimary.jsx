import PropTypes from "prop-types";
import clsx from "clsx";

const ButtonPrimary = ({
    as: Component = "button",
    children,
    className = "",
    type,
    ...props
}) => {
    const baseClasses =
        "bg-gradient-to-r text-center from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white px-7 py-2.5 rounded-lg transition font-semibold shadow-md";

    return (
        <Component
            className={clsx(baseClasses, className)}
            type={Component === "button" ? type || "button" : undefined}
            {...props}
        >
            {children}
        </Component>
    );
};

ButtonPrimary.propTypes = {
    as: PropTypes.elementType,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    type: PropTypes.string,
};

export default ButtonPrimary;