import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link, useParams } from "react-router-dom";
import NotFound from "../components/NotFound";
import DefinitionSearch from "../components/DefinitionSearch";
import useFetch from "../hooks/UseFetch";

const Definition = () => {
    const {search} = useParams();
    const {request, data: [{meanings: word}] = [{}], errorStatus} = useFetch(
        'https://api.dictionaryapi.dev/api/v2/entries/en/' + search,
        {
            method: 'GET'
        }
    );

    useEffect(() => {
        request();
    })

    if (errorStatus === 404) {
        return (
            <>
                <NotFound/>
                <Link to="/dictionary">Back</Link>
            </>
        )
    }

    if (errorStatus) {
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
                    <DefinitionSearch/>
                </>
            ) : null


            }
        </>
    );
};

export default Definition;