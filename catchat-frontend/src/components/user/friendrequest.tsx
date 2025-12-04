import React, { useEffect, useState } from 'react';
import api from '../../services/api';

interface FriendRequestProps {
    onSwitch: () => void;
}

interface User {
    id: number;
    name: string;
    avatar?: string;
}

interface FriendRequest {
    id: number;
    sender: User;
    status: string;
}

const FriendRequest: React.FC<FriendRequestProps> = ({ onSwitch }) => {
    const [requests, setRequests] = useState<FriendRequest[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {
        try {
            const response = await api.get<FriendRequest[]>('/friend-request/pending');
            setRequests(response);
        } catch (error) {
            console.error('Error fetching friend requests:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleAccept = async (id: number) => {
        try {
            await api.post(`/friend-request/accept/${id}`);
            fetchRequests(); // Refresh list
        } catch (error) {
            console.error('Error accepting request:', error);
        }
    };

    const handleReject = async (id: number) => {
        try {
            await api.post(`/friend-request/reject/${id}`);
            fetchRequests(); // Refresh list
        } catch (error) {
            console.error('Error rejecting request:', error);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-base-100 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Solicitudes de Amistad</h2>

            <div className="space-y-4">
                {loading ? (
                    <div className="text-center py-8">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : requests.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                        No tienes solicitudes pendientes.
                    </div>
                ) : (
                    requests.map((request) => (
                        <div key={request.id} className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="w-12 h-12 rounded-full">
                                        <img
                                            src={request.sender.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                            alt={request.sender.name}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p className="font-bold">{request.sender.name}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleAccept(request.id)}
                                    className="btn btn-sm btn-success btn-circle"
                                    title="Aceptar"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => handleReject(request.id)}
                                    className="btn btn-sm btn-error btn-circle"
                                    title="Rechazar"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="mt-6 text-center">
                <button
                    onClick={onSwitch}
                    className="text-sm text-primary hover:underline"
                >
                    Volver a lista de amigos
                </button>
            </div>
        </div>
    );
};

export default FriendRequest;
