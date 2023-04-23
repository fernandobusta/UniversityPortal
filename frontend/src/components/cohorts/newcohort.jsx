import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import React from 'react';

// For the form
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


function CreateCohort() {
    const navigate = useNavigate();                     // Navigator
    const [cohortId, setCohortId] = useState("");       // ID of cohort
    const [year, setYear] = useState(1);                // Year of cohort
    const [degree, setDegree] = useState("");           // Degree of cohort
    const [allDegrees, setAllDegrees] = useState([]);   // All degrees for selector


    let handleSubmit = async (event) => {
        event.preventDefault();
        // console.log({
        //     id: cohortId,
        //     year: year,
        //     degree: `http://127.0.0.1:8000/api/degree/${degree}`,
        // })
        try {
            let response = await fetch("http://127.0.0.1:8000/api/cohort/", 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: cohortId,
                    year: year,
                    degree: `http://127.0.0.1:8000/api/degree/${degree}/`,
                }),
            });
            let responseJSON = await response.json();
        } catch (error) {
            console.log(`Error in POST: ${error}`);
        }
        // Go back to the degrees page
        navigate('/cohorts');
    }

    // For Fetching the degrees for selection
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://127.0.0.1:8000/api/degree/');
            const jsonData = await response.json();
            setAllDegrees(jsonData);
        }
        fetchData()
        .catch((error) => {
            console.error("Failed to fetch degrees: ", error);
        });
    }, []);

    const content = () => {
        return (
        <div>
            <h1>Create a new Cohort</h1>
        <form onSubmit={handleSubmit}>
            <Box
            sx={{'& > :not(style)': { m: 1, width: '25ch' },}}
            >
                <TextField 
                id="filled-basic" 
                label="Cohort ID" 
                variant="filled" 
                type="text"
                inputProps={{ maxLength: 49 }}
                value={cohortId}
                onChange={(event) => setCohortId(event.target.value)}
                />
                <br />
                <TextField 
                id="filled-basic" 
                label="Year" 
                variant="filled" 
                InputProps={{ inputProps: { min: 1, max: 4 } }}
                type="number"
                value={year}
                onChange={(event) => setYear(parseInt(event.target.value))}
                />
                <br />
                <Select sx={{backgroundColor:'#FFF'}}
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={degree}
                onChange={(event) => setDegree(event.target.value)}
                >
                    {allDegrees.map((item, index) => (
                        <MenuItem value={item.shortcode}>{item.shortcode}</MenuItem>
                    ))}
                </Select>
                <br />
                
                <Button type="submit" variant="contained">Create</Button>
            </Box>
        </form>
        </div>
        );
    }
    return content();
}

export default CreateCohort;