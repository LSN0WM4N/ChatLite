import { useEffect, useState } from 'react'
import { Link } from 'react-router'

import api from '../../api/axios';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';
import { PasswordInput } from './PasswordInput';
import { AuthErrorMessage } from './AuthErrorMessage';

export const RegisterForm = () => {
	const { login } = useAuth();
	const [{
		username, 
		password,
		confirm_password,
	}, handleChanges] = useForm({
		username: "",
		password: "",
		confirm_password: "",
	}); 

	const [errors, setErrors] = useState({});
	const [isValid, setIsValid] = useState(false);
	const [showErrors, setShowErrors] = useState(false);

	useEffect(() => {
		let newErrors = {};

		if (!username.trim()) {
			newErrors.username = "Username is required";
		} else if (username.length < 3) {
			newErrors.username = "Username must be at least 3 characters";
		}

		if (!password) {
			newErrors.password = "Password is required";
		} else if (password.length < 8) {
			newErrors.password = "Password must be at least 8 characters";
		}

		if (!confirm_password) {
			newErrors.confirm_password = "Please confirm your password";
		} else if (password !== confirm_password) {
			newErrors.confirm_password = "Passwords do not match";
		}

		setErrors(newErrors);
		setIsValid(Object.keys(newErrors).length === 0);
	}, [username, password, confirm_password]);


    const handleSubmit = async (e) => {
        e.preventDefault();
		if (!isValid) {
			setShowErrors(true);
			return;
		}

		try {
			await api.post('/register', {username,password});
			login({username, password,});
		} catch (error) {
			setErrors({ api: error.response?.data?.message || "Registration failed" })
		}
    };


	return (
		<div className="w-80 rounded-lg shadow h-auto p-6 bg-white relative overflow-hidden">
			<div className="flex flex-col justify-center items-center space-y-2">
				<h2 className="text-2xl font-medium text-slate-700">Register account</h2>
				<p className="text-slate-500">Enter details below.</p>
			</div>
			<form className="w-full mt-4 space-y-3" onSubmit={handleSubmit}>
				<div>
					<input
						className={`outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full 
							${(showErrors && errors.username) ? "border-red-600" : "border-slate-300 focus:border-blue-300"}`}
						placeholder="Username"
						id="username"
						name="username"
						type="text"
						value={username}
						onChange={handleChanges}
					/>
					{(showErrors && errors.username) && <span className="text-red-600 text-sm">{errors.username}</span>}
				</div>
				
				<PasswordInput 
					className={`outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full 
                                ${(showErrors && errors.password) ? "border-red-600" : "border-slate-300 focus:border-blue-300"}`}
					placeholder="Password"
					id="password"
					name="password"
					value={password}
					onChange={handleChanges}
					showErrors={showErrors}
					errors={errors.password}
				/>

				<PasswordInput 
					className={`outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full 
                                ${(showErrors && errors.password) ? "border-red-600" : "border-slate-300 focus:border-blue-300"}`}
					placeholder="Confirm your password" 
					id="confirm_password" 
					name="confirm_password" 
					value={confirm_password}
					onChange={handleChanges}
					showErrors={showErrors}
					errors={errors.confirm_password}
				/>

				{errors.api && (
					<AuthErrorMessage 
						message={errors.api}
					/>
				)}
				<button 
					className="w-full justify-center py-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white ring-2 disabled:bg-blue-300" 
					id="register" 
					name="register" 
					type="submit"
					disabled={!isValid && password.length > 0 && confirm_password.length > 0}
				>Register</button>
				<p className="flex justify-center space-x-1">
					<span className="text-slate-700"> Have an account? </span>
					<Link className="text-blue-500 hover:underline" to="/auth/login">Log in</Link>
				</p>
			</form>
		</div>
	)
}
