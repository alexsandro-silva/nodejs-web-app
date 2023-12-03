const RouteNotFound = require("../errors/route-not-found-error");
const httpStatus = require("./httpStatus");

class Router {
    routes = [];

    /**
     * Add a route
     * @param {String} method Http method
     * @param {String} uri Request URI
     * @param {CallableFunction} controller 
     */
    addRoute(method, uri, controller) {
        let uriPattern = uri.replace(/(:\w+)/g, "(\\w+)");
        this.routes.push({ method, uri: new RegExp(uriPattern + '$'), controller });
        //console.log(this.routes);
    }

    /**
     * Get a route
     * @param {String} method Http method
     * @param {String} uri Request URI
     * @returns Route object
     */
    getRoute(method, uri) {
        let route = this.routes.find((route) => route.method === method && route.uri.test(uri));
        if (route) {
            const uriParams = uri.match(route.uri) || [];
            uriParams.shift(); //remove first element
            route = {...route, params: [...uriParams]};
            //console.log(route);
            //console.log('tamanho: ' + uriParams.length);
            return route;    
        }

        throw new RouteNotFound('Route not found');
    }

    get(uri, controller) {
        this.addRoute('GET', uri, controller);
        return this;
    }

    post(uri, controller) {
        this.addRoute('POST', uri, controller);
        return this;
    }
}

module.exports = Router;