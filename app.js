import express from 'express';
import generateGateway from './mmo-gateway/dist/app.js'
import Logger from './mmo-gateway/src/loaders/logger';


async function startServer(port) {
	const app = express()
	const gatewayApp = await generateGateway();

	app.use("/", gatewayApp);

	const server = app.listen(port);
	server.on('error', onError);
	server.on('listening', () => onListening(server));
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      Logger.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      Logger.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(server) {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  Logger.debug('Listening on ' + bind);
}

startServer(3000)