import { useRef } from "react";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
    const inputRef = useRef();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if (!userMessage) return;
        inputRef.current.value = "";

        //Update Chat History
        setChatHistory((history) => [
            ...history,
            { role: "user", text: userMessage },
        ]);

        // Thinking for bot response
        setTimeout(() => {
            setChatHistory((history) => [
                ...history,
                { role: "model", text: "Đợi chatbot 1 xíu nhaaa..." },
            ]);

            // Generate bot response
            generateBotResponse([
                ...chatHistory,
                { role: "user", text: userMessage },
            ]);
        }, 600);
    };
    return (
        <form
            action="#"
            className="prompt-container"
            onSubmit={handleFormSubmit}
        >
            <input
                ref={inputRef}
                type="text"
                placeholder="Bắt đầu cuộc trò chuyện ..."
                className="prompt-bar"
                id="promptBar"
                required
            />
            <button className="material-symbols-outlined prompt-submit-button">
                arrow_upward
            </button>
        </form>
    );
};

export default ChatForm;
