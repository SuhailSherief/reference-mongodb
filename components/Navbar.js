import Link from "next/link";

export const Navbar = () => {
    return (
        <nav className="navbar">
            <Link href="/">
                <a className="navbar-brand">Notes App</a>
            </Link>
            <Link href="/newNote">
                <a className="create">Create Note</a>
            </Link>
        </nav>
    )
}

export default Navbar