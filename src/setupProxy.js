const proxy = require('http-proxy-middleware')
 

//must restart server upon change!
module.exports = function(app) {
    app.use(proxy(['/trip', '/test', '/location'], { target: 'http://localhost:5000' }));
}