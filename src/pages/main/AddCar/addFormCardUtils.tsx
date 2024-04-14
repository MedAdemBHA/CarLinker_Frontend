// utils.ts

export interface Option {
    value: string;
    label: string;
}

export const colors: Option[] = [
    { value: 'Blue', label: 'Blue' },
    { value: 'Yellow', label: 'Yellow' },
    { value: 'Black', label: 'Black' },
    { value: 'Red', label: 'Red' },
    { value: 'White', label: 'White' },
    { value: 'Silver', label: 'Silver' },
    { value: 'Gray', label: 'Gray' },
    { value: 'Green', label: 'Green' },
    { value: 'Orange', label: 'Orange' },
    { value: 'Purple', label: 'Purple' },
    { value: 'Brown', label: 'Brown' },
    { value: 'Beige', label: 'Beige' },
    { value: 'Gold', label: 'Gold' },
    { value: 'Pink', label: 'Pink' },
    { value: 'Turquoise', label: 'Turquoise' },
];

export const manufacturers: Option[] = [
    { value: 'Toyota', label: 'Toyota' },
    { value: 'Volkswagen', label: 'Volkswagen' },
    { value: 'Ford', label: 'Ford' },
    { value: 'Chevrolet', label: 'Chevrolet' },
    { value: 'Honda', label: 'Honda' },
    { value: 'Nissan', label: 'Nissan' },
    { value: 'Mercedes-Benz', label: 'Mercedes-Benz' },
    { value: 'BMW', label: 'BMW' },
    { value: 'Audi', label: 'Audi' },
    { value: 'Hyundai', label: 'Hyundai' },
    { value: 'Kia', label: 'Kia' },
    { value: 'General Motors', label: 'General Motors' },
    { value: 'Tesla', label: 'Tesla' },
    { value: 'Fiat Chrysler', label: 'Fiat Chrysler' },
    { value: 'Renault', label: 'Renault' },
    { value: 'Mazda', label: 'Mazda' },
    { value: 'Subaru', label: 'Subaru' },
    { value: 'Volvo', label: 'Volvo' },
    { value: 'Porsche', label: 'Porsche' },
    { value: 'Land Rover', label: 'Land Rover' },
];
export const fuelType: Option[] = [
    { value: 'Petrol', label: 'Petrol' },
    { value: 'Diesel', label: 'Diesel' },
];
export const option: Option[] = [
    { value: 'BLUETOOTH', label: 'BLUETOOTH' },
    { value: 'GPS', label: 'GPS' },
    { value: 'AIRBAG', label: 'AIRBAG' },
    { value: 'ALARM', label: 'ALARM' },
];
export const transmission: Option[] = [
    { value: 'MANUAL', label: 'MANUAL' },
    { value: 'AUTOMATIC', label: 'AUTOMATIC' },
];
