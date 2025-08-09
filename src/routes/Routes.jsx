import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Register from "../auth/Register";
import Home from "../pages/Home";
import Login from "../auth/Login";
import ForgetPassword from "../auth/ForgetPassword";
import UserLayout from "../Components/user/UserLayout";
import UserAccount from "../Components/user/UserAccount";
import UpdatePicture from "../Components/user/UpdatePicture";
import UpdateProfile from "../Components/user/UpdateProfile";
import UpdatePassword from "../Components/user/UpdatePassword";
import AdminLayout from "../Components/Admin/AdminLayout";
import AddAlbum from "../Components/Admin/AddAlbum";
import DeleteUser from "../Components/user/DeleteUser";
import AdminDashboard from"../Components/Admin/AdminDashboard"
import Dashboard from "../Components/home/Dashboard";
import AlbumDetails from "../Components/home/AlbumDetails";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminRoutes from "./AdminRoutes";

const routes=createBrowserRouter(
    [
        {
            path:"/",
            element:<Layout/>,
            children:[
                {
                    path:"/",
                    element:<Home/>,
                    children:[{
                        index:true,
                        element:<Dashboard/>
                    },
                    {
                        path:"album-details",
                        element:<AlbumDetails/>
                    }
                    ]
                },
                {
                    path:"auth/login",
                    element:(<PublicRoutes><Login/></PublicRoutes>),
                },
                {
                    path:"auth/register",
                    element:(<PublicRoutes><Register/></PublicRoutes>),
                },
                {
                    path:"auth/forget-password",
                    element:(<PublicRoutes><ForgetPassword/></PublicRoutes>),
                },
                {
                    path:"admin",
                    element:(<ProtectedRoutes><AdminRoutes><AdminLayout/></AdminRoutes></ProtectedRoutes>),
                    children:[{
                        index:true,
                        element:(<ProtectedRoutes><AdminRoutes><AdminDashboard/></AdminRoutes></ProtectedRoutes>)
                    },
                    {
                        path:"add-album",
                        element:(<ProtectedRoutes><AdminRoutes><AddAlbum/></AdminRoutes></ProtectedRoutes>)
                    }]
                },
                {
                    path:"user-profile",
                    element:(<ProtectedRoutes><UserLayout/></ProtectedRoutes>),
                    children:[
                        {
                        index:true,
                        element:(<ProtectedRoutes><UserAccount/></ProtectedRoutes>)
                    },
                
                {
                    path:"update-picture",
                    element:(<ProtectedRoutes><UpdatePicture/></ProtectedRoutes>)
                },
                {
                    path:"update-profile",
                    element:(<ProtectedRoutes><UpdateProfile/></ProtectedRoutes>)
                },
                {
                    path:"update-password",
                    element:(<ProtectedRoutes><UpdatePassword/></ProtectedRoutes>)
                },
                {
                    path:"delete-user",
                    element:(<ProtectedRoutes><DeleteUser/></ProtectedRoutes>)
                },
            ]
        }
            
            ]
            
        }
    ]
)

export default routes 