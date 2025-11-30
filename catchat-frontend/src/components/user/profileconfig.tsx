import { useEffect, useRef, useState } from 'react';
import { authService } from '../../services/auth.service';

interface ProfileConfigProps {
    isOpen: boolean;
    onClose: () => void;
}

interface UserProfile {
    name: string;
    email: string;
    descripcion: string;
    avatar: string;
}

function ProfileConfig({ isOpen, onClose }: ProfileConfigProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [profile, setProfile] = useState<UserProfile>({
        name: '',
        email: '',
        descripcion: '',
        avatar: ''
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen) {
            dialog.showModal();
            loadUserData();
        } else {
            dialog.close();
            // Reset states when closing
            setPreviewUrl(null);
            setSelectedFile(null);
            setError('');
            setSuccessMessage('');
        }
    }, [isOpen]);

    const loadUserData = () => {
        // Load user data from localStorage
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            setProfile({
                name: user.name || '',
                email: user.email || '',
                descripcion: user.descripcion || '',
                avatar: user.avatar || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
            });
        }
    };

    const handleClose = () => {
        setError('');
        setSuccessMessage('');
        onClose();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            const formData = new FormData();
            formData.append('name', profile.name);
            formData.append('descripcion', profile.descripcion || '');
            if (selectedFile) {
                formData.append('avatar', selectedFile);
            }

            const response = await authService.updateProfile(formData);

            // Update localStorage with new data
            const userStr = localStorage.getItem('user');
            if (userStr) {
                const user = JSON.parse(userStr);
                // The response.user contains the updated user info
                const updatedUser = { ...user, ...response.user };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                // Update local state to reflect changes immediately
                setProfile(prev => ({
                    ...prev,
                    avatar: updatedUser.avatar,
                    name: updatedUser.name,
                    descripcion: updatedUser.descripcion
                }));
            }

            setSuccessMessage('¡Perfil actualizado exitosamente!');
            setTimeout(() => {
                handleClose();
            }, 1500);
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || err.message || 'Error al actualizar el perfil');
        } finally {
            setLoading(false);
        }
    };

    return (
        <dialog ref={dialogRef} className="modal" onClose={handleClose}>
            <div className="modal-box w-11/12 max-w-2xl">
                <h3 className="font-bold text-lg mb-4">Configuración de Perfil</h3>

                <form method="dialog">
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={handleClose}
                    >
                        ✕
                    </button>
                </form>

                {/* Profile Picture Section */}
                <div className="flex flex-col items-center mb-6">
                    <div className="avatar mb-4">
                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={previewUrl || profile.avatar} alt="Profile" />
                        </div>
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                    />
                </div>

                {/* Error and Success Messages */}
                {error && (
                    <div className="alert alert-error mb-4">
                        <span>{error}</span>
                    </div>
                )}
                {successMessage && (
                    <div className="alert alert-success mb-4">
                        <span>{successMessage}</span>
                    </div>
                )}

                {/* Profile Form */}
                <form onSubmit={handleSave} className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Nombre</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleInputChange}
                            placeholder="Tu nombre"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Descripción</span>
                        </label>
                        <textarea
                            name="descripcion"
                            value={profile.descripcion}
                            onChange={handleInputChange}
                            className="textarea textarea-bordered h-24"
                            placeholder="Cuéntanos sobre ti..."
                        ></textarea>
                    </div>

                    {/* Action Buttons */}
                    <div className="modal-action">
                        <button type="button" className="btn btn-ghost" onClick={handleClose}>
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? 'Guardando...' : 'Guardar cambios'}
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

export default ProfileConfig;