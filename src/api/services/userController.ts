import { baseUrl } from '@/apiConfig';

export const getMyProfile = async (token: string): Promise<any> => {
    try {
        const response = await fetch(`${baseUrl}/api/user/profile`, {
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
        const response = await fetch(`${baseUrl}/api/user/update`, {
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
export const getMyCars = async (token: string): Promise<any> => {
    try {
        const response = await fetch(`${baseUrl}/api/user/mycars`, {
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
        const response = await fetch(`${baseUrl}/api/user/mycars/${id}`, {
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
export const getCarWithID = async (token: string, id: string): Promise<any> => {
    try {
        const response = await fetch(`${baseUrl}/api/user/cars/${id}`, {
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

export const updateCarWithID = async ({
    token,
    id,
    carData,
}: {
    token: string;
    id: string;
    carData?: any;
}): Promise<void> => {
    try {
        const formData = new FormData();

        // Append all form data fields
        if (carData) {
            Object.entries(carData).forEach(([key, value]) => {
                if (key === 'images' && value instanceof FileList) {
                    Array.from(value).forEach((file) => {
                        formData.append('images', file);
                    });
                } else {
                    formData.append(key, value as string);
                }
            });
        }

        const response = await fetch(`${baseUrl}/api/user/cars/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.message || 'Failed to update car details',
            );
        }

        // Return void if the operation is successful
        return;
    } catch (error) {
        console.error('An error occurred during updating car details:', error);
        // Re-throw the error to be handled by the caller
        throw error;
    }
};
