const httpStatus = require("../core/httpStatus");

class RouteNotFound extends Error {

    constructor(message) {
        super(message);
        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;
        this.status = httpStatus.NOT_FOUND;
    }

    statusCode() {
        return this.status;
    }
}

module.exports = RouteNotFound;