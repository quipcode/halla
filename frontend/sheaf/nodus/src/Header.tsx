import React from "react";

interface Props {
    border: string;
    color: string;
    children?: React.ReactNode;
    height: string;
    onClick: () => void;
    radius: string
    width: string;
}

const Header: React.FC<Props> = ({
    border,
    color,
    children,
    height,
    onClick,
    radius,
    width
}) => {
    return (
        <div className="App">
            <header className="App-header"
                onClick={onClick}
                style={{
                    backgroundColor: color,
                    border,
                    borderRadius: radius,
                    height,
                    width
                }}
            >
                <h3>Header components in the nodus app</h3>
            </header>
            {children}
        </div>
    );
}

export default Header;