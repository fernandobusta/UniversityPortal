import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import React from 'react';

// For the form
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


function CreateStudent() {
    const navigate = useNavigate();                     // Navigator
    const [studentId, setStudentId] = useState("");     // ID of Student
    const [firstName, setFirstName] = useState("");     // First Name of Sutdent
    const [lastName, setLastName] = useState("");       // Last Name of Student
    const [cohort, setCohort] = useState("");           // Cohort of a student
    const [allCohort, setAllCohort] = useState([]);     // All cohorts for selection


    let handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let response = await fetch("http://127.0.0.1:8000/api/student/", 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    student_id: studentId,
                    first_name: firstName,
                    last_name: lastName,
                    cohort: `http://127.0.0.1:8000/api/cohort/${cohort}/`,
                }),
            });
            let responseJSON = await response.json();
        } catch (error) {
            console.log(`Error in POST: ${error}`);
        }
        // Go back to the degrees page
        navigate('/student');
    }

    // For Fetching the cohort for selection
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://127.0.0.1:8000/api/cohort/');
            const jsonData = await response.json();
            setAllCohort(jsonData);
        }
        fetchData()
        .catch((error) => {
            console.error("Failed to fetch cohorts: ", error);
        });
    }, []);

    const content = () => {
        return (
        <div>
            <h1>Create a new Student</h1>
        <form onSubmit={handleSubmit}>
            <Box
            sx={{'& > :not(style)': { m: 1, width: '25ch' },}}
            >
                <TextField 
                id="filled-basic" 
                label="Student ID" 
                variant="filled" 
                type="text"
                inputProps={{ maxLength: 49 }}
                value={studentId}
                onChange={(event) => setStudentId(event.target.value)}
                />
                <br />
                <TextField 
                id="filled-basic" 
                label="First Name" 
                variant="filled" 
                inputProps={{ maxLength: 49 }}
                type="text"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                />
                <br />
                <TextField 
                id="filled-basic" 
                label="Last Name" 
                variant="filled" 
                inputProps={{ maxLength: 49 }}
                type="text"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                />
                <br />
                <Select sx={{backgroundColor:'#FFF'}}
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={cohort}
                onChange={(event) => setCohort(event.target.value)}
                >
                    {allCohort.map((item, index) => (
                        <MenuItem value={item.id}>{item.id}</MenuItem>
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

export default CreateStudent;