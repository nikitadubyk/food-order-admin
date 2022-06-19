import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/auth.hook'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

const App: React.FC = () => {
    const { token } = useAuth()

    let routes

    if (token) {
        routes = (
            <>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route
                    path='*'
                    element={<Navigate to='/dashboard' replace />}
                />
            </>
        )
    } else {
        routes = (
            <>
                <Route path='/' element={<Login />} />
                <Route path='*' element={<Navigate to='/' replace />} />
            </>
        )
    }

    return <Routes>{routes}</Routes>
}

export default App
