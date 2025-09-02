import HeaderNav from "./headerNav";

export default function Header() {
    return (
        <>
            <header>
                <nav className="w-full py-6 sm:py-8 px-8 sm:px-16 lg:px-28 font-semibold flex justify-between">
                    <div className="text-xl sm:text-2xl whitespace-nowrap shrink mr-2 sm:mr-0">
                        <a href="/">Clinic Management System</a>
                    </div>
                    <ul className="w-1/6 py-1 px-6 flex justify-between">
                        <HeaderNav />
                        <li>
                            <a href="https://www.tigerxinsights.com/contact" target="_blank">Contact</a>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
};