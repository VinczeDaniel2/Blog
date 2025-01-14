import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Home } from './Home'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BounceLoader } from 'react-spinners'
import { Story } from '../components/Story'
import { uploadFile } from '../utility/uploadFile.'
import { addPost, readPost,updatePost } from '../utility/crudUtility'
import { CategContext } from '../context/CategContext'
import { CategDropdown } from '../components/CategDropdown'
import { Alerts } from '../components/Alerts'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const AddEditPost = () => {
  const {categories} = useContext(CategContext)
  const {user}=useContext(UserContext)
  const [loading,setLoading] = useState(false)
  const [uploaded,setUploaded] = useState(false)
  const [photo,setPhoto] = useState(null)
  const [story,setStory] = useState(null)
  const [selCateg,setSelCateg]=useState(null)
  //az editáláshoz kell
  const [post,setPost] = useState(null)
  const params = useParams()
  console.log(params.id);
  

  useEffect(()=>{
    if(params?.id)readPost(params.id,setPost)
  },[params?.id])

  console.log(post);
  useEffect(()=>{
    if(post){
      setValue("title",post.title)
      setSelCateg(post.category)
      setStory(post.story)
    }
  },[post])


  const { register,handleSubmit,formState: { errors },reset,setValue} = useForm()
  const onSubmit = async (data)=>{
    if(params.id){
      console.log("update");
      
      //update
      try {
        updatePost(params.id,{...data,category:selCateg,story})
      } catch (error) {
        console.log('update',error);
        
      }finally{
        setLoading(false)
      }
      
    }else{
      //insert

    
    let newPostData={
      ...data,
      story,
      author:user.displayName,
      userId:user.uid,
      category:selCateg,
      likes:[]
    }
    console.log(data.file[0]);
    
    setLoading(true)
   
    
    try {
      const file = data?.file ? data?.file[0] : null
      const {url,id} = file ? await uploadFile(file) : null
      delete newPostData.file
      newPostData = {...newPostData,photo:{url,id}} 
      console.log(newPostData);
      addPost(newPostData)
      setUploaded(true)
      reset()
      setPhoto(null)
      setStory(null)
      //updateCredentials(data.displayName,url+'/'+id)

    } catch (error) {
      console.log(error);

      
    }finally{
      setLoading(false)
    }
    
  }
}
  console.log(story);
  
  
  if(!user) return <Home/>
  return (
    <div className='page'>
    <div className='flex justify-center'>
    <div className='mt-40 max-w-[700px] block rounded-lg bg-sky-100 shadow-secondary-1 dark:bg-surface-dark'>
      <form onSubmit={handleSubmit(onSubmit)}>
          <div className='text-2xl text-center'><label >A bejegyzés címe:</label>
            <input {...register('title',{required:true})} type='text'/>
            <p className='text-danger'>{errors?.title && 'A cím megadása kötelező!'}</p>
          </div>
          <CategDropdown categories={categories} setSelCateg={setSelCateg} selCateg={selCateg}/>

          <Story setStory={setStory} uploaded={uploaded} story={story}/>

          <input type="file" {...register("file",{
            required:!params.id,
            validate:(value)=>{
              if(!value[0]) return true
              console.log(value[0]);
              const fileExtension=value[0]?.name.split('.').pop().toLowerCase()
              console.log(fileExtension);
              
              const acceptedFormates=['jpg','png']
              if(!acceptedFormates.includes(fileExtension)) return 'Invalid file format!'
              if(value[0].size>1*1000*1024) return 'Az engedélyezett fájl mérete 1MB'
              return true

            }
          })} 
          onChange={(e)=>setPhoto(URL.createObjectURL(e.target.files[0]))}
          />
          
          <p className='text-danger'>{errors?.file?.message}</p> 
          <p className='text-danger'>{errors?.file && 'Fotó feltöltése kötelező'}</p>
          <input disabled={!selCateg || !story || story?.length<10} type="submit" />
        </form>
        {loading && <BounceLoader />}
        {uploaded && <Alerts txt='Sikeres feltöltés'/>}
        <img src={post?.photo?.url ? post.photo.url : photo} className='img-thumbnail'/>
    </div>
    </div>
    </div>
  )
}
