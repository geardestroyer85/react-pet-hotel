import { useState } from "react";
import { useAppContext } from "../context/useAppContext";
import { useLocation } from "wouter";
import axios from "axios";
import { User } from "../api/types";

function LoginPage() {
  const [, setLocation] = useLocation()
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string>("")

  const {userData, setUserData} = useAppContext();

  if (userData) {
    setLocation("/")
  }

  const handleClick = async () => {
    // const response = await axios.post("/api/auth/login") ... 


    const response = await axios.get("/api/users");

    const users: User[] = response.data;

    const user = users.find((user) => user.username === username);

    if (user) {
      setUserData(user);
      setLocation("/")
    } else {
      setError("No users found.")
    }
  
  }

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Input Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          setError("");
        }}
      />
      {error && <p>{error}</p>}
      <button onClick={handleClick}>
        Submit
      </button>
    </div>
  );
}

export default LoginPage;
