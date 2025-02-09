export const asyncHandler = (execution) => (req, res, next) => {
    execution(req, res, next).catch(next);
};

//execution is the function that will be executed

// If an error occurs inside execution, catch(next) 
// automatically forwards it to Express's error middleware.
