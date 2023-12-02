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
    }

    /**
     * Get a route
     * @param {String} method Http method
     * @param {String} uri Request URI
     * @returns Route object
     */
    getRoute(method, uri) {
        const route = this.routes.find((route) => route.method === method && route.uri.test(uri));
        console.log('regexp: ' + route.uri);
        const uriParams = uri.match(route.uri) || [];
        console.log(uriParams);
        console.log('tamanho: ' + uriParams.length);
        return route;
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