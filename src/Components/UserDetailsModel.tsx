import React from 'react';

interface UserDetailsModalProps {
  userName: string;
  email: string;
  onClose: () => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ userName, email, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">User Details</h2>
        <p><strong>Name:</strong> {userName}</p>
        <p><strong>Email:</strong> {email}</p>
        <button 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default UserDetailsModal;
