import { useState } from 'react'
import './App.css'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import Dashboard from './Dashboard'

function App() {
  const [view, setView] = useState<"register" | "login" | "dashboard">("register")

  return (
    <>
      <h1>Les Globetrotteuses</h1>
      {view === "register" && (
        <RegisterForm
          onSuccess={() => setView("login")}
          onEmailExists={() => setView("login")}
        />
      )}
      {view === "login" && (
        <LoginForm onSuccess={() => setView("dashboard")} />
      )}
      {view === "dashboard" && <Dashboard />}
    </>
  )
}

export default App;