import React, { useEffect, useState, useRef } from 'react';
import { chatService, type Message } from '../../services/chat.service';
import { authService } from '../../services/auth.service';

interface ChatWindowProps {
    chatUser: {
        id: number;
        name: string;
        avatar?: string;
    };
    onBack: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatUser, onBack }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState<number | null>(() => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr).id : null;
    });
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

    useEffect(() => {
        // Fallback to fetch if not in local storage or to update it
        const fetchCurrentUser = async () => {
            try {
                const user = await authService.getCurrentUser();
                setCurrentUserId(user.id);
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        };
        fetchCurrentUser();
    }, []);

    useEffect(() => {
        const fetchMessages = async () => {
            if (!chatUser.id) return;
            try {
                const data = await chatService.getMessages(chatUser.id);
                setMessages(data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();

        // Polling for new messages every 3 seconds
        const interval = setInterval(fetchMessages, 3000);
        return () => clearInterval(interval);
    }, [chatUser.id]);

    useEffect(() => {
        // Only auto-scroll if user is already near the bottom
        if (shouldAutoScroll) {
            scrollToBottom();
        }
    }, [messages, shouldAutoScroll]);

    // Check if user is near bottom when scrolling
    const handleScroll = () => {
        const container = messagesContainerRef.current;
        if (!container) return;

        const { scrollTop, scrollHeight, clientHeight } = container;
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
        setShouldAutoScroll(isNearBottom);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            const message = await chatService.sendMessage(chatUser.id, newMessage);
            setMessages([...messages, message]);
            setNewMessage('');
            // Force scroll to bottom when sending a message
            setShouldAutoScroll(true);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-base-100">
            {/* Chat Header */}
            <div className="navbar bg-base-200 shadow-sm z-10 flex-none">
                <div className="flex-none">
                    <button onClick={onBack} className="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                </div>
                <div className="flex-1 flex items-center gap-3">
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img src={chatUser.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt={chatUser.name} />
                        </div>
                    </div>
                    <div>
                        <span className="font-bold block">{chatUser.name}</span>
                        <span className="text-xs text-base-content/70">En línea</span>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div
                ref={messagesContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0"
            >
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : messages.length === 0 ? (
                    <div className="text-center text-gray-500 mt-10">
                        No hay mensajes aún. ¡Saluda!
                    </div>
                ) : (
                    messages.map((msg) => {
                        const isCurrentUser = msg.user_id === currentUserId;
                        return (
                            <div key={msg.id} className={`chat ${isCurrentUser ? 'chat-end' : 'chat-start'}`}>
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="Avatar"
                                            src={msg.user?.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                        />
                                    </div>
                                </div>
                                <div className="chat-header opacity-50 text-xs mb-1">
                                    {msg.user?.name || 'Usuario'}
                                    <time className="text-xs opacity-50 ml-1">
                                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </time>
                                </div>
                                <div className={`chat-bubble ${isCurrentUser ? 'chat-bubble-primary' : 'chat-bubble-secondary'}`}>
                                    {msg.body}
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-base-300 flex-none">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Escribe un mensaje..."
                        className="input input-bordered w-full rounded-full"
                    />
                    <button type="submit" className="btn btn-primary btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatWindow;
