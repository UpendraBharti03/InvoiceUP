import process from "process";
import mongoose, {ConnectOptions} from "mongoose";
import http from "http";
import moduleAlias from "module-alias";
import path from 'path';
import dotenv from 'dotenv';

import app from "../app";

moduleAlias({
    base: path.join(__dirname, '../../')
})

dotenv.config({ path: path.join(__dirname, '../../.env') });

const PORT = process.env.port;

app.set('port', PORT);

const server = http.createServer(app);

mongoose.connect(process.env.MONGODB_URL ?? '', {
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