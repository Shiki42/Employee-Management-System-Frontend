/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useState } from "react";
import { useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Input, Space } from 'antd';
import { MenuOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { logOutUser } from '../../app/userSlice';
// import { useSearch } from '../../hooks/useSearchContext';

import RightMenu from './RightMenu';
import PropTypes from 'prop-types';
const { Search } = Input;
import './style.css';

const TITLE = 'Management';

const onSearch = (value, _e, info) => console.log(info?.source, value);

const Navbar = ({handleCartModalOpen}) => {    
    // const { searchText, setSearchText } = useSearch();
    const  totalPrice  = useSelector(state => state.cart.totalPrice);
    const { user, isAuthenticated } = useSelector(state => state.user);
    const dispatch = useDispatch();

    // const handleSearchChange = (value) => {
    //     setSearchText(value);
    //   };

    return (
        <>
        <nav className="navbar">
            <Link to="/" className="logo">
            {TITLE}
            </Link>
            <div className="mobile-no-display searchbar">
            {/* <Search placeholder="" onSearch={handleSearchChange} style={{ width: 200 }} /> */}
            </div>

            <Space style={{ fontSize: '16px' }}>

                <div className="user-container">
                    <RightMenu mode="horizontal" className="mobile-style" />
                    <div>
                        <div className="mobile-no-display">
                        {isAuthenticated ? (
                            <div key="log-out" className="logout" onClick={() => dispatch(logOutUser())} >
                                Log out
                            </div>):(
                            <div key="sign-in">
                                <Link to="signin">Log in</Link>
                            </div> )}
                        </div>
                    </div>
                </div>
                {/* <div className="mobile-flex" onClick={handleCartModalOpen}>

                    <ShoppingCartOutlined  />
                    <span>${totalPrice.toFixed(2)}</span>
                </div>   */}
            </Space>

        </nav>


        </>
    );
}


export default Navbar;