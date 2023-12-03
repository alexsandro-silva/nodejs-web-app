const httpStatus = require('../core/httpStatus');
const Response = require('../core/response');
const { renderView } = require('../core/view');


const homeController = {

    index: (request, response) => {
        const viewContent = renderView('index', {
            title: 'Greetings',
            greetings: 'Hello, everyone'
        });

        response.writeHead(httpStatus.OK, {'Content-type': 'text/html'});
        response.write(viewContent);
    }
}

module.exports = homeController;