module.exports = (commandArgsArray) => {
    if (commandArgsArray.length < 2) {
        throw new Error('Not all arguments are passed to the script!');
    }
    else {
        return commandArgsArray;
    }
};
