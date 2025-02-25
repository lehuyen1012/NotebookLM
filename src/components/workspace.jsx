import React, { useState } from "react";
import WorkspaceCreatorModal from "./workspace_creator_modal.jsx";
import WorkspaceCard from "./workspace_card.jsx";
import workspacesData from "../workspace.js";
const Workspaces = ({ workspaces, deleteAll }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [localWorkspaces, setLocalWorkspaces] = useState(workspacesData);
    const addWorkspace = () => {
        const newWorkspace = {
            name: "New Workspace",
            description: "This is a new workspace",
            date: new Date().toLocaleDateString(),
            sources: 10,
            id: Date.now(),
            icon: "🗂️",
            ai_description:
                "This workspace contains new AI-generated insights.",
        };

        setLocalWorkspaces((prev) => [newWorkspace, ...prev]);
    };

    const handleDeleteWorkspace = (workspaceId) => {
        setLocalWorkspaces((prev) =>
            prev.filter((ws) => ws.id !== workspaceId)
        );
    };

    return (
        <div className="container">
            <div className="content_container">
                <h1 className="title_style">Chào mừng bạn đến với Notebook</h1>
                <h1 className="subtitle_style">Danh sách các workspace</h1>
                <div className="divider_line"></div>

                <div className="workspacer_nav">
                    <button
                        id="modelBtn"
                        className="workspace_btn"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <i className="fa-solid fa-plus"></i> Tạo 1 workspace mới
                    </button>
                    <button
                        id="deleteBtn"
                        className="workspace_btn"
                        onClick={deleteAll}
                    >
                        <i className="fa-solid fa-trash"></i> Xóa tất cả
                        workspaces
                    </button>
                </div>

                {/* Modal tạo workspace */}
                <WorkspaceCreatorModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onWorkspaceCreated={addWorkspace} // Truyền hàm tạo workspace
                />

                <div className="workspace_container">
                    {localWorkspaces.length > 0 ? (
                        localWorkspaces.map((ws) => (
                            <WorkspaceCard
                                key={ws.id}
                                workspace={ws}
                                onDelete={() => handleDeleteWorkspace(ws.id)}
                            />
                        ))
                    ) : (
                        <p>Không có workspace nào.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Workspaces;
