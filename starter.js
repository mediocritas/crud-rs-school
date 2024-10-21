import { v4 as uuidv4 } from 'uuid';
import http from 'http';
import dotenv from 'dotenv'
import UserController from './src/controllers/user-controller.js';

dotenv.config();

const hostname = process.env.HOSTNAME || '127.0.0.1'; 
const port = process.env.PORT || 3000; 

export const getRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            resolve(body);
        });
        req.on('error', (err) => {
            reject(err);
        });
    });
};


const getUserIdFromUrl = (url) => {
    const regex = /\/api\/users\/([a-f0-9\-]{36})$/; // Updated regex to match UUID format
    const match = url.match(regex);
    if (match) {
        return match[1]; // Return the captured user ID
    } else {
        throw new Error('userId not found');
    }
};

export const server = http.createServer(async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const userController = new UserController();
    let response = '';
    let body = ''

    try {
        if (req.url === '/api/users' && req.method === 'GET') {
            response = await userController.getUsers();
            res.statusCode = 200;
        } else if (req.url.startsWith('/api/users/') && req.method === 'GET') {
            const userId = await getUserIdFromUrl(req.url);
            response = await userController.getUser(userId);
            res.statusCode = 200;
        } else if (req.url === '/api/users' && req.method === 'POST') {
            body = await getRequestBody(req);
            const user = JSON.parse(body);
            user.id = uuidv4();
            const createdUser = await userController.postUser(user);
            res.statusCode = 201;
            response = createdUser;
        } else if (req.url.startsWith('/api/users/') && req.method === 'PUT') {
            const userId = await getUserIdFromUrl(req.url);
            body = await getRequestBody(req);
            const updatedUser = JSON.parse(body);
            const createdUser = await userController.putUser(userId, updatedUser);
            res.statusCode = 200;
            response = createdUser;
        } else if (req.url.startsWith('/api/users/') && req.method === 'DELETE') {
            const userId = await getUserIdFromUrl(req.url);
            await userController.deleteUser(userId);
            response = `user with id ${userId} deleted`
            res.statusCode = 204;
        } else {
            res.statusCode = 404;
            response = { message: 'Route not found' };
        }
    } catch (err) {
        res.statusCode = err.statusCode || 500;
        response = { message: err.message || 'Invalid request' };
    }

    res.end(JSON.stringify(response));
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
