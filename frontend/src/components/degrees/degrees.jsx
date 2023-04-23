import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import React from 'react';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


// This is to displau All the degrees in the university

function AllDegrees() {

    const [data, setData] = useState([]);
    // For Fetching the data
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://127.0.0.1:8000/api/degree/');
            const jsonData = await response.json();
            setData(jsonData);
        }
        fetchData()
        .catch((error) => {
            console.error("Failed to fetch degrees: ", error);
        });
    }, []);

    return (
        <div>
            <h1>All Degrees</h1>
            <Grid container spacing={3}>
            {data.map((item, index) => (
                <Grid item xs={9} md={4} >
                    <Card sx={{ minWidth: 200, minHeight: 150 }} key={index}>
                    <CardContent key={index}>
                        <Typography variant="h5" component="div">
                        {item.shortcode}
                        </Typography>
                        <br></br>
                        <Typography variant="body2">
                        {item.full_name}
                        </Typography>
                        <br></br>
                        <Link to={`/degree/${item.shortcode}`} style={{ textDecoration: 'none' }}>
                        <Button variant="contained">View Degree</Button>
                        </Link>
                    </CardContent>
                    </Card>
                </Grid>
            ))}
            </Grid> 
        </div>
    );
}

export default AllDegrees;

