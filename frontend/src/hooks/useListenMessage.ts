import {useEffect} from 'react';
import { useSocketContext } from '../context/SocketContext';
import useConversation from '../zustand/useConversation';
import pingAudio from '../assets/sounds/pingAudio.mp3'


const useListenMessage = () => {
    const {socket} =useSocketContext();
    const {messages,setMessages} = useConversation();

    useEffect(()=>{
        socket?.on("newMessage",(newMessage)=>{
            const pingSound = new Audio(pingAudio);
            pingSound.play();
            setMessages([...messages,newMessage]);
        });
        // when the conponent unmounts then we stop listening 
  return ()=>{socket?.off("newMessage");}
    },[socket,messages,setMessages]);

}

export default useListenMessage