import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css"; // Giả sử bạn có một file CSS riêng
import WorkspaceCard from "./components/workspace_card.jsx";
import Header from "./components/Header.jsx";
import WorkspaceCreatorModal from "./components/workspace_creator_modal.jsx";
import Workspaces from "./components/workspace.jsx";
import WorkspaceEditor from "./components/workspace_editor.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    const [theme, setTheme] = useState("light");
    const [showModal, setShowModal] = useState(false);
    const [workspaces, setWorkspaces] = useState([]);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [promptValue, setPromptValue] = useState("");

    useEffect(() => {
        const currentTheme = localStorage.getItem("theme");
        if (currentTheme === "dark") {
            setTheme("dark");
        } else if (currentTheme === "light") {
            setTheme("light");
        } else {
            // Fallback to OS preference
            const prefersDarkScheme = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;
            setTheme(prefersDarkScheme ? "dark" : "light");
        }

        // fetchWorkspaces();
    }, []);

    useEffect(() => {
        if (theme === "dark") {
            document.body.classList.add("dark-theme");
        } else {
            document.body.classList.remove("dark-theme");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    };

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                activeDropdown !== null &&
                !event.target.closest(".workspace_options_content") &&
                !event.target.closest(".option_button")
            ) {
                setActiveDropdown(null);
            }
            if (showModal && event.target.className === "modal") {
                closeModal();
            }
        };

        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [activeDropdown, showModal]);

    // Toggle workspace dropdown
    const toggleWorkspaceDropdown = (index, event) => {
        event.stopPropagation();
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    // Delete workspace
    const deleteWorkspace = async (workspaceId, index, event) => {
        event.stopPropagation();
        try {
            await axios.post("/deleteWorkspace", { workspace_id: workspaceId });
            // Cập nhật state sau khi xóa
            const newWorkspaces = [...workspaces];
            newWorkspaces.splice(index, 1);
            setWorkspaces(newWorkspaces);
        } catch (error) {
            console.error("Error deleting workspace:", error);
        }
    };

    // Delete all workspaces
    const deleteAllWorkspaces = async () => {
        try {
            await axios.post("/deleteAllWorkspaces");
            setWorkspaces([]);
        } catch (error) {
            console.error("Error deleting all workspaces:", error);
        }
    };

    // Handle prompt submit
    const handlePromptSubmit = () => {
        console.log("Prompt submitted:", promptValue);
        setPromptValue("");
    };

    // Handle Enter key in prompt bar
    const handlePromptKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handlePromptSubmit();
        }
    };

    return (
        <BrowserRouter>
            <div className={`app ${theme === "dark" ? "dark-theme" : ""}`}>
                <Header theme={theme} toggleTheme={toggleTheme} />

                <Routes>
                    {/* Trang Home */}
                    <Route
                        path="/"
                        element={
                            <>
                                <Workspaces
                                    workspaces={workspaces}
                                    deleteAll={deleteAllWorkspaces}
                                />
                                <WorkspaceCreatorModal
                                    isOpen={showModal}
                                    onClose={closeModal}
                                />
                                {workspaces.map((workspace, index) => (
                                    <WorkspaceCard
                                        key={workspace.id}
                                        workspace={workspace}
                                        onDelete={() =>
                                            deleteWorkspace(workspace.id, index)
                                        }
                                    />
                                ))}
                            </>
                        }
                    />

                    {/* Trang chi tiết workspace */}
                    <Route
                        path="/workspace/:id"
                        element={<WorkspaceEditor />}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
