import React from 'react'

import './Button.scss'

interface ButtonProps {
    children: React.ReactNode
    reverse?: boolean
    warning?: boolean
    onClick?: () => void
    className?: string
    type?: 'button' | 'submit' | 'reset'
}

const Button: React.FC<ButtonProps> = ({
    children,
    reverse,
    warning,
    onClick,
    className,
    type,
}) => {
    return (
        <button
            type={type ? type : 'submit'}
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
