import { Link } from 'react-router'

export const LoginToView = () => {
  return (
    <div className='flex flex-1 items-center justify-center h-screen'>
        <div className='text-gray-500'>Please log in to view the chat area.</div>
        <Link to="/auth/login" className='text-blue-500 hover:underline ml-2'>
            Go to Login
        </Link>
    </div>
)
}
