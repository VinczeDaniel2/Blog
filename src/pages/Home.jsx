import React from 'react'
import { useContext } from 'react'
import { CategContext } from '../context/CategContext'
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap'
import { NavLink } from 'react-router-dom'

export const Home = () => {
  const {categories} = useContext(CategContext)
  console.log(categories);
  
  return (
    <div className='page'>
  <div className='flex flex-wrap gap-4 place-content-center px-4'>
    <div className='pt-[100px] flex flex-wrap gap-4'>
      {categories && categories.map(obj => (
        <div key={obj.name} className=''>
          <Card style={{ width: '22rem', maxHeight:' 500px' }}>
            <img 
              style={{maxHeight:'200px',minHeight:'200px'}} className='transition-all duration-300 blur-sm hover:blur-none rounded-t-lg' 
              alt="Sample" 
              src={obj.photoUrl} 
            />
            <CardBody>
              <NavLink className='text-center no-underline text-black' to={'/posts?ctg=' + obj.name}>
                <CardTitle className='text-2xl' tag="h5">
                  {obj.name}
                </CardTitle>
              </NavLink>
            </CardBody>
          </Card>
        </div>
      ))}
    </div>
  </div>
</div>
  )
}
