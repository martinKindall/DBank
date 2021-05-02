exports.wait = s => {
    const milliseconds = s * 1000
    return new Promise(resolve => setTimeout(resolve, milliseconds))
};
