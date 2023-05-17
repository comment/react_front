import './index.css'
import Employyes from "./pages/Employyes";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Customers from "./pages/Customers";
import Dictionary from "./pages/Dictionary";
import Definition from "./pages/Definition";
import NotFound from "./components/NotFound";
import Customer from "./pages/Customer";
import Login from "./pages/Login";
import { createContext, useState } from "react";

export const LoginContext = createContext();

function App() {
    const [loggedIn, setLoggedIn] = useState(localStorage.access ? true : false);

    function changeLoggedIn(value){
        setLoggedIn(value)
        if(value === false){
            localStorage.clear()
        }
    }

    return (
        <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
            <BrowserRouter>
                <Header>
                    <Routes>
                        <Route path='/employees' element={<Employyes/>}/>
                        <Route path='/dictionary' element={<Dictionary/>}/>
                        <Route path='/dictionary/:search' element={<Definition/>}/>
                        <Route path='/customers' element={<Customers/>}/>
                        <Route path='/customer/:id' element={<Customer/>}/>
                        <Route path='/login/' element={<Login/>}/>
                        <Route path='/404' element={<NotFound/>}/>
                        <Route path='*' element={<NotFound/>}/>
                    </Routes>
                </Header>
            </BrowserRouter>
        </LoginContext.Provider>
    )
}

export default App;
