import React, { useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../shared";

const Customer = () => {

    let {id} = useParams();
    const [customer, setCustomer] = useState([]);
    const [notFound, setNotFound] = useState([]);
    const [error, setError] = useState([]);
    let navigate = useNavigate();


    useEffect(() => {
        const url = baseUrl + 'api/customers/' + id;
        fetch(url)
            .then((response) => {
                if (response.status === 404) {
                    setNotFound(true)
                } else if (response.status === 401) {
                    navigate('/login')
                } else if (response.status === 500) {
                    setError(true)
                }

                if (!response.ok) {
                    setError(true)
                    throw new Error('Something went wrong')
                }

                return response.json()
            })
            .then((data) => {
                setCustomer(data.customer);
            }).catch((e) => {
            console.log(e.message)
        })
    }, []);

    if (notFound === true) {
        return (
            <>
                <p>The customer with id #{id} nor found</p>
                <Link to="/customers">Back</Link>
            </>
        )
    }

    if (error === true) {
        return (
            <>
                <p>Something went wrong, try again</p>
                <Link to="/customers">Back</Link>
            </>
        )
    }

    return (
        <div>
            {customer ?
                <div>
                    <p>{customer.id}</p>
                    <p>{customer.name}</p>
                    <p>{customer.industry}</p>
                </div>
            : null}
            <button onClick={(e) => {
                const url = baseUrl + 'api/customers/' + id;
                console.log(url)
                fetch(url, {method: 'DELETE', headers: {
                        'Content-Type': 'application/json'
                    }})
                    .then((response) => {
                        if(!response.ok){
                            throw new Error('Something went wrong')
                        }
                        navigate('/customers')
                    }). catch((e) => {
                    console.log(e)
                })
            }}>Delete</button>
            <br/>
            <Link to={'/customers'}>Go back</Link>
        </div>
    );
};

export default Customer;