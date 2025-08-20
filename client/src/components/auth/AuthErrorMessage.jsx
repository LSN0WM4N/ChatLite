export const AuthErrorMessage = ({ message }) => {
    return (
        <div className="flex justify-center items-center w-full p-4 bg-red-500 border-2 border-red-300 rounded-md">
            <span className="text-white">
                {message}
            </span>
        </div>
    )
}
