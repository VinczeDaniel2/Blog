import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { TERipple } from 'tw-elements-react';
import { readPosts } from '../utility/crudUtility';
import { Categories } from '../components/Categories';
import { useContext } from 'react';
import { CategContext } from '../context/CategContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SearchBox } from '../components/SearchBox';


export const Posts = () => {
  const navigate = useNavigate()
  const [searchParams]=useSearchParams()
  const [posts,setPosts] = useState([])
  const {categories} = useContext(CategContext)
  const [selCateg,setSelCateg] = useState(searchParams.get('ctg') ? [searchParams.get('ctg')] : [])
  console.log(searchParams.get('ctg'));
  
  console.log(selCateg);
  

  console.log(posts);
  useEffect(()=>{
    readPosts(setPosts,selCateg)
  },[selCateg])
  posts.length>0 && console.log(posts);
  
  return (
    <div className='page'>
      <div className='flex justify-center'>
      <div className='pt-[100px] flex flex-col'>
        <div className='flex flex-row text-white'>
          {categories && categories.map(obj=>
          <Categories value={obj.name} selCateg={selCateg} setSelCateg={setSelCateg} ctg={obj.name}/>
          )}
        </div>
        <div>
          {posts && <SearchBox items={posts.map(obj=>({id:obj.id,name:obj.title}))}/>}
        </div>
        
      </div>
      
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-content-center px-4">
  {posts?.length > 0 && posts.map((obj) => (
    <div className="mt-20">
      <div
        onClick={() => navigate('/detail/' + obj.id)}
        className="block rounded-lg bg-white shadow-lg dark:bg-neutral-700"
        style={{ width: '300px', height: '400px' }}
      >
        <div className="relative overflow-hidden bg-cover bg-no-repeat" style={{ height: '200px' }}>
          <img
            className="rounded-t-lg object-cover w-full h-full"
            src={obj.photo.url}
            alt={obj.title}
          />
          <a href="#!">
            <div className="absolute inset-0 h-full w-full bg-[hsla(0,0%,98%,0.15)] opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
          </a>
        </div>
        <div className="p-4">
          <h5
            className="mb-2 text-lg font-medium text-neutral-800 dark:text-neutral-50">
            Author: {obj.author}
          </h5>
          <p className="mb-3 text-sm text-neutral-600 dark:text-neutral-200">
            {obj.title}
          </p>
          <TERipple>
            <button
              type="button"
              className="inline-block w-full rounded bg-primary px-4 py-2 text-xs font-medium text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:outline-none">
              {obj.category}
            </button>
          </TERipple>
        </div>
      </div>
    </div>
  ))}
</div>
    
    </div>
  )
}