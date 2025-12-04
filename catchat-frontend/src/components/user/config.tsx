import { useEffect, useRef, useState } from 'react';

interface ConfigModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function ConfigModal({ isOpen, onClose }: ConfigModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [theme, setTheme] = useState<string>('coffee');
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
        const savedTheme = localStorage.getItem('theme') || 'coffee';
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
        { value: 'coffee', label: 'Oscuro', icon: '🌙' },
        { value: 'caramellatte', label: 'Claro', icon: '☀️' }
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
                        <div className="dropdown dropdown-bottom">
                            <div tabIndex={0} role="button" className="btn m-1 w-full justify-between">
                                <span className="flex items-center gap-2">
                                    {themes.find(t => t.value === theme)?.icon}
                                    {themes.find(t => t.value === theme)?.label}
                                </span>
                                <svg width="12px" height="12px" className="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
                            </div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                {themes.map((themeOption) => (
                                    <li key={themeOption.value}>
                                        <button
                                            onClick={() => handleThemeChange(themeOption.value)}
                                            className={theme === themeOption.value ? 'active' : ''}
                                        >
                                            {themeOption.icon} {themeOption.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
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