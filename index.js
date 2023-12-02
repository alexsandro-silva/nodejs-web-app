const http = require('http');
const url = require('url');
const Router = require('./src/app/core/router');
const view = require('./src/app/core/view');

const router = new Router();

router.get('/', (request, response) => {
    response.writeHead(200);
    response.write("Hello, world!!");
}).get('/greetings', (request, response) => {

    response.writeHead(200, { 'Content-type': 'text/html' });
    try {
        response.write(view.renderView('index', {
            title: 'Greetings',
            greetings: 'Hello, everyone!!'
        }));
    } catch (error) {
        response.writeHead(404, error.message);
    }

});

router.get('/user/:id', (req, res) => {
    res.writeHead(200, { 'Content-type': 'text/html'});
    res.write('User');
});

router.get('/user/:id/address/:id', (req, res) => {
    res.writeHead(200, { 'Content-type': 'text/html'});
    res.write('User');
});

const app = http.createServer();

app.on('request', (request, response) => {
    let pathname = url.parse(request.url).pathname;
    const route = router.getRoute(request.method, pathname);
    if (route) {
        route.controller(request, response);
    }

    response.end();
});

app.listen(8888, () => {
    console.log("server is running");
})