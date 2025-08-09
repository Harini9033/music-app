
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContextAPI } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import Spinner from '../../helpers/Spinner';
import { updateProfile } from 'firebase/auth';

const UpdatePicture = () => {
  let [picture,setPicture]=useState(null)
  let [preview,setPreview]=useState(null);
  let {authUser}=useContext(AuthContextAPI);
  let navigate=useNavigate();
  let [isLoading,setIsLoading]=useState(false)

  const handleChange=(e)=>{
// console.dir(e.target.files[0])
  let file=e.target.files[0]
  setPicture(file)

  if(file){
    let url=URL.createObjectURL(file)
    console.log(url)
    setPreview(url)
  }
 }
  const handleSubmit=async(e)=>{
  e.preventDefault()
  setIsLoading(true)
  try{
if(!picture){
  toast.error("Select a Photo");
  return;
}
else{
  const data=new FormData()
  data.append("file",picture) 
  data.append("upload_preset","Innovators hub music")

   let response=await fetch("https://api.cloudinary.com/v1_1/dcuz1ejrh/image/upload",{
    method:"POST",
    body:data
  })
  let result=await response.json()
  console.log(result)


  await updateProfile(authUser, {
    photoURL: result.url
  });
  toast.success("Photo Updated")
  navigate("/user-profile")
}
  }
  catch(error){
toast.error(error.message)
  }finally{
    setIsLoading(false)
  }
  }
  return (
    <section className='h-[100%] w-[100%] flex items-center justify-center '>
      <article className='min-h-[300px] w-[40%] bg-slate-900 rounded-xl p-4 ' >
      <h2 className='text-center text-2xl'>Upload Profile Picture</h2>
      <form className='flex flex-col gap-4 mt-4' onSubmit={handleSubmit}>
        <div className='w-32 h-32 m-auto bg-gray-700 rounded-full'>
          {preview ?<img src={preview} className='h-[100%] w-[100%] rounded-full '/>:<div className='h-[100%] w-[100%] rounded-full flex items-center justify-center'>No File Selected</div>}
        </div>
        <label htmlFor='picture' className='block w-[100%] py-2 text-center rounded-lg border-2 border-dotted' >Select a Photo</label>
        <input type="file" id="picture" className='hidden'accept='image/*'onChange={handleChange} name="picture"/>
        <button className='py-2 bg-blue-800 cursor-pointer hover:bg-blue-600 rounded-lg'>Uplaoad Image</button>
      </form>
      </article>
      {isLoading && <Spinner/>}
      </section>
  )
}

export default UpdatePicture
