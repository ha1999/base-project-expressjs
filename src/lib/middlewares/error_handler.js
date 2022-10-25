/**
 *
 * @description This function will be set when initiating app.
 * @define app.use(error404());
 */
export function error404 (req, res) {
    res.status(404).send({
        message: '404 - Not found',
        path: req.path
    });
};

/**
 *
 * @description This function will be set when initiating app.
 * @define app.use(errorHandler());
 */
export function errorHandler(error, req, res, next) {
        // console.log("ERROR: ", req.action, error.message);
    res.status(error.code || 400).send({
        code: error.code,
        message: "Error " + (req.action || "call api."),
        detail: error.name === "CustomError" ? error.message : ""
    });
}