import { Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar/Navbar";
import Footer from "../pages/Footer/Footer";

const Main = () => {
    return (
        <div>
            <div className="w-full lg:max-w-[95%] mx-auto" >
                <Navbar></Navbar>
                <div className="min-h-[calc(100vh-366px)] py-[50px] " >
                    <Outlet></Outlet>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;