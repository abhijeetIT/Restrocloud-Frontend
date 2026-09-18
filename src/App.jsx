import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import HomePage      from './pages/HomePage'
import LoginPage     from './pages/LoginPage'
import RegisterPage  from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import MenuPage      from './pages/MenuPage'
import TablesPage    from './pages/TablesPage'
import OrdersPage    from './pages/OrdersPage'
import PaymentsPage  from './pages/PaymentsPage'
import SettingsPage  from './pages/SettingsPage'

function PrivateRoute({ children }) {
  const { token } = useAuth()
  return token ? children : <Navigate to="/login" replace />
}

function RootRedirect() {
  const { token } = useAuth()
  return token ? <Navigate to="/dashboard" replace /> : <HomePage />
}

export default function App() {
  return (
    <Routes>
      {/* Public home page — shown at / when not logged in */}
      <Route path="/" element={<RootRedirect />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected app routes */}
      <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route path="dashboard"  element={<DashboardPage />} />
        <Route path="menu"       element={<MenuPage />} />
        <Route path="tables"     element={<TablesPage />} />
        <Route path="orders"     element={<OrdersPage />} />
        <Route path="payments"   element={<PaymentsPage />} />
        <Route path="settings"   element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
