import React from "react";

const FullScreenLoader = () => {
    return (
        <div
            style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 9999,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "30px",
                backgroundColor: "#f0f0f0",
                width: "100vw",
                height: "100vh",
            }}
        >
            <style>
                {`
                .pulse {
                    width: 10px;
                    height: 10px;
                    background-color: var(--primary, #3498db);
                    border-radius: 50%;
                    animation: pulse 1.5s infinite;
                    box-shadow: 0 0 10px rgba(52, 152, 219, 0.5);
                }

                .pulse:nth-child(1) {
                    animation-delay: 0s;
                }

                .pulse:nth-child(2) {
                    animation-delay: 0.3s;
                }

                .pulse:nth-child(3) {
                    animation-delay: 0.6s;
                }

                @keyframes pulse {
                    0% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    50% {
                        transform: scale(1.5);
                        opacity: 0.6;
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                .logo {
                    width: 80px;
                    animation: logoBounce 2s infinite;
                }

                @keyframes logoBounce {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }
                `}
            </style>
            <img
                src="/images/big-logo.svg"
                alt="Loading..."
                className="logo"
                style={{display: "block"}}
            />
            <div style={{display: "flex", gap: "15px"}}>
                <div className="pulse"></div>
                <div className="pulse"></div>
                <div className="pulse"></div>
            </div>
        </div>
    );
};

export default FullScreenLoader;
