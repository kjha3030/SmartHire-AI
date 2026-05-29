import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post(
        "https://smarthire-ai-bjwn.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      navigate("/");
    } catch (error) {
      alert("User already exists");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="bg-gray-900 p-10 rounded-3xl shadow-2xl w-full max-w-md">

        <h1 className="text-4xl font-bold text-center text-green-400 mb-8">
          Create Account 🚀
        </h1>

        <input
          type="text"
          placeholder="Enter Name"
          className="w-full p-4 rounded-xl bg-gray-800 text-white mb-4 outline-none"
          onChange={(e) => setName(e.target.value)}
        />

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
          onClick={handleRegister}
          className="w-full bg-green-500 hover:bg-green-600 transition p-4 rounded-xl font-bold"
        >
          Register
        </button>

        <p className="text-gray-400 text-center mt-6">
          Already have an account?
        </p>

        <Link to="/">
          <button className="w-full mt-3 border border-green-500 text-green-400 p-4 rounded-xl">
            Login
          </button>
        </Link>

      </div>
    </div>
  );
}

export default Register;