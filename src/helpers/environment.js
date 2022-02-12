let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:3000';
        break;
    case 'amp-gameexchange.herokuapp.com':
        APIURL = 'https://amp-gameexchange-server.herokuapp.com/';
};

export default APIURL;