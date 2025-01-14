import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { deletePost, readPost, toggleLike } from '../utility/crudUtility';
import parse from 'html-react-parser';
import { MdDeleteForever } from "react-icons/md";
import { useConfirm } from 'material-ui-confirm';
import { delPhoto } from '../utility/uploadFile.';
import { button } from '@material-tailwind/react';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import { Alerts } from '../components/Alerts';

export const DetailPost = () => {
  const {user} = useContext(UserContext)
    const [post,setPost] = useState(null)
    const [txt,setTxt] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
    const confirm = useConfirm()
    console.log(params.id);


    useEffect(()=>{
        readPost(params.id,setPost)
    },[])

    const handleDelete = async ()=>{
      try {
        await confirm({
          description:"Ez egy visszavonhatatlan művelet!",
          confirmationText:"Igen",
          cancellationText:"Mégsem",
          title:"Biztosan ki szeretnéd törölni a bejegyzést?"
        })
        deletePost(post.id)
        delPhoto(post.photo.id)
        navigate('/posts')
      } catch (error) {
        console.log(error);
        
      }
    }

    post && console.log(post);

    const handleLikes =()=>{
      if(!user) setTxt("Csak bejelentkezett felhasználók likeolhatnak!")
      else{
        toggleLike(user.uid,post.id) 
      } 

    }
    
  return (
    <div class="page flex justify-center items-center">
    <div
      class="block max-w-[500px] rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark">
      {post && 
        <div>
        <img style={{maxWidth:"500px"}}
          class="rounded-t-lg "
          src={post.photo['url']}
          alt={post.title} />
        <h5 class="mb-2 text-xl font-medium leading-tight">{parse(post.story)}</h5>
      </div>
      }
      <div class="p-6 text-surface dark:text-white">
        <div class="flex flex-col justify-center">
        <p class="mb-4 text-base">
          
        </p>
      
        <button onClick={()=>navigate('/posts')}
          type="button"
          class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
          data-twe-ripple-init
          data-twe-ripple-color="light">
          Vissza
        </button>
        <div>
          <button onClick={handleLikes}>👍</button>
          {post && <span>likes nr.:{post?.likes.length}</span>}
        </div>
        {user && post && (user.uid==post.userId) && 
        <div class="flex flex-row justify-between items-end">
            <button className='text-5xl text-red-600' onClick={handleDelete}><MdDeleteForever /></button>
            <button class="text-4xl" onClick={()=>navigate('/update/'+post.id)}>📝</button>
        </div>
        
        }
        <div >
              {txt && <Alerts txt = {txt} err = {false}/>}
        </div>
        </div>
      </div>
    </div>
    </div>
  )
}