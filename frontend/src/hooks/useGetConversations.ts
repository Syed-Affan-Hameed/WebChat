import { useEffect, useState } from "react"
import toast from "react-hot-toast";


const useGetConversations = () => {
const [loading,setLoading]= useState(false);
//the initial value is empty array but we are assigning an explicit datatype to this useState i.e array of conversationType
const [conversations,setConversations]= useState<ConversationType[]>([]);

useEffect(()=>{
const getConversations = async ()=>{
    setLoading(true);
    try {
        const res = await fetch("/api/v1/message/getUsersWithConversations");
        const data =await res.json();
        console.log("getUsersWithConversations",data);
        if(data.error){
            throw new Error(data.error);    
        }
        setConversations(data);


    } catch (error:any) {
        toast.error(error.message)
    }
    finally{
        setLoading(false);
    }


};

getConversations();
},[]);

return {loading,conversations}
}

export default useGetConversations