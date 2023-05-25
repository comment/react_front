import React, { useContext,useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../shared";
import { LoginContext } from "../App";

const Customer = () => {
    const [setLoggedIn] = useContext(LoginContext)
    const {id} = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [customer, setCustomer] = useState();
    const [tempCustomer, setTempCustomer] = useState();
    const [notFound, setNotFound] = useState();
    const [error, setError] = useState();
    const [changed, setChanged] = useState(false);


    useEffect(() => {
        if (!customer) return;
        if (!tempCustomer) return;

        let equal = true;
        if (customer.name !== tempCustomer.name) equal = false;

        if (customer.industry !== tempCustomer.industry) equal = false;

        if (equal) setChanged(false)
    }, [customer, tempCustomer])

    useEffect(() => {
        const url = baseUrl + 'api/customers/' + id;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access')
            },
            body: JSON.stringify(tempCustomer)
        })
            .then((response) => {
                if (response.status === 404) {
                    setNotFound(true)
                } else if (response.status === 401) {
                    setLoggedIn(false)
                    navigate('/login', {
                        state: {
                            previousUrl: location.pathname
                        }
                    })
                } else if(response.status === 401){
                    setLoggedIn(false)
                    navigate('/login', {
                        state: {
                            previousUrl: location.pathname
                        }
                    })
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
                setTempCustomer(data.customer);
            }).catch((e) => {
            setError(e.message)
        })
    }, [id, navigate]);

    if (notFound === true) {
        return (
            <>
                <p>The customer with id #{id} nor found</p>
                <Link to="/customers">Back</Link>
            </>
        )
    }

    function updateCustomer(e) {
        e.preventDefault();
        const url = baseUrl + 'api/customers/';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access')
            },
            body: JSON.stringify(tempCustomer)
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
                if (!response.ok) throw new Error('something went wrong')
                return response.json();
            })
            .then((data) => {
                setCustomer(data.customer)
                setChanged(false)
                setError(undefined)
            })
            .catch((e) => {
                setError(e.message)
            })
    }

    return (
        <div>
            {customer ?
                <div className="p-3">
                    <form
                        className="w-full max-w-sm"
                        id="customer"
                        onSubmit={updateCustomer}
                    >
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="name"
                                    type="text"
                                    value={tempCustomer.name}
                                    onChange={(e) => {
                                        setChanged(true)
                                        setTempCustomer({
                                            ...tempCustomer,
                                            name: e.target.value
                                        })
                                    }}
                                />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label htmlFor="name">Industry</label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="industry"
                                    type="text"
                                    value={tempCustomer.industry}
                                    onChange={(e) => {
                                        setChanged(true)
                                        setTempCustomer({
                                            ...tempCustomer,
                                            industry: e.target.value
                                        })
                                    }}
                                />
                            </div>
                        </div>
                    </form>
                    {changed ? <>
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={(e) => {
                                setTempCustomer({...customer})
                                setChanged(false)
                            }}
                        >
                            Cancel
                        </button>
                        {''}
                        <button
                            form="customer"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
                        >
                            Save
                        </button>
                    </> : null}
                    <br/><br/>
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={(e) => {
                        const url = baseUrl + 'api/customers/' + id;

                        fetch(url, {
                            method: 'DELETE', headers: {
                                'Content-Type': 'application/json',
                                Authorization: 'Bearer ' + localStorage.getItem('access')
                            }
                        })
                            .then((response) => {
                                if (response.status === 401) {
                                    navigate('/login', {
                                        state: {
                                            previousUrl: location.pathname
                                        }
                                    })
                                }
                                if (!response.ok) {
                                    throw new Error('Something went wrong')
                                }
                                navigate('/customers')
                            }).catch((e) => {
                            setError(e.message)
                        })
                    }}>Delete
                    </button>
                </div>
                : null}
            <br/>
            {error ? <p>{error}</p> : null}
            <Link to={'/customers'}>Go back</Link>
        </div>
    );
};

export default Customer;