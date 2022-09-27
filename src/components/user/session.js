import React from "react";

const session = ({ user }) => {
    const handleLogout = () => {
        // TODO
    }

    return (
        <li className="nav-item d-flex align-items-center text-light fw-bold">
        <span className="me-2">Bienvenido {user}</span>
        <button type="button" class="btn btn-dark" onClick={handleLogout}>
            <svg                
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                height="1rem"
                width="1rem"        
                fill="var(--bs-white)"
            >
                <polygon points="10.95 15.84 -0.05 15.84 -0.05 0.17 10.95 0.17 10.95 4.05 9.95 4.05 9.95 1.17 0.95 1.17 0.95 14.84 9.95 14.84 9.95 12.01 10.95 12.01 10.95 15.84" />
                <rect x="5" y="8" width="6" height="1" />
                <polygon points="11 5.96 15.4 8.5 11 11.04 11 5.96" />
            </svg>            
        </button>

        </li>
    );
};
export default session;
