// services.ts

interface SignInState {
    // Define the structure of your SignInState
    // For example, username and password fields
    email: string;
    password: string;
}

export const loginUser = async (data: SignInState): Promise<any> => {
    try {
        const response = await fetch('http://localhost:8083/api/auth/login', {
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
