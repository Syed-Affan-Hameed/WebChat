import { Search } from "lucide-react";
import { useState } from "react";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {

	const [searchText,setSearchText] =useState("");
	const {setSelectedConversation} =useConversation();
	const {conversations} = useGetConversations();

	

	function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
		e.preventDefault();
		if(!searchText){
			return;
		}
		const conversation = conversations.find((conversation:ConversationType)=>{
			return conversation.fullname.toLowerCase().includes(searchText.toLowerCase());
		})
		if(conversation){
			//if the conversation is found then we set the selected conversation in the sidebar and the one found.
			setSelectedConversation(conversation);
			setSearchText("");

		}
		else{
			toast.error("No such user found!")
		}
		
	};

	return (
		<form className='flex items-center gap-2' onSubmit={handleSubmit} >
			<input
				type='text'
				placeholder='Search…'
				className='input-sm md:input input-bordered rounded-full sm:rounded-full w-full'
				value={searchText}
				onChange={(e)=>setSearchText(e.target.value)}
			/>
			<button type='submit' className='btn md:btn-md btn-sm btn-circle bg-sky-500 text-white  '>
				<Search className='w-4 h-4 md:w-6 md:h-6 outline-none' />
			</button>
		</form>
	);
};
export default SearchInput;
