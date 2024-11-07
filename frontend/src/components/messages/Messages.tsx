import useChatScroll from "../../hooks/useChatScroll";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessage from "../../hooks/useListenMessage";
import Message from "./Message";

const Messages = () => {
	const {loading, messages}= useGetMessages();
	useListenMessage();
	const chatScrollRef = useChatScroll(messages) as React.MutableRefObject<HTMLDivElement>
	return (
		<div className='px-4 flex-1 overflow-auto' ref={chatScrollRef}>
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
