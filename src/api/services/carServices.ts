import { baseUrl } from '@/apiConfig';

type Item = {
    manufacturer?: string;
    model?: string;
    mileage?: string;
    location?: string;
    year?: string;
    price?: number;
    color?: string;
    fuelType?: string;
    option?: string[];
    transmission?: string;
    description?: string;
    images?: FileList;
};

export const addCar = async ({
    token,
    carData,
}: {
    token: string;
    carData: Item;
}): Promise<any> => {
    try {
        const formData = new FormData();

        // Append all form data fields
        Object.entries(carData).forEach(([key, value]) => {
            if (key === 'images' && value instanceof FileList) {
                Array.from(value).forEach((file) => {
                    formData.append('images', file);
                });
            } else {
                formData.append(key, value as string);
            }
        });

        const response = await fetch(`${baseUrl}/api/user/cars`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to add car');
        }
    } catch (error) {
        // Handle any other errors here
        throw new Error('An error occurred during adding car');
    }
};

export const getAllActiveCars = async (): Promise<any> => {
    try {
        const response = await fetch(`${baseUrl}/api/cars/active`, {
            method: 'GET',
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
