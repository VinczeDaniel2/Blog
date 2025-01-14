import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext';
import { uploadFile } from '../utility/uploadFile.';
import { Toastify } from '../components/Toastify'
import { BounceLoader } from 'react-spinners';
import { useEffect } from 'react';
import { extractUrlAndId } from '../utility/utils';
import { useConfirm } from 'material-ui-confirm';
import { Home } from './Home';
import { useNavigate } from 'react-router';

export const Profile = () => {
  const {user,updateCredentials,msg,deleteAccount,logOutUser} = useContext(UserContext)
  const [loading,setLoading] = useState(false)
  const [avatar,setAvatar] = useState(null)
  const confirm = useConfirm()
  const navigate = useNavigate()

  useEffect(()=>{
    !user && navigate('/')
  },[user])

  useEffect(()=>{
    user?.photoURL && setAvatar(extractUrlAndId(user.photoURL).url)
  },[user])


  const { register,handleSubmit,formState: { errors },} = useForm({
    defaultValues:{
      displayName:user?.displayName || ''
    }
  });
  const onSubmit = async (data)=>{
    console.log(data.file[0]);
    
    setLoading(true)
    try {
      const file = data?.file ? data?.file[0] : null
      const {url,id} = file ? await uploadFile(file) : null
      
      
      updateCredentials(data.displayName,url+'/'+id)
    } catch (error) {
      console.log(error);

      
    }finally{
      setLoading(false)
    }
    
  }
  const handleDelete=async()=>{
      try {
        await confirm({
          description:"Ez egy visszavonhatatlan művelet!",
          confirmationText:"Igen",
          cancellationText:"Mégsem",
          title:"Biztosan ki szeretnéd törölni a felhasználói fiókodat?"
        })
        await deleteAccount()
        logOutUser()
        navigate('/')
      } catch (error) {
        console.log(error);
        
      }
  }
  return (
  <div className='page' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
  <div className='mt-10' style={{ width: '100%', maxWidth: '500px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
    <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Felhasználói fiók beállítása</h3>
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <div>
        <label>Felhasználónév:</label>
        <input 
          {...register('displayName')} 
          placeholder='felhasználónév' 
          type='text' 
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      <div>
        <input 
          type="file" 
          {...register("file", {
            validate: (value) => {
              if (!value[0]) return true;
              const fileExtension = value[0]?.name.split('.').pop().toLowerCase();
              const acceptedFormates = ['jpg', 'png'];
              if (!acceptedFormates.includes(fileExtension)) return 'Invalid file format!';
              if (value[0].size > 1 * 1000 * 1024) return 'Az engedélyezett fájl mérete 1MB';
              return true;
            }
          })}
          onChange={(e) => setAvatar(URL.createObjectURL(e.target.files[0]))}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <p className='text-danger' style={{ fontSize: '12px', color: 'red' }}>{errors?.file?.message}</p>
      </div>

      <input 
        type="submit" 
        style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      />
    </form>

    {loading && <BounceLoader />}
    {msg && <Toastify {...msg} />}
    {avatar && <img src={avatar} className='img-thumbnail' style={{ marginTop: '15px', maxWidth: '300px', maxHeight: '300px', objectFit: 'cover' }} />}

    <button 
      className="btn btn-danger" 
      onClick={handleDelete} 
      style={{ marginTop: '20px', width: '100%', padding: '10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
    >
      Felhasználói fiók törlése
    </button>
  </div>
  </div>

  )
}