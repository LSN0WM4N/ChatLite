import { useAuth } from "../../hooks/useAuth";
import { ChangePhoto } from "../profile/ChangePhoto";

export const ProfileInfo = () => {
    const { UUID: ID, logout, username } = useAuth(); 

    return (
        <div className="flex flex-col bg-white rounded-3xl p-8">
            <div className="flex items-center mb-10">
                <div className="flex-shrink-0 ml-0 pl-0">
                    <ChangePhoto 
                        endpoint={'/upload'}
                        body={{userID: ID}}
                        type="user"
                        canEdit={true}
                        className="pl-0 ml-0"
                    />
                </div>

                <div className="flex flex-1 items-center justify-between pl-4">
                    <span className="strong sm:max-w-30  max-w-[200px] break-words mr-2 ">{username}</span>
                    <svg 
                        className="w-6 h-6 text-gray-700 cursor-pointer hover:text-red-500 transition-colors"
                        version="1.1"
                        id="logout_icon" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 471.2 471.2" 
                        onClick={logout}
                    >
                        <g>
                            <path d="M227.619,444.2h-122.9c-33.4,0-60.5-27.2-60.5-60.5V87.5c0-33.4,27.2-60.5,60.5-60.5h124.9c7.5,0,13.5-6,13.5-13.5
                                s-6-13.5-13.5-13.5h-124.9c-48.3,0-87.5,39.3-87.5,87.5v296.2c0,48.3,39.3,87.5,87.5,87.5h122.9c7.5,0,13.5-6,13.5-13.5
                                S235.019,444.2,227.619,444.2z"/>
                            <path d="M450.019,226.1l-85.8-85.8c-5.3-5.3-13.8-5.3-19.1,0c-5.3,5.3-5.3,13.8,0,19.1l62.8,62.8h-273.9
                                c-7.5,0-13.5,6-13.5,13.5s6,13.5,13.5,13.5h273.9l-62.8,62.8c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4
                                l85.8-85.8C455.319,239.9,455.319,231.3,450.019,226.1z"/>
                        </g>
                    </svg>
                </div>
            </div>

            <button 
                className="w-full justify-center py-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white ring-2" 
                type="button"
                onClick={() => {window.location.reload()}}
            >
                Save changes
            </button> 
        </div>
    );
}
