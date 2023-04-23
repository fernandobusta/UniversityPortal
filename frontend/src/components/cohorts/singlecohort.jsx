import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

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

function SingleCohort() {

  const { shortcode } = useParams();
  const [students, setStudents] = useState([]);

  useEffect(() => {
      const fetchStudents = async () => {
          const response = await fetch(`http://127.0.0.1:8000/api/student/?cohort=${shortcode}`);
          const json = await response.json();
          setStudents(json);
      };
      fetchStudents()
      .catch((error) => {
          console.error(`Failed to fetch students: `, error);
      });
  }, []);


  return (
    <div>
      <h1>Single Cohort: {shortcode} - View Modules of <Button variant="contained" component={Link} to={`/modules/cohorts/${shortcode}`}>{shortcode}</Button></h1>  
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Student ID</StyledTableCell>
            <StyledTableCell align="right">First Name</StyledTableCell>
            <StyledTableCell align="right">Last Name</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((row) => (
            <StyledTableRow key={row.student_id}>
              <StyledTableCell component="th" scope="row">
                {row.student_id}
              </StyledTableCell>
              <StyledTableCell align="right">{row.first_name}</StyledTableCell>
              <StyledTableCell align="right">{row.last_name}</StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default SingleCohort;