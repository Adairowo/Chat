import { useState } from 'react';
import ProfileConfig from '../../components/user/profileconfig';
import SendMessageModal from '../../components/user/friendmodal';
import ConfigModal from '../../components/user/config';

function Chat() {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isFriendModalOpen, setIsFriendModalOpen] = useState(false);
    const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);

    const handleOpenProfileModal = () => {
        setIsProfileModalOpen(true);
    };

    const handleCloseProfileModal = () => {
        setIsProfileModalOpen(false);
    };

    const handleOpenFriendModal = () => {
        setIsFriendModalOpen(true);
    };

    const handleCloseFriendModal = () => {
        setIsFriendModalOpen(false);
    };

    const handleOpenConfigModal = () => {
        setIsConfigModalOpen(true);
    };

    const handleCloseConfigModal = () => {
        setIsConfigModalOpen(false);
    };

    return (
        <>
            <div className="drawer lg:drawer-open h-screen">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Navbar */}
                    <nav className="navbar w-full bg-base-300">
                        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            {/* Sidebar toggle icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                        </label>
                        <div className="px-4 font-bold text-2xl">CatChat</div>
                    </nav>
                    {/* Page content here */}
                    <div className="p-4">
                        {/* TODO: Implementar interfaz de chat tipo WhatsApp */}
                        Page Content
                    </div>
                </div>

                <div className="drawer-side is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64 w-64">
                        {/* Sidebar content here */}
                        <ul className="menu w-full grow mt-6">
                            {/* List item */}
                            <li>
                                <button
                                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                    data-tip="Mi perfil"
                                    onClick={handleOpenProfileModal}
                                >
                                    {/* Profile icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                        <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
                                    </svg>
                                    <span className="is-drawer-close:hidden">Mi perfil</span>
                                </button>
                            </li>

                            {/* List item */}
                            <li>
                                <button
                                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                    data-tip="Settings"
                                    onClick={handleOpenConfigModal}
                                >
                                    {/* Settings icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                                    <span className="is-drawer-close:hidden">Opciones</span>
                                </button>
                            </li>
                            {/* List item */}
                            <li>
                                <button
                                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                    data-tip="Mensajes"
                                    onClick={handleOpenFriendModal}
                                >
                                    {/* Settings icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                                    </svg>
                                    <span className="is-drawer-close:hidden">Enviar mensaje a amigo</span>
                                </button>
                            </li>
                            <div className="divider my-0 mt-6">Mensajes</div>

                        </ul>
                    </div>
                </div>
            </div>

            {/* Profile Config Modal */}
            <ProfileConfig
                isOpen={isProfileModalOpen}
                onClose={handleCloseProfileModal}
            />

            {/* Send Message Modal */}
            <SendMessageModal
                isOpen={isFriendModalOpen}
                onClose={handleCloseFriendModal}
            />

            {/* Config Modal */}
            <ConfigModal
                isOpen={isConfigModalOpen}
                onClose={handleCloseConfigModal}
            />
        </>
    );
}

export default Chat;
