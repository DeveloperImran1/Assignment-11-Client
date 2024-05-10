import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import UserProfile from "../pages/Profile/UserProfile";
import Rooms from "../pages/Rooms/Rooms";
import RoomDetails from "../pages/Rooms/RoomDetails";
import MyBooking from "../pages/MyBooking/MyBooking";
import Reviews from "../pages/Reviews/Reviews";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/userProfile",
                element: <UserProfile></UserProfile>
            },
            {
                path: "/rooms",
                element: <Rooms></Rooms>
            },
            {
                path: "/rooms/:id",
                element: <RoomDetails></RoomDetails>
            },
            {
                path: "/myBooking",
                element: <MyBooking></MyBooking>
            },
            {
                path: "/userReview",
                element: <Reviews></Reviews>
            },
        ]
    },
]);

export default router;