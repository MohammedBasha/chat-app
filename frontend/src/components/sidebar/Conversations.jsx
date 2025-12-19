import Conversation from "./Conversation.jsx";
import useGetConversations from "../../hooks/useGetConversations.js";
import { getRandomEmoji } from "../../utils/emojis.js";
import useConversation from "../../zustand/useConversation.js";

const Conversations = () => {
    const { loading, conversations } = useGetConversations();
    const { searchTerm } = useConversation();

    const filteredConversations = conversations.filter((conv) =>
        conv.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="py-2 flex flex-col overflow-auto">
            {filteredConversations.map((conversation, idx) => (
                <Conversation
                    key={conversation._id}
                    conversation={conversation}
                    emoji={getRandomEmoji()}
                    lastIdx={idx === filteredConversations.length - 1}
                />
            ))}
            {loading ? (
                <span className="loading loading-spinner mx-auto"></span>
            ) : null}
        </div>
    );
};
export default Conversations;
