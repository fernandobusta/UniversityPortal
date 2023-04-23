import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import React from 'react';

// For the form
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


function CreateDegree() {
    const navigate = useNavigate();                     // Navigator
    const [fullname, setFullname] = useState("");       // Name of degree
    const [shortcode, setShortcode] = useState("");     // Shortcode for degree

    let handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let response = await fetch("http://127.0.0.1:8000/api/degree/", 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    full_name: fullname,
                    shortcode: shortcode,
                }),
            });
            let responseJSON = await response.json();
        } catch (error) {
            console.log(`Error in POST: ${error}`);
        }
        // Go back to the degrees page
        navigate('/degree');
    }

    const content = () => {
        return (
        <div>
            <h1>Create a new Degree</h1>
        <form onSubmit={handleSubmit}>
            <Box
            sx={{'& > :not(style)': { m: 1, width: '25ch' },}}
            >
                <TextField 
                id="filled-basic" 
                label="Degree Name" 
                variant="filled" 
                type="text"
                value={fullname}
                onChange={(event) => setFullname(event.target.value)}
                />
                <br />
                <TextField 
                id="filled-basic" 
                label="Shortcode" 
                variant="filled" 
                type="text"
                value={shortcode}
                onChange={(event) => setShortcode(event.target.value)}
                />
                <br />
                <Button type="submit" variant="contained">Create</Button>
            </Box>
        </form>
        </div>
        );
    }
    return content();
}



export default CreateDegree;