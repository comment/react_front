import React from 'react';
import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../shared";

const Customers = () => {

    const [customers, setCustomers] = useState([])

    useEffect(() => {
        const url = baseUrl + 'api/customers/';
            fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setCustomers(data.customers);
            })
    })

    return (
        <div>
            <h1>Customers from api</h1>
            {customers ? customers.map((customer) => {
                return <p key={customer.id}>
                    <Link to={'/customer/' + customer.id}>{customer.name}</Link>
                </p>
            }) : null}
        </div>
    );
};

export default Customers;