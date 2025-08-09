import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import {AuthContextAPI} from '../context/AuthContext'

const PublicRoutes = (props) => {
  let {authUser}=useContext(AuthContextAPI)
  if(authUser){
    return <Navigate to="/"/>
  }else{
    return props.children
  }
}

export default PublicRoutes
