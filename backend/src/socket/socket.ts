import {Server } from "socket.io"
import express from "express"
import http from "http"

const app= express();
const server = http.createServer(app);

//setting up cors

const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods: ["GET,POST"]
    }
}) 

export const getReceiverSocketId =(receiverId :string)=>{
    // this method returns the socketId of a user given there id
    return userSocketMap[receiverId]
}
//map to handle the online users
const userSocketMap:{[key:string]:string} ={};//userId :SocketId
io.on("connection",(socket)=>{

    console.log(`user with userId:${socket.id} connected!`);

    const userId =socket.handshake.query.userId as string;

    if(userId){
        userSocketMap[userId]=socket.id;
    }
    io.emit("getOnlineUsers",Object.keys(userSocketMap));//sends an array of userIds of online users to all the clients

    socket.on("disconnect",()=>{
        console.log(` Disconnected user with userId:${socket.id}!`);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));//sends an array of userIds of online users to all the clients
    })
})

export {app,io,server};