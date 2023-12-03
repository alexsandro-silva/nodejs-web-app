const http = require('http');
const url = require('url');
const Router = require('./src/app/core/router');
const view = require('./src/app/core/view');
const homeController = require('./src/app/controllers/homeController');

const router = new Router();

router.get('/', (request, response) => {
    response.writeHead(200);
    response.write("Hello, world!!");
});

// router.get('/greetings', (request, response) => {

//     response.writeHead(200, { 'Content-type': 'text/html' });
//     try {
//         response.write(view.renderView('index', {
//             title: 'Greetings',
//             greetings: 'Hello, everyone!!'
//         }));
//     } catch (error) {
//         response.writeHead(404, error.message);
//     }

// });

router.get('/greetings', homeController.index);

router.get('/user/:id', (req, res) => {
    res.writeHead(200, { 'Content-type': 'text/html'});
    res.write('User');
});

router.get('/user/:id/address/:addressId', (req, res) => {
    res.writeHead(200, { 'Content-type': 'text/html'});
    res.write('User');
});

router.get('/notFound', (req, res) => {
    res.write('not found');
})

const app = http.createServer();

app.on('request', (request, response) => {
    /**
     * handle favicon request to prevent weird double requests
     */
    if (request.url === '/favicon.ico') {
        response.writeHead(200, {'Content-type': 'image/x-icon'});
        response.end();
        return;
    }

    try {
        let pathname = url.parse(request.url).pathname;
        const route = router.getRoute(request.method, pathname);
        route.controller(request, response);
    } catch(error) {
        response.writeHead(error.status, {'Content-type': 'text/plain'});
        response.write(error.message);
    }

    response.end();
});

app.listen(8888, () => {
    console.log("server is running");
})