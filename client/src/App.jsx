import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { CreateTrip } from './pages/CreateTrip';
import { JoinTrip } from './pages/JoinTrip';
import { TripDetails } from './pages/TripDetails';

function App () {
    return ( 
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/dashboard' element={<Dashboard/>}/>
                    <Route path='/create-trip' element={<CreateTrip/>}/>
                    <Route path='/join-trip' element={<JoinTrip/>}/> 
                    <Route path='/trips/:id' element={<TripDetails/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
