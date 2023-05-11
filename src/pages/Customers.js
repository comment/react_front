import React from 'react';
import {useState, useEffect} from "react";

const Customers = () => {

    const [customers, setCustomers] = useState([])

    useEffect(() => {
        console.log('fetching...');
            fetch('http://localhost:8000/api/customers/')
            .then((response) => response.json())
            .then((data) => {
                setCustomers(data.customers);
                console.log(data);
            })
    }, [])

    return (
        <div>
            <h1>Customers from api</h1>
            {customers ? customers.map((customer) => {
                return <p>{customer.name}</p>
            }) : null}
        </div>
    );
};

export default Customers;