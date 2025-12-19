import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
    const [search, setSearch] = useState("");
    const { setSelectedConversation, setSearchTerm } = useConversation();
    const { conversations } = useGetConversations();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!search.trim()) return;

        if (search.length < 3) {
            return toast.error("Please enter at least 3 characters to search.");
        }

        const filteredConversations = conversations.filter((conv) =>
            conv.fullName.toLowerCase().includes(search.toLowerCase())
        );

        if (filteredConversations.length > 0) {
            setSelectedConversation(filteredConversations[0]);
            setSearch("");
            setSearchTerm("");
        } else {
            toast.error("No conversation found.");
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        setSearchTerm(value);
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
                type="text"
                placeholder="Search…"
                className="input input-bordered rounded-full"
                value={search}
                onChange={handleChange}
            />
            <button
                type="submit"
                className="btn btn-circle bg-sky-500 text-white"
            >
                <IoSearchSharp className="w-6 h-6 outline-none" />
            </button>
        </form>
    );
};
export default SearchInput;
