import React from 'react'

import './Button.scss'

interface ButtonProps {
    children: React.ReactNode
    reverse?: boolean
    warning?: boolean
    onClick?: () => void
    className?: string
}

const Button: React.FC<ButtonProps> = ({
    children,
    reverse,
    warning,
    onClick,
    className,
}) => {
    return (
        <button
            className={`button ${reverse && 'button-reverse'} ${
                warning && 'button-warning'
            } ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button
