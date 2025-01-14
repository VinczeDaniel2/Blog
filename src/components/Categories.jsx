import React from 'react'
import { useContext } from 'react'
import { CategContext } from '../context/CategContext'
import { pink } from '@mui/material/colors';
import { useState } from 'react';
import { useEffect } from 'react';
import { readPosts } from '../utility/crudUtility';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


export const Categories = ({ctg,selCateg,setSelCateg}) => {

    const handleChange=(event)=>{
        const {value,checked} = event.target
        setSelCateg(prev=> checked ? [...prev,value] : prev.filter(categ=>categ!=value))
    }
  return (
    <div>
        <FormGroup>
            <FormControlLabel  onChange={handleChange} control={<Checkbox value={ctg} defaultChecked={selCateg.includes(ctg)} />} label={ctg} />
        </FormGroup>
  </div>
  )
}


