import React from 'react';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


export default function AllModules() {

    const [modules, setModules] = useState([]);

    useEffect(() => {
        const fetchCohorts = async () => {
            const response = await fetch('http://127.0.0.1:8000/api/module/');
            const json = await response.json();
            setModules(json);
        };
        fetchCohorts()
        .catch((error) => {
            console.error(`Failed to fetch modules: `, error);
        });
    }, []);

    // console.log(cohorts);
    return (
        <div>
            <h1>All Modules</h1>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Code</TableCell>
                <TableCell align="left">Full Name</TableCell>
                <TableCell align="left">Delivered To</TableCell>
                <TableCell align="right">CA Split</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>

            {modules.map((item, index) => (
                <TableRow item
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        <Button variant="contained" component={Link} to={`/modules/${item.code}`}>
                        {item.code}
                        </Button>
                    </TableCell>
                    
                    <TableCell align="left">{item.full_name}</TableCell>

                    <TableCell align="left">
                    {item.delivered_to.map((degree) => (
                        <Button variant="contained" component={Link} to={`/modules/cohorts/${degree.slice(33,-1)}`}>
                        {degree.slice(33,-1)}
                        </Button>
                        ))}
                    </TableCell>

                    <TableCell align="right">{item.ca_split}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </div>
  );
}