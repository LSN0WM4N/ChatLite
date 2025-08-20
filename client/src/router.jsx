import { Navigate, Route, Routes } from 'react-router';

import { Home } from './pages/Home';
import { Chat } from './pages/Chat';
import { Login } from './pages/Login';
import { useAuth } from './hooks/useAuth';
import { Profile } from './pages/Profile';
import { Register } from './pages/Register';
import { CreateChannel } from './pages/CreateChannel';
import { UpdateChannel } from './pages/UpdateChannel';
import { MainLayout } from './components/layout/MainLayout';

const PublicRoute = ({ children, redirectTo }) => {
	const { isAuthenticated } = useAuth();

	return !isAuthenticated ?
		<> {children} </> :
		<Navigate to={redirectTo ?? '/'} replace />;
};

const PrivateRoute = ({ children, redirectTo }) => {
	const { isAuthenticated } = useAuth();

	return isAuthenticated ?
		<> {children} </> :
		<Navigate to={redirectTo ?? '/auth/login'} replace />;
};

export const AppRouter = () => {
	return (
		<Routes>

			{/* Private Route */}
			<Route element={
				<PrivateRoute>
					<MainLayout />
				</PrivateRoute>
			}>
				<Route index element={<Home />} />
				<Route path="chat">
					<Route index element={<Chat />} />
					<Route path=":chatID" element={<Chat />} />
				</Route>
				<Route path='profile' element={<Profile />} />
				<Route path='create-channel' element={<CreateChannel />} />
				<Route path='info/:chatID' element={<UpdateChannel />} />
			</Route>


			{/* Public Routes */}
			<Route path="/auth/login" element={
				<PublicRoute redirectTo={"/"} >
					<Login />
				</PublicRoute>
			} />
			<Route path="/auth/register" element={
				<PublicRoute redirectTo={"/"} >
					<Register />
				</PublicRoute>
			} />

			{/* Not found */}
			<Route path="*" element={<div>404 Not Found</div>} />
		</Routes>
	)
}
