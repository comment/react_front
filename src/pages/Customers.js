import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { baseUrl } from "../shared";
import AddCostumer from "../components/AddCostumer";
import { LoginContext } from "../App";
import useFetch from "../hooks/UseFetch";

const Customers = () => {
    const [loggedIn, setLoggedIn] = useContext(LoginContext)
    //const [customers, setCustomers] = useState([])
    const [show, setShow] = useState(false)

    const navigate = useNavigate();
    const location = useLocation();
    const url = baseUrl + 'api/customers/';

    function toggleShow() {
        setShow(!show)
    }

    const {request, appendData, data: {customers} = {}, errorStatus} = useFetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'Application/json',
            Authorization: 'Bearer ' + localStorage.getItem('access')
        }
    })

    useEffect(() => {
        request()
    }, [])

    function addCostumer(name, industry) {
        appendData({name: name, industry: industry});

        if(!errorStatus){
            toggleShow();
        }
    }

    return (
        <div>
            <h1>Customers from api</h1>
            <ul>
                {customers ? customers.map((customer) => {
                    return <li key={customer.id}>
                        <Link to={'/customer/' + customer.id}>{customer.name}</Link>
                    </li>
                }) : null}
            </ul>
            <center><AddCostumer addCostumer={addCostumer} show={show} toggleShow={toggleShow}/></center>
        </div>
    );
};

export default Customers;