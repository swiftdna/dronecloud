const fetch = require('node-fetch');
const FormData = require('form-data');
const _ = require('underscore');

const makeHTTPRequest = async (params) => {
    const {host, path, method, form} = params;
    let {body} = params;
    const formData = new FormData();

    if (form && !_.isEmpty(form)) {
        for (let key in form) {
            const keyData = form[key] && form[key] === 'string'? form[key] : JSON.stringify(form[key]) ;
            formData.append(key, keyData);
        }
    }
    if (_.isEmpty(body) && !_.isEmpty(form)) {
        body = formData;
    }
    const response = await fetch(`${host}${path}`, {method, body});
    let data = await response.text();
    console.log(data,"%%%%")
    if (data && typeof data === 'string') {
        data = JSON.parse(data);
    }
    
    return data;
};

module.exports = {
	makeHTTPRequest
};