import React from 'react'

import './Button.scss'

interface ButtonProps {
    children: React.ReactNode
    reverse?: boolean
    warning?: boolean
    onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({
    children,
    reverse,
    warning,
    onClick,
}) => {
    return (
        <button
            className={`button ${reverse && 'button-reverse'} ${
                warning && 'button-warning'
            }`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button
