import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFolder,
    faEllipsisVertical,
    faTrash,
    faPenToSquare,
    faCircle,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import WorkspaceEditor from "./workspace_editor.jsx";
import { useNavigate } from "react-router-dom";

function WorkspaceCard({ workspace, onDelete }) {
    const [showOptions, setShowOptions] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const dropdownRef = useRef(null);
    const optionButtonRef = useRef(null);
    const navigate = useNavigate();

    const handleClick = () => {
        if (!showOptions) {
            setIsEditing(true);
        }
    };

    const toggleOptions = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setShowOptions(!showOptions);
    };

    const handleDelete = async (event) => {
        event.stopPropagation();
        event.preventDefault();
        try {
            await axios.post("/deleteWorkspace", {
                workspace_id: workspace.id,
            });
            if (onDelete) onDelete();
        } catch (error) {
            console.error("Error deleting workspace:", error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                showOptions &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                optionButtonRef.current &&
                !optionButtonRef.current.contains(event.target)
            ) {
                setShowOptions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showOptions]);

    if (isEditing) {
        return (
            <WorkspaceEditor
                workspace={workspace}
                onClose={() => setIsEditing(false)}
            />
        );
    }

    return (
        <div
            className="workspace_card"
            id={workspace.id}
            onClick={() => navigate(`/workspace/${workspace.id}`)}
        >
            <div className="card-content" onClick={handleClick}>
                <div className="top_bar">
                    <span className="workspace_icon">
                        <FontAwesomeIcon icon={faFolder} />
                    </span>
                    <div className="workspace_options">
                        <button
                            className="option_button"
                            ref={optionButtonRef}
                            aria-label="More options"
                            onMouseDown={(e) => e.stopPropagation()}
                            onClick={toggleOptions}
                        >
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>

                        <div
                            className={`workspace_options_content ${
                                showOptions ? "show" : ""
                            }`}
                            ref={dropdownRef}
                        >
                            <button
                                className="workspace_options_button delete_card_button"
                                onClick={handleDelete}
                            >
                                <FontAwesomeIcon icon={faTrash} /> Delete
                            </button>
                            <button
                                className="workspace_options_button"
                                onClick={() => setIsEditing(true)}
                            >
                                <FontAwesomeIcon icon={faPenToSquare} /> Edit
                                Title and Description
                            </button>
                        </div>
                    </div>
                </div>
                <div className="bottom_line">
                    <div>
                        <span className="workspace_name">{workspace.name}</span>
                    </div>
                    <div>
                        <span className="workspace_description">
                            {workspace.description}
                        </span>
                    </div>
                    <div className="workspace-data">
                        <span className="workspace_date">{workspace.date}</span>
                        <FontAwesomeIcon
                            icon={faCircle}
                            className="circle-separator"
                        />
                        <span className="workspace_source_number">
                            {workspace.sources} Sources
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WorkspaceCard;
