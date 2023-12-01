const http = require('http');
const url = require('url');
const Router = require('./src/app/core/router');

const router = new Router();

router.get('/', (request, response) => {
    let res = new Response('hello');
    response.writeHead(200);
    response.write("Hello, world!!");
});

router.get('/greetings', (request, response) => {
    response.writeHead(200, { 'Content-type': 'text/html' });
    response.write('<h1>Greetings from the web!</h1>');
})

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