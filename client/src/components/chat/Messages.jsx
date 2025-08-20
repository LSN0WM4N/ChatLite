import { useState } from 'react';
import { Reactions } from './Reactions';

export const SendedMessage = ({ message, time, messageID }) => {
	return (
		<li className="flex flex-col items-end">
			<div className="text-right text-xs">{time}</div>
			<div
				className="max-w-2/3 rounded-lg bg-blue-600/70 px-2 py-1 text-right text-sm text-white"
			>
				{message}
			</div>
			<Reactions 
				messageID={messageID}
			/>
		</li>
	)
}


export const RecivedMessage = ({ message, time, username, messageID }) => {
	const [showPicker, setShowPicker] = useState(false);

	return (
		<li className="flex flex-col items-start mb-2">
			<div className="text-xs text-gray-500 mb-1">{username}</div>
			<div 
				className="max-w-2/3 rounded-lg bg-gray-100 px-2 py-1 pr-8 text-sm relative"
				onClick={() => setShowPicker(true)}	
			>
				{message}
			</div>
				<Reactions 
					messageID={messageID}
					showPicker={showPicker}
					setShowPicker={setShowPicker}
				/>

			<div className="text-right text-xs text-gray-400 mt-1">{time}</div>
		</li>

	);
};


export const TypingIndicator = () => {
	return <li className="flex flex-col items-start">
		<div
			className="flex w-fit items-center gap-1 rounded-lg bg-gray-100 px-2 py-2.5 text-sm"
		>
			<div className="size-2 rounded-full bg-gray-300"></div>
			<div className="size-2 rounded-full bg-gray-400"></div>
			<div className="size-2 rounded-full bg-gray-300"></div>
		</div>
	</li>
}
