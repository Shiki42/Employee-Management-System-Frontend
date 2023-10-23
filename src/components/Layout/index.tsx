/* eslint-disable @typescript-eslint/no-unused-vars */
import styles from './Layout.module.css';

import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
const { Header, Footer, Content } = Layout;
import { Space } from 'antd';
import { YoutubeOutlined, TwitterOutlined, FacebookOutlined } from '@ant-design/icons';

import Navbar from '../Navbar';
import {useState} from 'react';
//import { SearchProvider } from '../../hooks/useSearchContext';
//import Searchbar from '../Searchbar';

// const containerStyle = {
//     height: "100vh",
// };

// const headerStyle = {
//     textAlign: 'center',
//     color: '#fff',
//     height: 64,
//     paddingInline: 50,
//     lineHeight: '64px',
//     backgroundColor: '#121826',
// };

const contentStyle = {
    margin: '24px 16px',
    minHeight: 120,
    padding:'0px'

};
  
const footerStyle:React.CSSProperties = {
    textAlign: 'center',
    color: '#bbb',
    backgroundColor: '#121826',
    display: 'flex',
    justifyContent: 'space-between',
};


export default function MainLayout() {

    return (
        // <SearchProvider>
        // {/* <Layout style={containerStyle}> */}
        <Layout>
            <Header className={styles.headerStyle}>
                <Navbar/>
                {/* <Searchbar/> */}
            </Header>
            <Content style={contentStyle}>
                <Outlet />
            </Content>
            <Footer style={footerStyle}>
                <Space>
                    <span>©2023 All Rights Reserved.</span>
                </Space>
                <Space style={{ color: '#fff', fontSize: '16px' }}>
                    <YoutubeOutlined />
                    <TwitterOutlined />
                    <FacebookOutlined />
                </Space>
                <Space>
                    <span>Contact Us</span>&nbsp;&nbsp;
                    <span>Privacy Policies</span>&nbsp;&nbsp;
                    <span>Help</span>
                </Space>
            </Footer>
        </Layout>

    //   </SearchProvider>
    );
}