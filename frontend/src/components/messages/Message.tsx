import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation, { MessageType } from "../../zustand/useConversation";

const Message = ({ message }: { message: MessageType }) => {

	
	const {authUser} = useAuthContext();
	const fromMe = message?.senderId === authUser?.id;
	const chatClass = fromMe ? "chat-end" : "chat-start";
	const { selectedConversation } = useConversation();
	if(!selectedConversation){
		console.log("Message Component : selectedConversation is null! ");
		console.error("Message Component : selectedConversation is null! ");
		return;
		
	}
	const img = fromMe
		? `https://avatar.iran.liara.run/public/boy?username=${authUser?.fullname}`
		: `https://avatar.iran.liara.run/public/boy?username=${selectedConversation.fullname}`;
		
	console.log("From Me",fromMe)
	const bubbleBg = fromMe ? "bg-blue-500" : "";
	return (
		<div className={`chat ${chatClass}`}>
			<div className='hidden md:block chat-image avatar'>
				<div className='w-6 md:w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={img} title={fromMe? authUser.fullname : selectedConversation.fullname} />
				</div>
			</div>
			<p className={`chat-bubble text-white ${bubbleBg} text-sm md:text-md`}>{message.body}</p>
			<span className='chat-footer opacity-50 text-xs flex gap-1 items-center text-white'>{extractTime(message.createdAt)}</span>
		</div>
	);
};
export default Message;
