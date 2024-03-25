export const getMyProfile = async (token: string): Promise<any> => {
    try {
        const response = await fetch(`http://localhost:8083/api/user/profile`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.message || 'Failed to fetch your profile',
            );
        }

        return response.json();
    } catch (error) {
        throw new Error('An error occurred during fetching your profile');
    }
};
type DataUpdateStat = {
    id: number;
    name?: string;
    email?: string;
    password?: string;
    city: string;
    phone: string;
};
export const updateProfile = async ({
    token,

    userData,
}: {
    token: string;

    userData?: DataUpdateStat;
}): Promise<any> => {
    try {
        const response = await fetch(`http://localhost:8083/api/user/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(userData), // Only send data if provided
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.message || 'Failed to update user details',
            );
        }

        const updatedUserData = await response.json(); // Assuming successful response returns updated user data

        return updatedUserData; // Return the updated user data
    } catch (error) {
        // Handle errors more specifically if possible (e.g., validation errors, network errors)
        return new Error('An error occurred during updating user details');
    }
};
