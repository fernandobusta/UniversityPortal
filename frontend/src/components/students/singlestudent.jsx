import { useState, useEffect, Fragment} from "react";
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
'&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
},
// hide last border
'&:last-child td, &:last-child th': {
    border: 0,
},
}));

function SingleStudent() {

    const [student, setStudent] = useState();                   // JSON with student data
    const [studentId, setStudentId] = useState('');             // Student Id number        
    const [modules, setModules] = useState();                   // Modules of student
    const [clicked, setClicked] = useState(false);
    const [isValidFetch, setIsValidFetch] = useState(true);

    useEffect(() => {

        if (student === undefined && clicked === true ) {
            try {
                const fetchStudent = async () => {
                    console.log(studentId);
                    let response = await fetch(`http://127.0.0.1:8000/api/student/${studentId}/`)
                    let jsonData = await response.json();
                    setStudent(jsonData);
                }
                fetchStudent()
            } catch (error) {
                console.log(`Error fetching student - ${error}`);
            }
        }
        if (student !== undefined && clicked === true) {
            // Get modules of student
            try{
                const fetchModules = async () => {
                    let responseM = await fetch(`http://127.0.0.1:8000/api/grade/?student=${student.student_id}`)
                    let jsonDataM = await responseM.json();
                    setModules(jsonDataM);
                    console.log(modules);
                    
                }
                fetchModules()
                setClicked(false);      // Fetch made -> back to default
            } catch (error) {
                console.log(`Error fetching modules of student - ${error}`)
            };
        }
        try {
            if(student.student_id !== undefined) {
                setIsValidFetch(true);
            }
        } catch (error) {
            setIsValidFetch(false);
        }
    }, [student, clicked, studentId, modules]);

    const getDataStudent = (event) => {
        event.preventDefault();
        setStudent();
        setModules();
        setClicked(true);       // Just made the search
        setIsValidFetch(true);
    };


    const studentContent = () => {
        if (modules !== undefined && student !== undefined && isValidFetch === true) {
            const stCohort = student.cohort.slice(33,-1);
            return (
                <div>
                <Card variant="outlined">
                <Fragment>
                    <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {student.student_id}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {student.first_name} {student.last_name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {student.email}
                    </Typography>
                    </CardContent>
                    
                    <h2>Modules that {student.first_name} is registered for all part of &nbsp;
                    <Button style={{align:'center'}} variant='contained' component={Link} to={`/cohorts/${stCohort}`} size="small">{stCohort}</Button>
                    &nbsp;:</h2>


                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                            <StyledTableCell>Module Name</StyledTableCell>
                            <StyledTableCell align="right">CA Mark</StyledTableCell>
                            <StyledTableCell align="right">Exam Mark</StyledTableCell>
                            <StyledTableCell align="right">Total Grade</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {modules?.map((name, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row">
                                <Button style={{align:'center'}} variant='contained' component={Link} to={`/modules/${name.module.slice(33, -1)}`} size="small">{name.module.slice(33, -1)}</Button>
                                </StyledTableCell>
                                <StyledTableCell align="right">{name.ca_mark}</StyledTableCell>
                                <StyledTableCell align="right">{name.exam_mark}</StyledTableCell>
                                <StyledTableCell align="right">{name.total_grade}</StyledTableCell>
                            </StyledTableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>

                </Fragment>
                
                </Card>
                   
                </div>
            );
        }
    };

    const content = () => {
        return (
            <div>
                <h1>Search for a Student</h1>
                <Box
                    sx={{'& > :not(style)': { m: 1, width: '30ch' },}}
                >
                    <TextField 
                    id="filled-basic" 
                    label="Student ID" 
                    variant="filled"
                    type="text"
                    value={studentId}
                    onChange={(event) => setStudentId(event.target.value)}
                    />
                    <Button  style={{ padding: "16px 0px" }} variant="contained"
                    onClick={(event) => getDataStudent(event)}>Search</Button>
                </Box>

                    {studentContent()}
            </div>
        );
    }
    return content();
};

export default SingleStudent;