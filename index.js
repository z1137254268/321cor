var host = process.env.HOST || '0.0.0.0';
var port = process.env.PORT || 8080;

// Set up rate-limiting to avoid abuse of the public CORS Anywhere server.
var checkRateLimit = require('./lib/rate-limit')(process.env.CORSANYWHERE_RATELIMIT);

var cors_proxy = require('./lib/cors-anywhere');
cors_proxy.createServer({
  checkRateLimit: checkRateLimit,
  removeHeaders: ['cookie', 'cookie2'],
  redirectSameOrigin: true,
  httpProxyOptions: {xfwd: false},
}).listen(port, host, function() {
  console.log('Running CORS Anywhere on ' + host + ':' + port);
});
