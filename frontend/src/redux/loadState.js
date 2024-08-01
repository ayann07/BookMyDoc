export const loadState = () => {
    try {
        const authToken = localStorage.getItem('authToken');
        const authUser = JSON.parse(localStorage.getItem('authUser'));
        const role = localStorage.getItem('role');
        
        if (authToken || authUser || role) {
            return {
                user: {
                    authToken,
                    authUser,
                    role
                }
            };
        } else {
            return undefined;
        }
    } catch (e) {
        console.warn("Failed to load state from localStorage", e);
        return undefined;
    }
};