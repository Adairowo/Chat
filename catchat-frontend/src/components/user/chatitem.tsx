interface ChatItemProps {
    userId: string;
    userName: string;
    avatarUrl?: string;
    isActive?: boolean;
    onClick?: () => void;
}

function ChatItem({ userId: _userId, userName, avatarUrl, isActive = false, onClick }: ChatItemProps) {
    return (
        <li>
            <button
                className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? 'active' : ''}`}
                data-tip={userName}
                onClick={onClick}
            >
                <div className="avatar">
                    <div className="w-8 rounded-full">
                        {avatarUrl ? (
                            <img src={avatarUrl} alt={userName} />
                        ) : (
                            <div className="bg-neutral text-neutral-content flex items-center justify-center w-full h-full">
                                <span className="text-sm font-semibold">
                                    {userName.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                <span className="is-drawer-close:hidden">{userName}</span>
            </button>
        </li>
    );
}

export default ChatItem;
