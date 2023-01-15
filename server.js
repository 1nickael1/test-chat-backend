const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");

const cors = require('cors');


const app = express();
app.use(cors(process.env.ORIGIN));

// app.use((req,res,next)=>{
//     res.setHeader('Access-Control-Allow-Origin','*');
//     res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
//     res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
//     next(); 
// })

// const server = Server(app);
// const io = require('socket.io')(server);

app.get('/', (req, res) => {
    res.send('hello world')
})

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: [process.env.ORIGIN],
        methods: ["GET", "POST"],
        credentials: true
    }
});

server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (msg) => {
    io.emit('message', msg);
  });
});

io.on('disconnect', (socket) => {
    console.log('A user logout');
})
