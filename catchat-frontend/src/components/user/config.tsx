import { useEffect, useRef, useState } from 'react';

interface ConfigModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function ConfigModal({ isOpen, onClose }: ConfigModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [theme, setTheme] = useState<string>('light');
    const [language, setLanguage] = useState<string>('es');

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen) {
            dialog.showModal();
            loadSettings();
        } else {
            dialog.close();
        }
    }, [isOpen]);

    const loadSettings = () => {
        // Cargar configuraciones desde localStorage
        const savedTheme = localStorage.getItem('theme') || 'light';
        const savedLanguage = localStorage.getItem('language') || 'es';

        setTheme(savedTheme);
        setLanguage(savedLanguage);

        // Aplicar tema al documento
        document.documentElement.setAttribute('data-theme', savedTheme);
    };

    const handleClose = () => {
        onClose();
    };

    const handleThemeChange = (newTheme: string) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const handleLanguageChange = (newLanguage: string) => {
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
    };

    const themes = [
        { value: 'light', label: 'Claro', icon: '☀️' },
        { value: 'dark', label: 'Oscuro', icon: '🌙' },
        { value: 'cupcake', label: 'Cupcake', icon: '🧁' },
        { value: 'bumblebee', label: 'Bumblebee', icon: '🐝' },
        { value: 'emerald', label: 'Esmeralda', icon: '💚' },
        { value: 'corporate', label: 'Corporativo', icon: '💼' },
        { value: 'synthwave', label: 'Synthwave', icon: '🌆' },
        { value: 'retro', label: 'Retro', icon: '📻' },
        { value: 'cyberpunk', label: 'Cyberpunk', icon: '🤖' },
        { value: 'valentine', label: 'Valentine', icon: '💖' },
        { value: 'halloween', label: 'Halloween', icon: '🎃' },
        { value: 'garden', label: 'Garden', icon: '🌺' },
        { value: 'forest', label: 'Forest', icon: '🌲' },
        { value: 'aqua', label: 'Aqua', icon: '💧' },
        { value: 'lofi', label: 'Lo-Fi', icon: '🎵' },
        { value: 'pastel', label: 'Pastel', icon: '🎨' },
        { value: 'fantasy', label: 'Fantasy', icon: '🦄' },
        { value: 'wireframe', label: 'Wireframe', icon: '📐' },
        { value: 'black', label: 'Negro', icon: '⬛' },
        { value: 'luxury', label: 'Luxury', icon: '💎' },
        { value: 'dracula', label: 'Dracula', icon: '🧛' }
    ];

    const languages = [
        { value: 'es', label: 'Español', flag: '🇪🇸' },
        { value: 'en', label: 'English', flag: '🇺🇸' },
        { value: 'fr', label: 'Français', flag: '🇫🇷' },
        { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
        { value: 'pt', label: 'Português', flag: '🇵🇹' }
    ];

    return (
        <dialog ref={dialogRef} className="modal" onClose={handleClose}>
            <div className="modal-box w-11/12 max-w-3xl">
                <h3 className="font-bold text-lg mb-4"> Configuraciones</h3>

                <form method="dialog">
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={handleClose}
                    >
                        ✕
                    </button>
                </form>

                <div className="space-y-6">
                    {/* Tema Section */}
                    <div>
                        <h4 className="font-semibold text-md mb-3 flex items-center gap-2">
                            Tema de la aplicación
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-80 overflow-y-auto p-2">
                            {themes.map((themeOption) => (
                                <button
                                    key={themeOption.value}
                                    type="button"
                                    onClick={() => handleThemeChange(themeOption.value)}
                                    className={`btn btn-outline ${theme === themeOption.value ? 'btn-active' : ''
                                        } justify-start gap-2`}
                                    data-theme={themeOption.value}
                                >
                                    <span className="text-lg">{themeOption.icon}</span>
                                    <span className="text-sm">{themeOption.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="divider"></div>

                    {/* Idioma Section */}
                    <div>
                        <h4 className="font-semibold text-md mb-3 flex items-center gap-2">
                            Idioma
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                            {languages.map((lang) => (
                                <button
                                    key={lang.value}
                                    type="button"
                                    onClick={() => handleLanguageChange(lang.value)}
                                    className={`btn btn-outline ${language === lang.value ? 'btn-active' : ''
                                        } justify-start gap-2`}
                                >
                                    <span className="text-lg">{lang.flag}</span>
                                    <span>{lang.label}</span>
                                </button>
                            ))}
                        </div>
                        {language !== 'es' && (
                            <div className="alert alert-info mt-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span className="text-sm">La traducción se aplicará en futuras versiones.</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="modal-action">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleClose}
                    >
                        Aceptar
                    </button>
                </div>
            </div>

            {/* Modal backdrop */}
            <form method="dialog" className="modal-backdrop">
                <button onClick={handleClose}>close</button>
            </form>
        </dialog>
    );
}

export default ConfigModal;