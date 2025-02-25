import { useParams } from "react-router-dom";
import workspacesData from "../workspace.js";

const WorkspaceEditor = ({ workspaces }) => {
    const { id } = useParams();

    const workspace = workspacesData.find((ws) => String(ws.id) === id);

    if (!workspace) {
        return <div>Workspace not found</div>;
    }

    return (
        <div className="editor-container">
            {/* Cột trái */}
            <div className="editor-left-column">
                <div className="editor-column-header">
                    <h1 className="editor-column-header-title">Sources</h1>
                </div>
            </div>

            {/* Cột trung tâm */}
            <div className="editor-center-column">
                <div className="editor-column-header">
                    <h1 className="editor-column-header-title">
                        Workspace Editor
                    </h1>
                </div>

                <div className="editor-center-column-content">
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
                </div>

                {/* Ô nhập prompt */}
                <div className="prompt-container">
                    <textarea
                        id="promptBar"
                        className="prompt-bar"
                        placeholder="Type your prompt here..."
                    />
                    <button
                        id="promptSubmitButton"
                        className="prompt-submit-button"
                    >
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </div>

            {/* Cột phải */}
            <div className="editor-right-column">
                <div className="editor-column-header">
                    <h1 className="editor-column-header-title">Settings</h1>
                </div>
            </div>
        </div>
    );
};

export default WorkspaceEditor;
