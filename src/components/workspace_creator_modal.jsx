import React, { useState } from "react";
import axios from "axios";

function WorkspaceCreatorModal({ isOpen, onClose, onWorkspaceCreated }) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        sources: 1,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "sources" ? parseInt(value, 10) : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/createWorkspace", formData);
            // Reset form
            setFormData({
                name: "",
                description: "",
                sources: 1,
            });
            // Notify parent component
            if (onWorkspaceCreated) onWorkspaceCreated();
            // Close modal
            if (onClose) onClose();
        } catch (error) {
            console.error("Error creating workspace:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            id="workspace_creator_model"
            className={`modal ${isOpen ? "show" : "hide"}`}
        >
            <div className="modal-content">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <h1 className="modal_title_style">Create New Workspace</h1>
                <div className="divider_line"></div>

                <form
                    id="workspace_form"
                    className="modal-form"
                    onSubmit={handleSubmit}
                >
                    <label className="modal-label" htmlFor="name">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <br />

                    <label className="modal-label" htmlFor="description">
                        Description:
                    </label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                    <br />

                    <label className="modal-label" htmlFor="sources">
                        Sources:
                    </label>
                    <input
                        type="number"
                        id="sources"
                        name="sources"
                        value={formData.sources}
                        onChange={handleChange}
                        required
                    />
                    <br />

                    <button className="model-submit" type="submit">
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
}

export default WorkspaceCreatorModal;
