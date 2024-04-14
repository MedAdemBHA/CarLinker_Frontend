// services.ts
import { baseUrl } from '@/apiConfig';

interface SignInState {
    // Define the structure of your SignInState
    // For example, username and password fields
    email: string;
    password: string;
}

interface SignUpState {
    // Define the structure of your SignInState
    // For example, username and password fields
    name: string;
    email: string;
    password: string;
}

export const loginUser = async (data: SignInState): Promise<any> => {
    try {
        const response = await fetch(`${baseUrl}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }

        return response.json();
    } catch (error) {
        throw new Error('An error occurred during login');
    }
};
export const registerUser = async (data: SignUpState): Promise<string> => {
    try {
        const response = await fetch(`${baseUrl}/api/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData || 'Registration failed');
        }

        const successMessage = await response.text();
        return successMessage;
    } catch (error) {
        throw new Error('An error occurred during registration');
    }
};

//todo this is the main function
// const mutation = useMutation(
//     async (data: SignInState) => {
//         const response = await fetch(
//             'http://localhost:8083/api/auth/login',
//             {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(data),
//             },
//         );
//         return response.json(); // Assuming the response is JSON
//     },
//     {
//         onSuccess: (data) => {
//             console.log('Login successful:', data);
//         },
//         onError: (error) => {
//             console.error('Login error:', error);
//         },
//     },
// );
