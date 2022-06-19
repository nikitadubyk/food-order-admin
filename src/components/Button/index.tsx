import React from 'react'

import './Button.scss'

interface ButtonProps {
    children: React.ReactNode
    reverse?: boolean
    warning?: boolean
}

const Button: React.FC<ButtonProps> = ({ children, reverse, warning }) => {
    return (
        <button
            className={`button ${reverse && 'button-reverse'} ${
                warning && 'button-warning'
            }`}
        >
            {children}
        </button>
    )
}

export default Button
