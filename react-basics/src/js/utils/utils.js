function allowNull(wrappedPropTypes) {
    return (props, propName, ...rest) => {
        if (props[propName] === null) return null;
        return wrappedPropTypes(props, propName, ...rest);
    }
}

// Example of usage
// MyComponent.propTypes = {
//     nullOrNumber: allowNull(PropTypes.number.isRequired) // null + number types allowed
// };