import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";

const Messages = () => {
	const {loading, messages}= useGetMessages();
	
	return (
		<div className='px-4 flex-1 overflow-auto'>
			{!loading && messages.map((message) => (
				<Message key={message.id} message={message} />
			))}
			{!loading && messages.length===0 && (
				<p className="text-center text-white">Start the Conversation</p>
			)}
		</div>
	);
};
export default Messages;
