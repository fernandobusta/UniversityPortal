import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import React from 'react';

// For the form
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';

function CreateModule() {
    const navigate = useNavigate();                         // Navigator
    const [code, setCode] = useState("");                   // Code of module
    const [fullName, setFullName] = useState("");           // Name of module
    const [deliveredTo, setDeliveredTo] = useState([]);     // Cohorts in which it appears
    const [caSplit, setCaSplit] = useState(0);              // CA percentage
    
    const [allCohorts, setAllCohorts] = useState([]);       // All Cohorts for multiselect

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };
    
    
    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setDeliveredTo(
          // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
      };

    let handleSubmit = async (event) => {
        console.log({
            code: code,
            full_name: fullName,
            delivered_to: createCohortList(deliveredTo),
            ca_split: caSplit,
    });
        event.preventDefault();
        try {
            let response = await fetch("http://127.0.0.1:8000/api/module/", 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    code: code,
                    full_name: fullName,
                    delivered_to: createCohortList(deliveredTo),
                    ca_split: caSplit,
                }),
            });
            let responseJSON = await response.json();
        } catch (error) {
            console.log(`Error in POST: ${error}`);
        }
        // Go back to the degrees page
        navigate('/modules');
    };

    // For Fetching the degrees for selection
    useEffect(() => {
        const fetchAllCohorts = async () => {
            const response = await fetch('http://127.0.0.1:8000/api/cohort/');
            const jsonData = await response.json();
            setAllCohorts(jsonData);
        }
        fetchAllCohorts()
        .catch((error) => {
            console.error("Failed to fetch degrees: ", error);
        });
    }, []);

    const createCohortList = (cohortList) => {
        let cohortLinks = new Array();
        cohortList.forEach(item => 
            cohortLinks.push(`http://127.0.0.1:8000/api/cohort/${item}/`)
            );
        return cohortLinks;
    };

    const content = () => {
        return (
        <div>
            <h1>Create a new Module</h1>
        <form onSubmit={handleSubmit}>
            <Box
            sx={{'& > :not(style)': { m: 1, width: '25ch' },}}
            >
                <TextField 
                id="filled-basic" 
                label="Code of Module" 
                variant="filled" 
                type="text"
                inputProps={{ maxLength: 5 }}
                value={code}
                onChange={(event) => setCode(event.target.value)}
                />
                <br />
                <TextField 
                id="filled-basic" 
                label="Full Name" 
                variant="filled" 
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                />
                <br />

                <Select sx={{backgroundColor:'#FFF'}}
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={deliveredTo}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    >
                        {allCohorts.map((item, index) => (
                            <MenuItem key={index} value={item.id}>
                                <Checkbox checked={deliveredTo.indexOf(item.id) > -1} />
                                <ListItemText primary={item.id} />
                            </MenuItem>
                        ))}
                </Select>

                <br />
                <TextField 
                id="filled-basic" 
                label="CA Split" 
                variant="filled" 
                InputProps={{ inputProps: { min: 0, max: 100 } }}
                type="number"
                value={caSplit}
                onChange={(event) => setCaSplit(parseInt(event.target.value))}
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

export default CreateModule;