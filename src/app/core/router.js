class Router {
    routes = [];

    addRoute(method, uri, controller) {
        this.routes.push({ method, uri, controller });
        console.log(this.routes);
    }

    getRoute(method, uri) {
        return this.routes.find((route) => route.method === method && route.uri === uri);
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