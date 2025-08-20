export const loadState = (key) => {
    try {
        const serializedState = localStorage.getItem(key);
        if (!serializedState) 
            return undefined;
        return JSON.parse(serializedState);
    } catch (err) {
        console.error("Error loading from localStorage", err);
        return undefined;
    }
};

export const setState = (key, state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(key, serializedState);
    } catch (err) {
        console.error("Error saving to localStorage", err);
    }
};

export const removeState = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (err) {
        console.error("Error removing from localStorage", err);
    }
};
