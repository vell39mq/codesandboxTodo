import "./styles.css";
import { createContext } from "react";
import SignUp from "./components/SingUp";
import Login from "./components/Login";
import Home from "./components/Home";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
export const UserCount = createContext();
function App() {
  return (
    <AuthProvider>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
