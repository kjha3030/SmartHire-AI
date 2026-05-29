import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://smarthire-ai-bjwn.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);

      navigate("/upload");
    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="bg-gray-900 p-10 rounded-3xl shadow-2xl w-full max-w-md">

        <h1 className="text-4xl font-bold text-center text-green-400 mb-8">
          SmartHire AI 🚀
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full p-4 rounded-xl bg-gray-800 text-white mb-4 outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full p-4 rounded-xl bg-gray-800 text-white mb-6 outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-500 hover:bg-green-600 transition p-4 rounded-xl font-bold"
        >
          Login
        </button>

        <p className="text-gray-400 text-center mt-6">
          Don’t have an account?
        </p>

        <Link to="/register">
          <button className="w-full mt-3 border border-green-500 text-green-400 p-4 rounded-xl">
            Register
          </button>
        </Link>

      </div>
    </div>
  );
}

export default Login;