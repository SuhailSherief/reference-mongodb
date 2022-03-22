import Head from "next/head";
import Navbar from "./Navbar";

export const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>Notes App</title>
            </Head>
            <Navbar />
            {children}
        </>
    )
}

export default Layout;
