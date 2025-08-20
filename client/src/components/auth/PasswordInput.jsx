import { useState } from "react"

import { OpenEyeIcon } from "../common/OpenEyeIcon";
import { ClosedEyeIcon } from "../common/ClosedEyeIcon";

export const PasswordInput = ({
    showErrors = false,
    errors = false,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="mb-4">
            <div className='relative m-0'>
                <input
                    type={showPassword ? "text" : "password"}
                    
                    {...props}
                />
                <div
                    className='absolute w-4 h-4 top-1/2 -translate-y-1/2 right-2'
                    onClick={() => setShowPassword(prev => !prev)}
                >
                    {showPassword ? <ClosedEyeIcon /> : <OpenEyeIcon />}
                </div>
            </div>
            {(showErrors && errors) && <span className="text-red-600 text-sm">{props.errors}</span>}
        </div>
    )
}
