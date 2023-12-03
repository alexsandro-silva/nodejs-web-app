class Response {

    constructor(httpCode, content, contentType = 'text/html') {
        this.httpCode = httpCode;
        this.content = content;
        this.contentType = contentType;
    }

    setContentType(contentType) {
        this.contentType = contentType;
    }

}

module.exports = Response;