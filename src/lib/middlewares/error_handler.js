/**
 *
 * @description This function will be set when initiating app.
 * @define app.use(error404());
 */
export function error404() {
    return function (_, res) {
        res.sendError({code: 404, message: '404 - Not found'});
    };
}

/**
 *
 * @description This function will be set when initiating app.
 * @define app.use(errorHandler());
 */
export function errorHandler() {
    return function (error, req, res, next) {
        console.log("ERROR: ", req.action, error.message);
        res.sendError({
            code: error.code,
            message: "Error " + (req.action || "call api."),
            detail: error.name === "CustomError" ? error.message : ""
        });
    }
}