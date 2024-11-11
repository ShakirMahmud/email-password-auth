import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

const Main = () => {
    return (
        <div className='w-4/5 mx-auto'>
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;