import { useState } from 'react';
import authService from '../../services/auth.service';

interface RegisterFormProps {
    onSwitch: () => void;
}

function Registerform({ onSwitch }: RegisterFormProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        setLoading(true);

        try {
            await authService.register({
                name,
                email,
                password,
                password_confirmation: confirmPassword
            });
            setSuccess(true);
            // Optional: Switch to login after a delay or show a button
            setTimeout(() => {
                onSwitch();
            }, 2000);
        } catch (err: any) {
            console.error('Registration error:', err);
            // Handle Laravel validation errors which might come as an object
            const responseData = err.response?.data;
            if (typeof responseData === 'string') {
                setError(responseData);
            } else if (responseData?.message) {
                setError(responseData.message);
            } else {
                setError('Failed to register. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border w-full max-w-2xl p-6 shadow-xl">
            <legend className="fieldset-legend text-3xl font-bold">Create Account</legend>

            <p className="text-xs opacity-60 text-center mb-6">Join CatChat to start chatting with your friends</p>

            {error && (
                <div role="alert" className="alert alert-error mb-4 p-2 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{error}</span>
                </div>
            )}

            {success && (
                <div role="alert" className="alert alert-success mb-4 p-2 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Registration successful! Redirecting to login...</span>
                </div>
            )}

            <form onSubmit={handleRegister} className="flex flex-col gap-4">
                {/* Campo de Nombre de Usuario */}
                <div className="flex flex-col gap-2">
                    <label className="label">
                        <span className="label-text flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>
                            Username
                        </span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                {/* Campo de Email */}
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

                {/* Campo de Password */}
                <div className="flex flex-col gap-2">
                    <label className="label">
                        <span className="label-text flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                                <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                            </svg>
                            Password
                        </span>
                    </label>
                    <input
                        type="password"
                        className="input input-bordered w-full"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                    />
                </div>

                {/* Campo de Confirmar Password */}
                <div className="flex flex-col gap-2">
                    <label className="label">
                        <span className="label-text flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                                <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                            </svg>
                            Confirm Password
                        </span>
                    </label>
                    <input
                        type="password"
                        className="input input-bordered w-full"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={6}
                    />
                </div>

                {/* Checkbox de términos y condiciones */}
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                    <input type="checkbox" className="checkbox checkbox-xs" required />
                    <span className="text-base-content/60">I agree to the Terms and Conditions</span>
                </label>

                {/* Botones de acción */}
                <div className="flex flex-col items-stretch gap-3 mt-2">
                    <button type="submit" className="btn btn-md btn-primary btn-block" disabled={loading}>
                        {loading ? <span className="loading loading-spinner"></span> : 'Create Account'}
                    </button>
                    <div className="divider my-0">OR</div>
                    <button type="button" onClick={onSwitch} className="btn btn-md btn-outline btn-secondary btn-block">Already have an account? Login</button>
                </div>
            </form>
        </fieldset>
    );
}
export default Registerform;
