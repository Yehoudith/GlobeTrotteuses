import { useState } from 'react'

import './App.css'
import RegisterForm from './RegisterForm.tsx';
import LoginForm from './LoginForm.tsx'

function App() {
  const [view, setView] = useState<"register" | "login">("register")

  return (
    <>
      {view === "register" && (
        <RegisterForm onSuccess={() => setView("login")} />
      )}
      {view === "login" && <LoginForm />}
    </>
  )
}

export default App;
