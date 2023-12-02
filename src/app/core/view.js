const fs = require('fs');
const path = require('path');

const renderView = (view, data) => {
    let viewPath = path.resolve(__dirname, '../resources/pages/' + view + '.html');

    if (!fs.existsSync(viewPath)) {
        throw new Error('View not found. Path: ' + viewPath);
    }

    let _view = fs.readFileSync(viewPath).toString();

    Object.keys(data).forEach(item => {
        _view = _view.replace('{{' + item + '}}', data[item]);
    });

    return _view;
}

module.exports = { renderView };