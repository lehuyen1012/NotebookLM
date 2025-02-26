import { useParams } from "react-router-dom";
import workspacesData from "../workspace.js";
import { useState, useEffect, useRef } from "react";
import ChatForm from "./chatform.jsx";
import ChatMessage from "./chatmessage.jsx";

const WorkspaceEditor = ({ workspaces }) => {
    const { id } = useParams();

    const workspace = workspacesData.find((ws) => String(ws.id) === id);

    if (!workspace) {
        return <div>Workspace not found</div>;
    }
    const [chatHistory, setChatHistory] = useState([]);
    const [showChatbot, setShowChatbot] = useState(false);
    const chatBodyRef = useRef();
    const generateBotResponse = async (history) => {
        //Update Chat History
        const updateHistory = (text) => {
            setChatHistory((prev) => [
                ...prev.filter(
                    (msg) => msg.text !== "Đợi chatbot 1 xíu nhaaa..."
                ),
                { role: "model", text },
            ]);
        };

        // Send the user message to the API
        history = history.map(({ role, text }) => ({
            role,
            parts: [{ text }],
        }));

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: history,
            }),
        };

        try {
            // Fetch the response from the API
            const response = await fetch(
                import.meta.env.VITE_API_URL,
                requestOptions
            );
            const data = await response.json();
            if (!response.ok)
                throw new Error(
                    data.error.message ||
                        "Có gì đó không ổn! Bạn đợi chatbot xíu nha..."
                );
            const apiResponseText = data.candidates[0].content.parts[0].text
                .replace(/\*\*(.*?)\*\*/g, "$1")
                .trim();
            updateHistory(apiResponseText);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // Scroll to the bottom of the chat body
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTo({
                top: chatBodyRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [chatHistory]);

    return (
        <div className="editor-container">
            {/* Cột trái */}
            <div className="editor-left-column">
                <div className="editor-column-header">
                    <h1 className="editor-column-header-title">Nguồn</h1>
                </div>
            </div>

            {/* Cột trung tâm */}
            <div className="editor-center-column">
                <div className="editor-column-header">
                    <h1 className="editor-column-header-title">
                        Cuộc trò chuyện
                    </h1>
                </div>

                <div className="editor-center-column-content" ref={chatBodyRef}>
                    <div className="center-overflow-container">
                        <span
                            className="workspace-icon"
                            dangerouslySetInnerHTML={{
                                __html: workspace.icon,
                            }}
                        ></span>
                        <div className="workspace-text">
                            <span className="workspace-name">
                                {workspace.name}
                                <br />
                            </span>
                            <span className="workspace-source-number">
                                {workspace.sources} nguồn
                            </span>
                            <p className="workspace-ai-description">
                                {workspace.ai_description}
                            </p>
                        </div>
                    </div>
                    {/* Render the chat user history */}
                    {chatHistory.map((chat, index) => (
                        <ChatMessage key={index} chat={chat} />
                    ))}
                </div>

                {/* Ô nhập prompt */}
                <div className="chat-footer">
                    <ChatForm
                        chatHistory={chatHistory}
                        setChatHistory={setChatHistory}
                        generateBotResponse={generateBotResponse}
                    />
                </div>
            </div>

            {/* Cột phải */}
            <div className="editor-right-column">
                <div className="editor-column-header">
                    <h1 className="editor-column-header-title">Studio </h1>
                </div>
            </div>
        </div>
    );
};

export default WorkspaceEditor;
