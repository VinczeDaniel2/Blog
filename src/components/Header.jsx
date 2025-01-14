import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap'
import { FaBlog } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { extractUrlAndId } from '../utility/utils';
import { useEffect } from 'react';

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {user,logOutUser}=useContext(UserContext)
    const [avatar,setAvatar] = useState(null)

    useEffect(()=>{
      user?.photoURL && setAvatar(extractUrlAndId(user.photoURL).url)
      !user && setAvatar(null)
    },[user,user?.photoURL])

    console.log(user);
    
    

    const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      
  <div>
    <Navbar fixed='top' dark expand="md" style={{borderBottom:'1px solid gray', backgroundColor:'#852af5'}}>
      <NavbarBrand href="/"><FaBlog/></NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink className='nav-link' to='/'>Főoldal</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className='nav-link' to='/posts'>
                Posztok
            </NavLink>
          </NavItem>
          {user &&
          
          <NavItem>
            <NavLink className='nav-link' to='/create'>
                Új bejegyzés
            </NavLink>
          </NavItem>
          }
        </Nav>

        <Nav navbar>
          { !user ? 
          <>
            <NavItem>
                <NavLink className='nav-link' to='/auth/in'>Belépés</NavLink>
            </NavItem>
            <NavItem>
                <NavLink className='nav-link' to='/auth/up'>Regisztráció</NavLink>
            </NavItem>
            </>
            :
            <>
            <NavItem>
                <NavLink className='nav-link' to='/'
                  onClick={()=>logOutUser()}
                >Kijelentkezés</NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                   {avatar ? <img className='myavatar' src={avatar} alt="" /> : <RxAvatar title={user.displayName}/>}
                </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>
                <NavLink className='nav-link' style={{color:'black'}} to='/profile'>Személyes adatok</NavLink>
              </DropdownItem>
              <DropdownItem divider />
             
            </DropdownMenu>
          </UncontrolledDropdown>
          </>
}

        </Nav>

      </Collapse>
    </Navbar>
    <Outlet />
  </div>
    </div>
  )
}