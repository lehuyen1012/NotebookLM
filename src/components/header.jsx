import React from "react";

const Header = ({ theme, toggleTheme }) => {
    return (
        <div className="header_container">
            <a className="logo_style" href="/">
                NotebookLM
            </a>
            <div className="header_btn_container">
                <button className="btn-toggle" onClick={toggleTheme}>
                    {theme === "dark"
                        ? "Switch to Light Mode"
                        : "Switch to Dark Mode"}
                </button>
                <button className="btn-toggle">Login</button>
            </div>
        </div>
    );
};

export default Header;
