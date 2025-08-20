import { Link } from "react-router";
import { PasswordInput } from "./PasswordInput";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";
import { useSelector } from "react-redux";
import { AuthErrorMessage } from "./AuthErrorMessage";

export const LoginForm = () => {
	const { login } = useAuth();
	const { error } = useSelector(state => state.ui);

	const [{username, password}, handleChanges] = useForm();

    const handleSubmit = (event) => {
        event.preventDefault();
        login({username, password});
    };

	return (
		<div className="w-80 rounded-lg shadow h-auto p-6 bg-white relative overflow-hidden">
			<div className="flex flex-col justify-center items-center space-y-2">
				<h2 className="text-2xl font-medium text-slate-700">Login</h2>
				<p className="text-slate-500">Enter details below.</p>
			</div>

			{error && <AuthErrorMessage message={error}/>}

			<form className="w-full mt-4 space-y-3" onSubmit={handleSubmit}>
				<div>
					<input
						className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300" 
						placeholder="Username" 
						id="username" 
						name="username" 
						type="text" 
						value={username}
						onChange={handleChanges}
					/>
				</div>
				<div>
					<PasswordInput 
						className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300" 
						placeholder="Password" 
						id="password" 
						name="password" 
						value={password}
						onChange={handleChanges}
					/>
				</div>

				<button 
					className="w-full justify-center py-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white ring-2" 
					id="login" 
					name="login" 
					type="submit"
				>Login</button>
				<p className="flex justify-center space-x-1">
					<span className="text-slate-700"> Create an account </span>
					<Link className="text-blue-500 hover:underline" to="/auth/register">Sign Up</Link>
				</p>
			</form>
		</div>
	)
}
