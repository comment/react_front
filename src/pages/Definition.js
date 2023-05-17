import React, { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import NotFound from "../components/NotFound";
import DefinitionSearch from "../components/DefinitionSearch";
import { LoginContext } from "../App";

const Definition = () => {
    const [loggedIn, setLoggedIn] = useContext(LoginContext)
    const [word, setWord] = useState('');
    const [notFound, setNotFound] = useState(false);
    const [error, setError] = useState(false);
    const {search} = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        //const url = 'https://httpstat.us/500'
        const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + search
        fetch(url)
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
                setWord(data[0].meanings)
            })
            .catch((e) => {
                console.log(e.message)
            })
    });

    if (notFound === true) {
        return (
            <>
                <NotFound/>
                <Link to="/dictionary">Back</Link>
            </>
        )
    }

    if (error === true) {
        return (
            <>
                <p>Something went wrong, try again</p>
                <Link to="/dictionary">Back</Link>
            </>
        )
    }

    return (
        <>
            {word ? (
                <>
                    <h1>Here is a definition:</h1>
                    {word.map((meaning) => {
                        return (
                            <p
                                key={uuidv4()}>
                                {meaning.partOfSpeech + ': '}
                                {meaning.definitions[0].definition}
                            </p>
                        )
                    })}
                    <p>Search again:</p>
                    <DefinitionSearch />
                </>
            ) : null


            }
        </>
    );
};

export default Definition;