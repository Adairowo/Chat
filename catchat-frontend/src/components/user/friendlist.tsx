import React, { useEffect, useState } from 'react';
import api from '../../services/api';

interface FriendListProps {
    onSwitch: () => void;
}

interface User {
    id: number;
    username: string;
    profile_image?: string;
}

const FriendList: React.FC<FriendListProps> = ({ onSwitch }) => {
    const [friends, setFriends] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchFriends = async () => {
        try {
            const response = await api.get<User[]>('/friends');
            setFriends(response);
        } catch (error) {
            console.error('Error fetching friends:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFriends();
    }, []);

    const handleRemoveFriend = async (id: number) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar a este amigo?')) return;

        try {
            await api.delete(`/friends/${id}`);
            fetchFriends(); // Refresh list
        } catch (error) {
            console.error('Error removing friend:', error);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-base-100 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Lista de Amigos</h2>

            <div className="space-y-4">
                {loading ? (
                    <div className="text-center py-8">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : friends.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                        No tienes amigos agregados aún.
                    </div>
                ) : (
                    friends.map((friend) => (
                        <div key={friend.id} className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="w-12 h-12 rounded-full">
                                        <img
                                            src={friend.profile_image ? `http://localhost:8000/storage/${friend.profile_image}` : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                            alt={friend.username}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p className="font-bold">{friend.username}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="btn btn-sm btn-primary btn-circle" title="Enviar mensaje">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => handleRemoveFriend(friend.id)}
                                    className="btn btn-sm btn-error btn-circle"
                                    title="Eliminar amigo"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
                    Ver solicitudes de amistad
                </button>
            </div>
        </div>
    );
};

export default FriendList;
