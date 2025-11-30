import { useEffect, useRef, useState } from 'react';
import api from '../../services/api';

interface SendMessageModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface MessageData {
    username: string;
    message: string;
}

function SendMessageModal({ isOpen, onClose }: SendMessageModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [formData, setFormData] = useState<MessageData>({
        username: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    }, [isOpen]);

    const handleClose = () => {
        setError('');
        setSuccessMessage('');
        setFormData({ username: '', message: '' });
        onClose();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            // You can modify this endpoint according to your backend API
            await api.post('/messages/send', {
                to_username: formData.username,
                message: formData.message
            });

            setSuccessMessage('¡Mensaje enviado exitosamente!');
            setFormData({ username: '', message: '' });

            setTimeout(() => {
                handleClose();
            }, 1500);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al enviar el mensaje');
        } finally {
            setLoading(false);
        }
    };

    return (
        <dialog ref={dialogRef} className="modal" onClose={handleClose}>
            <div className="modal-box w-11/12 max-w-md">
                <h3 className="font-bold text-lg mb-4">Enviar Mensaje</h3>

                <form method="dialog">
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={handleClose}
                    >
                        ✕
                    </button>
                </form>

                {/* Error and Success Messages */}
                {error && (
                    <div className="alert alert-error mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}
                {successMessage && (
                    <div className="alert alert-success mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{successMessage}</span>
                    </div>
                )}

                {/* Message Form */}
                <form onSubmit={handleSendMessage} className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Nombre de Usuario</span>
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="@usuario_amigo"
                            className="input input-bordered w-full"
                            required
                        />
                        <label className="label">
                            <span className="label-text-alt">Ingresa el nombre de usuario del destinatario</span>
                        </label>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Mensaje</span>
                        </label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            className="textarea textarea-bordered h-32"
                            placeholder="Escribe tu mensaje aquí..."
                            required
                        ></textarea>
                        <label className="label">
                            <span className="label-text-alt">{formData.message.length} caracteres</span>
                        </label>
                    </div>

                    {/* Action Buttons */}
                    <div className="modal-action">
                        <button
                            type="button"
                            className="btn btn-ghost"
                            onClick={handleClose}
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Enviando...
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                    </svg>
                                    Enviar
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Modal backdrop */}
            <form method="dialog" className="modal-backdrop">
                <button onClick={handleClose}>close</button>
            </form>
        </dialog>
    );
}

export default SendMessageModal;
