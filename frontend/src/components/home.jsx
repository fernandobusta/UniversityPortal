import { Link } from 'react-router-dom';
import React from 'react';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';



function Home() {

    const content = () => {
        return (

            <Grid container spacing={3}>
            
            
                <Grid item xs={9} md={6} >
                    <Card sx={{ minWidth: 200, minHeight: 150 }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                        Degrees
                        </Typography>
                        <br />

                        <Link to={`/degree`} style={{ textDecoration: 'none' }}>
                        <Button variant="contained" style={{ minWidth: '150px'}}>View Degrees</Button>
                        </Link>
                        <br /><br />
                        <Link to={`/newdegree`} style={{ textDecoration: 'none'}}>
                        <Button variant="contained" style={{ minWidth: '150px'}}>Add Degree</Button>
                        </Link>
                    </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={9} md={6} >
                    <Card sx={{ minWidth: 200, minHeight: 150 }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                        Cohorts
                        </Typography>
                        <br />
                        <Link to={`/cohorts`} style={{ textDecoration: 'none' }}>
                        <Button variant="contained" style={{ minWidth: '150px'}}>View Cohorts</Button>
                        </Link>
                        <br /><br />
                        <Link to={`/newcohort`} style={{ textDecoration: 'none' }}>
                        <Button variant="contained" style={{ minWidth: '150px'}}>Add Cohort</Button>
                        </Link>
                    </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={9} md={6} >
                    <Card sx={{ minWidth: 200, minHeight: 150 }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                        Modules
                        </Typography>
                        <br />
                        <Link to={`/modules`} style={{ textDecoration: 'none' }}>
                        <Button variant="contained" style={{ minWidth: '150px'}}>View Modules</Button>
                        </Link>
                        <br /><br />
                        <Link to={`/newmodule`} style={{ textDecoration: 'none' }}>
                        <Button variant="contained" style={{ minWidth: '150px'}}>Add module</Button>
                        </Link>
                    </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={9} md={6} >
                    <Card sx={{ minWidth: 200, minHeight: 150 }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                        Students
                        </Typography>
                        <br />
                        <Link to={`/student`} style={{ textDecoration: 'none' }}>
                        <Button variant="contained" style={{ minWidth: '150px'}}>View Students</Button>
                        </Link>
                        <br /><br />
                        <Grid container spacing={3}>
                            <Grid item xs={9} md={6} >
                                <Link to={`/newstudent`} style={{ textDecoration: 'none' }}>
                                <Button variant="contained" style={{ minWidth: '90px'}}>Add</Button>
                                </Link>
                            </Grid>
                            <Grid item xs={9} md={6} >
                                <Link to={`/setgrade`} style={{ textDecoration: 'none' }}>
                                <Button variant="contained" style={{ minWidth: '90px'}}>Grade</Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </CardContent>
                    </Card>
                </Grid>


            </Grid> 
        );
    }

    return (
        <div>
            <h1>Welcome to the University Portal</h1>
            {content()}
        </div>
    );
}

export default Home; 