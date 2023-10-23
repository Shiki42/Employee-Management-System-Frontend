/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import {UserState} from '../../interfaces/UserState.interface'
import { Link, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { Menu, Dropdown, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import { logOutUser } from '../../app/userSlice';
import { RootState } from '../../app/store';
const navbarStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', // Align items to the left and right
  };

const Navbar = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const navigate = useNavigate();
  const user = useSelector((state:RootState) => state.user);
  const handleLogout = () => { 
    dispatch(logOutUser(null));
    navigate('/');
  }
  const menuForEmployee = (
    <Menu mode='horizontal'>
      <Menu.Item onClick={() => navigate('/profile')}>
        Personal Information
      </Menu.Item>
      <Menu.Item onClick={() => navigate('/visa-status')}>
        Visa Status Management
      </Menu.Item>
      <Menu.Item onClick={() => {handleLogout()}}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const menuForHR = (
    <Menu mode='horizontal'>
      <Menu.Item onClick={() => navigate('/home')}>
        Home
      </Menu.Item>
      <Menu.Item onClick={() => navigate('/employee-profiles')}>
        Employee Profiles
      </Menu.Item>
      <Menu.Item onClick={() => navigate('/visa-status')}>
        Visa Status Management
      </Menu.Item>
      <Menu.Item onClick={() => navigate('/hiring-management')}>
        Hiring Management
      </Menu.Item>
      <Menu.Item onClick={() => {handleLogout()}}>
        Logout
      </Menu.Item>
    </Menu>
  );

  if (!user.isAuthenticated) {
    return(
        <nav className="navbar" style={navbarStyles}>
      <Link to="/" className="logo">
        {/* Replace TITLE with your actual title */}
        Management
      </Link>
      </nav>);
  }

  const menu = user.role === 'employee' ? menuForEmployee : menuForHR;

  return (
    <nav className="navbar" style={navbarStyles}>
      <Link to="/" className="logo">
        {/* Replace TITLE with your actual title */}
        Management
      </Link>
      {isMobile ? (
        <Dropdown overlay={menu} trigger={['click']}>
          <Button shape="circle" icon={<MenuOutlined />} />
        </Dropdown>
      ) : (
        <>
          {/* Render menu items directly */}
          {menu}
        </>
      )}
    </nav>
  );
};

export default Navbar;
