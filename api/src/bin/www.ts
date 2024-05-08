import process from "process";
import mongoose, {ConnectOptions} from "mongoose";
import http from "http";
import app from "@src/app";
import {config} from "@src/config/config";

const PORT = config.port;

app.set('port', PORT);

const server = http.createServer(app);

mongoose.connect(config.mongoose.url, {
    useUnifiedTopology: true,
    autoCreate: true,
    autoIndex: true,
} as ConnectOptions).then(() => {
    console.log('Connected to MongoDB');
    server.listen(PORT);
    server.on('error', onError);
    server.on('listening', onListening);
});

const onError = (error: any) => {
    if (error.syscall !== 'listen') {
        throw error
    }
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(`Port ${PORT} requires elevated privileges`)
            process.exit(1)
        case 'EADDRINUSE':
            console.error(`Port ${PORT} is already in use`)
            process.exit(1)
        default:
            throw error
    }
}

const onListening = () => {
    const address = server.address();
    const addr = typeof address === 'string' ? address : address?.port;
    console.log('Listening on ' + addr);
}