import { useState } from 'react';
import ProfileConfig from '../../components/user/profileconfig';
import SendMessageModal from '../../components/user/friendmodal';
import ConfigModal from '../../components/user/config';
import FriendList from '../../components/user/friendlist';
import FriendRequest from '../../components/user/friendrequest';
import ChatItem from '../../components/user/chatitem';

function Chat() {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isFriendModalOpen, setIsFriendModalOpen] = useState(false);
    const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
    const [isFriendsView, setIsFriendsView] = useState(true);

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

    const toggleFriendsView = () => {
        setIsFriendsView(!isFriendsView);
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
                        <ul className="menu bg-base-200 lg:menu-horizontal rounded-box">
                            <li>
                                <a onClick={() => setIsFriendsView(true)} className={isFriendsView ? 'active' : ''}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
                                        <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                                    </svg>
                                    Amigos
                                </a>
                            </li>
                            <li>
                                <a onClick={() => setIsFriendsView(false)} className={!isFriendsView ? 'active' : ''}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
                                    </svg>
                                    Solicitudes de amistad
                                </a>
                            </li>
                        </ul>
                        {/* Aqui se muestra la seccion de amigos y solicitudes de amistad alternando entre las dos*/}
                        <div className="p-4">
                            {isFriendsView ? (
                                <FriendList onSwitch={toggleFriendsView} />
                            ) : (
                                <FriendRequest onSwitch={toggleFriendsView} />
                            )}
                        </div>
                    </div>
                </div>

                <div className="drawer-side is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64 w-64">
                        {/* Sidebar content here */}
                        <ul className="menu w-full mt-6">
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
                                    <span className="is-drawer-close:hidden">Agregar amigo</span>
                                </button>
                            </li>
                        </ul>

                        <div className="divider my-0 mt-2 is-drawer-close:hidden">Mensajes</div>

                        {/* Scrollable chat list */}
                        <div className="w-full flex-1 overflow-y-auto">
                            <ul className="menu w-full">
                                {/* Ejemplo de amigos - Aquí puedes mapear tus datos reales */}
                                <ChatItem
                                    userId="1"
                                    userName="Juan Pérez"
                                    avatarUrl=""
                                    isActive={true}
                                    onClick={() => console.log('Chat con Juan')}
                                />
                                <ChatItem
                                    userId="2"
                                    userName="María García"
                                    avatarUrl=""
                                    onClick={() => console.log('Chat con María')}
                                />
                                <ChatItem
                                    userId="3"
                                    userName="Carlos López"
                                    avatarUrl=""
                                    onClick={() => console.log('Chat con Carlos')}
                                />
                                <ChatItem
                                    userId="4"
                                    userName="Ana Martínez"
                                    avatarUrl=""
                                    onClick={() => console.log('Chat con Ana')}
                                />
                                <ChatItem
                                    userId="5"
                                    userName="Pedro Sánchez"
                                    avatarUrl=""
                                    onClick={() => console.log('Chat con Pedro')}
                                />
                                <ChatItem
                                    userId="6"
                                    userName="Laura Rodríguez"
                                    avatarUrl=""
                                    onClick={() => console.log('Chat con Laura')}
                                />
                                <ChatItem
                                    userId="7"
                                    userName="Miguel Torres"
                                    avatarUrl=""
                                    onClick={() => console.log('Chat con Miguel')}
                                />
                                <ChatItem
                                    userId="8"
                                    userName="Sofia Ramírez"
                                    avatarUrl=""
                                    onClick={() => console.log('Chat con Sofia')}
                                />
                            </ul>
                        </div>
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
