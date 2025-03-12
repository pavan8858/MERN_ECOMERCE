import { backendUrl } from "../App";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Login = ({setToken}) => {
    

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = async (e) => {

        try {
            e.preventDefault();
            console.log(email,password);
            
            const response = await axios.post(`${backendUrl}/api/user/admin`, { email, password });

             if(response.data.success){
                 setToken(response.data.token)
             }else{
                 toast.error(response.data.message)
             }
            console.log(response);
                
            console.log("✅ Login successful:", response.data);
        } catch (error) {
            console.error("❌ Error:", error);
            toast.error(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold text-center mb-4">Admin Panel</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className="mb-4">
                        <p className="text-gray-700 mb-1">Email Address</p>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none focus:border-blue-500"
                            type="email"
                            placeholder="youremail@example.com"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-700 mb-1">Password</p>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none focus:border-blue-500"
                            type="password"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;

