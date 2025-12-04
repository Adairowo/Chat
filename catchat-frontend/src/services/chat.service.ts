import api from './api';

export interface Message {
    id: number;
    conversation_id: number;
    user_id: number;
    body: string;
    type: string;
    is_read: boolean;
    created_at: string;
    user?: {
        id: number;
        name: string;
        avatar?: string;
    };
}

export interface Conversation {
    id: number;
    user: {
        id: number;
        name: string;
        avatar?: string;
    };
    last_message?: Message;
}

export const chatService = {
    async sendMessage(receiverId: number, body: string): Promise<Message> {
        return await api.post<Message>('/messages/send', { receiver_id: receiverId, body });
    },

    async getMessages(userId: number): Promise<Message[]> {
        return await api.get<Message[]>(`/messages/${userId}`);
    },

    async getConversations(): Promise<Conversation[]> {
        return await api.get<Conversation[]>('/conversations');
    }
};
