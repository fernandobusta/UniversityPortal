import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import React from 'react';

// For the form
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


function SetGrade() {
    const navigate = useNavigate();                     // Navigator
    const [student, setStudent] = useState("");         // ID of Student
    const [module, setModule] = useState("");           // Module to grade
    const [caMark, setCaMark] = useState(0);            // CA marks of student
    const [examMark, setExamMark] = useState(0);        // Exam marks of student
    const [cohort, setCohort] = useState("");           // Exam marks of student

    const [allCohort, setAllCohort] = useState([]);     // All cohorts for selection

    let handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let response = await fetch("http://127.0.0.1:8000/api/grade/", 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    module: `http://127.0.0.1:8000/api/module/${module}/`,
                    ca_mark: caMark,
                    exam_mark: examMark,
                    cohort: `http://127.0.0.1:8000/api/cohort/${cohort}/`,
                    student: `http://127.0.0.1:8000/api/student/${student}/`,
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
            <h1>Set a new Grade for a Student</h1>
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
                value={student}
                onChange={(event) => setStudent(event.target.value)}
                />
                <br />
                <TextField 
                id="filled-basic" 
                label="Module" 
                variant="filled" 
                inputProps={{ maxLength: 49 }}
                type="text"
                value={module}
                onChange={(event) => setModule(event.target.value)}
                />
                <br />
                <TextField 
                id="filled-basic" 
                label="CA Mark" 
                variant="filled" 
                inputProps={{ inputProps: { min: 0, max: 100 } }}
                type="number"
                value={caMark}
                onChange={(event) => setCaMark(parseInt(event.target.value))}
                />
                <br />
                <TextField 
                id="filled-basic" 
                label="Exam Mark" 
                variant="filled" 
                inputProps={{ inputProps: { min: 0, max: 100 } }}
                type="number"
                value={examMark}
                onChange={(event) => setExamMark(parseInt(event.target.value))}
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

export default SetGrade;