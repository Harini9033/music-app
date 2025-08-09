import { useContext } from "react"
import { AuthContextAPI } from "../context/AuthContext"


const ProtectedRoutes = (props) => {
  let {authUser}=useContext(AuthContextAPI)
    if(authUser){
        return props.children
    }else{
        return <Navigate to="/auth/login"/>
    }
}

export default ProtectedRoutes
