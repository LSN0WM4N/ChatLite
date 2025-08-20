import { useState } from "react"

export const useForm = (initialState = {}) => {
    const [state, setState] = useState(initialState);

    const setValues = (key, value) => {
        setState({
            ...state,
            [key]: value,
        });
    }

    const handleFormChange = (e) => {
        e.preventDefault();
        setValues(e.target.name, e.target.value)
    }

    const reset = () => {
        setState(initialState);
    }


    return [state, handleFormChange, reset, setValues];
}
