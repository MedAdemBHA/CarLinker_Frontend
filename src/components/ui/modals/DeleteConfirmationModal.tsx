import React from 'react';

interface DeleteConfirmationModalProps {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
    show,
    onClose,
    onConfirm,
}) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-md">
                <p className="text-lg font-medium mb-2">Confirm Delete</p>
                <p className="text-sm text-gray-700">
                    Are you sure you want to delete this user?
                </p>
                <div className="mt-4 flex justify-end">
                    <button
                        className="text-red-500 hover:text-red-700 font-medium mr-4"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="text-green-500 hover:text-green-700 font-medium"
                        onClick={() => {
                            onClose();
                            onConfirm();
                        }}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
