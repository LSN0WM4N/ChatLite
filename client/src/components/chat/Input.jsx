import { useParams } from 'react-router';
import { v4 as uuidv4 } from 'uuid'

import { useSocket } from '../../context/wsContext';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';

export const MessageInput = () => {
	const { UUID: UserID, username: Username } = useAuth()
	const { chatID: ChannelID } = useParams();
	const [{message}, handleInputChange, reset] = useForm({
		message: ""
	})

	const { sendMessage } = useSocket();

	const handleSendMessage = (e) => {
		e.preventDefault();

		if (!message)
			return;
		
		sendMessage({
			FromID: UserID,
			Username,
			ChannelID,
			Content: message.trim(),
			timestamp: Date.now(),
			MessageID: uuidv4(),
		});
		reset();
	}

	return (
		<form
			onSubmit={handleSendMessage}
			className="fixed bottom-0 left-0 w-full px-4 pb-[env(safe-area-inset-bottom)] bg-white sm:relative sm:pb-0 sm:px-0"
		>
			<div className="relative pb-2">
				<input
					type="text"
					placeholder="Reply"
					className="h-10 w-full rounded-b-lg border-t border-gray-200 bg-gray-100 pl-3 text-sm focus:outline-blue-600/50"
					value={message}
					onChange={handleInputChange}
					name="message"
					autoComplete='off'
				/>
				<button
					className="absolute top-0 right-1 bottom-0 my-auto size-fit cursor-pointer rounded-full p-2 text-blue-600 hover:bg-gray-200 focus:bg-gray-200"
				>
					{"➤"}
				</button>
			</div>
		</form>
	)
}
