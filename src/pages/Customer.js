import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../shared";

const Customer = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState();
    const [tempCustomer, setTempCustomer] = useState();
    const [notFound, setNotFound] = useState();
    const [error, setError] = useState();
    const [changed, setChanged] = useState(false);


    useEffect(() => {
        //console.log('customer', customer)
        //console.log('tmpcustomer', tempCustomer)
        //console.log(changed)
    })

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
                setTempCustomer(data.customer);
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

    function updateCustomer() {

        const url = baseUrl + 'api/customers/';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(tempCustomer)
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setCustomer(data.customer)
            })
            .catch((e) => {
            console.log(e)
        })
    }

    return (
        <div>
            {customer ?
                <div>
                    <input
                        className="m-2 block px-2"
                        type="text"
                        value={tempCustomer.name}
                        onChange={(e) => {
                            setChanged(true)
                            setTempCustomer({...tempCustomer, name: e.target.value})
                        }
                        }
                    />
                    <input
                        className="m-2 block px-2"
                        type="text"
                        value={tempCustomer.industry}
                        onChange={(e) => {
                            setChanged(true)
                            setTempCustomer({...tempCustomer, industry: e.target.value})
                        }
                        }
                    />
                    {changed ? <>
                        <button onClick={(e) => {
                                setTempCustomer({...customer})
                                setChanged(false)
                            }
                        }>Cancel</button>{''}
                        <button onClick={(e) => {
                            return updateCustomer()
                        }
                        }>Save</button>
                    </> : null}
                </div>
                : null}
            <button onClick={(e) => {
                const url = baseUrl + 'api/customers/' + id;

                fetch(url, {
                    method: 'DELETE', headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Something went wrong')
                        }
                        navigate('/customers')
                    }).catch((e) => {
                    console.log(e)
                })
            }}>Delete
            </button>
            <br/>
            <Link to={'/customers'}>Go back</Link>
        </div>
    );
};

export default Customer;