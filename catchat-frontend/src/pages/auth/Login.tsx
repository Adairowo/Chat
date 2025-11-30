import { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Loginform from '../../components/common/Loginform';
import Registerform from '../../components/common/Registerform';
import Footer from '../../components/common/Footer';

function Login() {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="flex flex-col">
            <Navbar />
            {/* Contenido principal del login */}
            <div className="min-h-screen flex items-center justify-center p-8 py-16 bg-base-200 lg:bg-cover lg:bg-center lg:bg-no-repeat relative"
                style={{ backgroundImage: 'var(--login-bg-image)' }}>
                {/* Overlay oscuro solo en desktop para mejorar legibilidad */}
                <div className="hidden lg:block absolute inset-0 bg-black/40"></div>

                {/* Contenedor del formulario con z-index para estar sobre el overlay */}
                <div className="relative z-10">
                    {isLogin ? (
                        <Loginform onSwitch={toggleForm} />
                    ) : (
                        <Registerform onSwitch={toggleForm} />
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Login;

