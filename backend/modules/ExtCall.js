const fetch = require('node-fetch');
const FormData = require('form-data');
const _ = require('underscore');

const makeHTTPRequest = async (params) => {
    const {host, path, method, form} = params;
    let {body} = params;
    const formData = new FormData();

    if (form && !_.isEmpty(form)) {
        for (let key in form) {
            formData.append(key, form[key]);
        }
    }
    if (_.isEmpty(body) && !_.isEmpty(form)) {
        body = formData;
    }
    const response = await fetch(`${host}${path}`, {method, body});
    const data = await response.text();
    return data;
};

module.exports = {
	makeHTTPRequest
};