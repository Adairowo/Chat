function Navbar() {
    return (
        <div className="navbar bg-base-100 shadow-sm relative sticky top-0 z-50">

            {/* TÍTULO CENTRADO */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
                <a className="btn btn-ghost text-2xl font-bold">CatChat</a>
            </div>
            <details className="dropdown flex-none md:hidden">
                <summary className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path> </svg>
                </summary>
                <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-sm bg-base-100 rounded-box w-52">
                    <li>
                        <a className="btn btn-ghost">About Us</a>
                    </li>
                    <li>
                        <a className="btn btn-ghost">Screenshots</a>
                    </li>
                </ul>
            </details>

            <div className="flex-none hidden md:flex">
                <a href="#" className="btn btn-ghost">
                    <p className="text-base-content">About Us</p>
                </a>
                <a href="#" className="btn btn-ghost">
                    <p className="text-base-content">Screenshots</p>
                </a>
            </div>
        </div>
    );
}

export default Navbar;

