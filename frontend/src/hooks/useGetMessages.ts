import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import useConversation from '../zustand/useConversation';

const useGetMessages = () => {
    const [loading,setLoading]= useState(false);
    const {messages,setMessages,selectedConversation}= useConversation();


    useEffect(()=>{
        const getMessages =async()=>{
            if(!selectedConversation){
                console.log("useGetMessages hook :- Selected Conversation is null")
                return;
            }
            setLoading(true);
            setMessages([]);
            try {
                const res = await fetch(`/api/v1/message/getMessages/${selectedConversation.id}`);
                const data =await res.json();
                console.log("getMessages",data);
                if(data.error){
                    throw new Error(data.error);    
                }
                setMessages(data);
        
        
            } catch (error:any) {
                toast.error(error.message)
            }
            finally{
                setLoading(false);
            }

        }
        getMessages();
    },[selectedConversation,setMessages]);

    return {loading,messages};
}

export default useGetMessages