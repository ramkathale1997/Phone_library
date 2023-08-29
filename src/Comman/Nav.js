import React from 'react';
import AddUser from "../Components/AddUser";
import GetUser from '../Components/GetUser';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function Nav() {
  return (
    <div>
      <BrowserRouter>
        <Routes >
          <Route path='user'>
            <Route to={"user"}>User Details</Route>
            <Route index Component={GetUser}></Route>
            <Route path='addUser' Component={AddUser}></Route>
            <Route path='getUser' Component={GetUser}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Nav

