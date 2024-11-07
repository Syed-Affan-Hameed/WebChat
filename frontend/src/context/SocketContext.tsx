import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import io,{Socket} from "socket.io-client";
import { useAuthContext } from "./AuthContext";

interface ISocketContext {
    socket : Socket | null,
    onlineUsers :string[]
}

const SocketContext = createContext<ISocketContext | undefined>(undefined);

export const useSocketContext =() : ISocketContext=>{
    const context =useContext(SocketContext);
    if(context===undefined){
        throw new Error("context in useSocketContext is undefined");
    }
    return context;
}

const socketURL = import.meta.env.MODE === "development" ?"http://localhost:5007" : "/";

const SocketContextProvider = ({children}:{children:ReactNode})=>{

    const socketRef =useRef<Socket|null>(null);
    
    // state to handle the online users we get from the backend.
    const [onlineUsers,setOnlineUsers] = useState<string[]>([]);
    
    const {authUser, isLoading} = useAuthContext();

    useEffect(()=>{

        if(authUser && !isLoading){
            const socket = io(socketURL,{
                query: {
                   userId : authUser.id 
                }
            });

            socketRef.current = socket;

            socket.on("getOnlineUsers",(users:string[])=>{
                setOnlineUsers(users);
            });

            return ()=>{
                socket.close();
                socketRef.current =null;
            };

        }
        else if(!authUser && !isLoading){
            if(socketRef.current){
                socketRef.current.close();
                socketRef.current=null;
            }
        }


    },[authUser,isLoading]);

    return(
        <SocketContext.Provider value={{socket: socketRef.current,onlineUsers:onlineUsers}}>
            {children}
        </SocketContext.Provider>
    );
}
export default SocketContextProvider;