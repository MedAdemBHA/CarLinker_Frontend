import { baseUrl } from '@/apiConfig';

export const getUserCounts = async (token: string): Promise<any> => {
    try {
        const response = await fetch(`${baseUrl}/api/admin/userCounts`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch user counts');
        }

        return response.json();
    } catch (error) {
        throw new Error('An error occurred during fetching user counts');
    }
};

export const getAllusers = async (token: string): Promise<any> => {
    try {
        const response = await fetch(`${baseUrl}/api/admin/users`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch user counts');
        }

        return response.json();
    } catch (error) {
        throw new Error('An error occurred during fetching user counts');
    }
};

export const getUserWithID = async (
    token: string,
    id: string,
): Promise<any> => {
    try {
        const response = await fetch(`${baseUrl}/api/admin/user/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.message || 'Failed to fetch user details',
            );
        }

        return response.json();
    } catch (error) {
        throw new Error('An error occurred during fetching user details');
    }
};

interface DataUpdateStat {
    name?: string;
    email?: string;
    isActive?: boolean;
}
export const updateUserWithID = async ({
    token,
    id,
    userData,
}: {
    token: string;
    id: string;
    userData?: DataUpdateStat;
}): Promise<any> => {
    try {
        const response = await fetch(`${baseUrl}/api/admin/updateUser/${id}`, {
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
export const deleteUserWithID = async ({
    token,
    id,
}: {
    token: string;
    id: number;
}): Promise<any> => {
    try {
        const response = await fetch(`${baseUrl}/api/admin/deleteUser/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete user');
        }

        return { message: 'User deleted successfully' };
    } catch (error) {
        throw new Error('An error occurred during deleting user');
    }
};
export const getAllCars = async (token: string): Promise<any> => {
    try {
        const response = await fetch(`${baseUrl}/api/admin/cars`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch user counts');
        }

        return response.json();
    } catch (error) {
        throw new Error('An error occurred during fetching user counts');
    }
};
export const deleteCarWithID = async ({
    token,
    id,
}: {
    token: string;
    id: number;
}): Promise<any> => {
    try {
        const response = await fetch(`${baseUrl}/api/admin/cars/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete user');
        }

        return { message: 'User deleted successfully' };
    } catch (error) {
        throw new Error('An error occurred during deleting user');
    }
};
export const updateCarStatusID = async ({
    token,
    id,
}: {
    token: string;
    id: number;
}): Promise<any> => {
    try {
        const response = await fetch(
            `${baseUrl}/api/admin/cars/${id}/activate`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.message || 'Failed to set car active user details',
            );
        }

        const updatedUserData = await response.json(); // Assuming successful response returns updated user data

        return updatedUserData; // Return the updated user data
    } catch (error) {
        // Handle errors more specifically if possible (e.g., validation errors, network errors)
        return new Error('An error occurred during updating user details');
    }
};
