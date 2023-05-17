import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { baseUrl } from "../shared";
import AddCostumer from "../components/AddCostumer";
import { LoginContext } from "../App";

const Customers = () => {
    const [loggedIn, setLoggedIn] = useContext(LoginContext)
    const [customers, setCustomers] = useState([])
    const [show, setShow] = useState(false)

    const navigate = useNavigate();
    const location = useLocation();

    function toggleShow() {
        setShow(!show)
    }

    useEffect(() => {
        const url = baseUrl + 'api/customers/';
        fetch(url, {
            headers: {
                'Content-Type': 'Application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access')
            }
        })
            .then((response) => {
                if (response.status === 401) {
                    setLoggedIn(false)
                    navigate('/login', {
                        state: {
                            previousUrl: location.pathname
                        }
                    })
                }
                return response.json()
            })
            .then((data) => {
                setCustomers(data.customers);
            })
    }, [])

    function addCostumer(name, industry) {
        const data = {name: name, industry: industry}
        const url = baseUrl + 'api/customers/';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Something went wrong')
            }
            return response.json();
        }).then((data) => {
            toggleShow();
            setCustomers([...customers, data.customer])
        }).catch((e) => {
            console.log(e)
        })
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