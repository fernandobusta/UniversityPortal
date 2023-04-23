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


export default function AllCohorts() {

    const [cohorts, setCohorts] = useState([]);

    useEffect(() => {
        const fetchCohorts = async () => {
            const response = await fetch('http://127.0.0.1:8000/api/cohort/');
            const json = await response.json();
            setCohorts(json);
        };
        fetchCohorts()
        .catch((error) => {
            console.error(`Failed to fetch cohorts: `, error);
        });
    }, []);

    // console.log(cohorts);
    return (
        <div>
            <h1>All Cohorts</h1> 
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Year</TableCell>
                <TableCell align="right">Degree</TableCell>
                <TableCell align="right">Name</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>

            {cohorts.map((item, index) => (
                <TableRow item
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        <Button variant="contained" component={Link} to={`/cohorts/${item.id}`}>
                        {item.id}
                        </Button>
                    </TableCell>
                    
                    <TableCell align="right">{item.year}</TableCell>
                    <TableCell align="right">
                        <Button variant="contained" component={Link} to={`/degree/${item.degree.slice(33,-1)}`}>
                        Degree  
                        </Button>
                    </TableCell>
                    <TableCell align="right">{item.name}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </div>
  );
}