import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message.jsx";

const Messages = () => {
    const { loading, messages } = useGetMessages();
    const lastMessageRef = useRef();
    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="px-4 flex-1 overflow-auto">
            {loading &&
                [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

            {!loading && messages.length === 0 && (
                <p className="text-center text-white">
                    No messages yet. Start the conversation!
                </p>
            )}

            {!loading &&
                messages.length > 0 &&
                messages.map((message) => (
                    <div key={message._id} ref={lastMessageRef}>
                        <Message message={message} />
                    </div>
                ))}
        </div>
    );
};
export default Messages;
