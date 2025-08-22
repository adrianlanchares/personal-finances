import Header from "./Header";
// import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function App() {
    return (<>
        <Header />
        <div className="page">
            <Outlet />
        </div>
        {/* <Footer /> */}
    </>);
}