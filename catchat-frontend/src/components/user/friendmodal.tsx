import { useEffect, useRef, useState } from 'react';
import api from '../../services/api';

interface FriendModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FriendRequestData {
    email: string;
}

function FriendModal({ isOpen, onClose }: FriendModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [formData, setFormData] = useState<FriendRequestData>({
        email: ''
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
        setFormData({ email: '' });
        onClose();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSendRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            await api.post('/friend-request/send', {
                email: formData.email
            });

            setSuccessMessage('¡Solicitud de amistad enviada exitosamente!');
            setFormData({ email: '' });

            setTimeout(() => {
                handleClose();
            }, 1500);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al enviar la solicitud');
        } finally {
            setLoading(false);
        }
    };

    return (
        <dialog ref={dialogRef} className="modal" onClose={handleClose}>
            <div className="modal-box w-11/12 max-w-md">
                <h3 className="font-bold text-lg mb-4">Agregar amigo</h3>

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

                {/* Friend Request Form */}
                <form onSubmit={handleSendRequest} className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Correo Electrónico</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="usuario@ejemplo.com"
                            className="input input-bordered w-full"
                            required
                        />
                        <label className="label">
                            <span className="label-text-alt">Para agregar un amigo ingresa su correo electrónico</span>
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
                                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                                    </svg>
                                    Enviar solicitud
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

export default FriendModal;
