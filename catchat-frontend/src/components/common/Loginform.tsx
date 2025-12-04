import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface LoginFormProps {
    onSwitch: () => void;
}

function LoginForm({ onSwitch }: LoginFormProps) {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login({ email, password });
            navigate('/chat'); // Redirect to chat after login
        } catch (err: any) {
            console.error('Login error:', err);
            setError(err.response?.data?.error || 'Failed to login. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border w-full max-w-2xl p-6 shadow-xl">
            <legend className="fieldset-legend text-3xl font-bold">Bienvenido a CatChat</legend>

            <p className="text-xs opacity-60 text-center mb-6">Inicia sesión para comenzar a chatear con tus amigos</p>

            {error && (
                <div role="alert" className="alert alert-error mb-4 p-2 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{error}</span>
                </div>
            )}

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label className="label">
                        <span className="label-text flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            Email
                        </span>
                    </label>
                    <input
                        type="email"
                        className="input input-bordered w-full"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="label">
                        <span className="label-text flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                                <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                            </svg>
                            Contraseña
                        </span>
                    </label>
                    <input
                        type="password"
                        className="input input-bordered w-full"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <label className="flex items-center gap-2 text-xs cursor-pointer">
                    <input type="checkbox" className="checkbox checkbox-xs" />
                    <span className="text-base-content/60">Recordarme</span>
                </label>

                <div className="flex flex-col items-stretch gap-3 mt-2">
                    <button type="submit" className="btn btn-md btn-primary btn-block" disabled={loading}>
                        {loading ? <span className="loading loading-spinner"></span> : 'Iniciar Sesión'}
                    </button>
                    <div className="divider my-0">O</div>
                    <button type="button" onClick={onSwitch} className="btn btn-md btn-outline btn-info btn-block">Registrarse</button>
                </div>

                <a href="#" className="text-xs text-center hover:underline opacity-60 hover:opacity-100">
                    ¿Olvidaste tu contraseña?
                </a>
            </form>
        </fieldset>
    );
}
export default LoginForm;