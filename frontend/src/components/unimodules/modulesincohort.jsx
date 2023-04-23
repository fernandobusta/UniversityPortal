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

function ModulePerCohort() {

  const { shortcode } = useParams();
  const [cohorts, setStudents] = useState([]);

  useEffect(() => {
      const fetchCohorts = async () => {
          const response = await fetch(`http://127.0.0.1:8000/api/module/?delivered_to=${shortcode}`);
          const json = await response.json();
          setStudents(json);
      };
      fetchCohorts()
      .catch((error) => {
          console.error(`Failed to fetch students: `, error);
      });
  }, []);


  return (
    <div>
      <h1>Modules in Cohort: {shortcode}</h1>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Code</StyledTableCell>
            <StyledTableCell align="left">Full Name</StyledTableCell>
            <StyledTableCell align="left">CA split</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cohorts.map((row) => (
            <StyledTableRow key={row.code}>
                <StyledTableCell align="left">
                    <Button variant="contained" component={Link} to={`/modules/${row.code}`}>
                        {row.code}
                    </Button>
                </StyledTableCell>
              <StyledTableCell align="left">{row.full_name}</StyledTableCell>
              <StyledTableCell align="left">{row.ca_split}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default ModulePerCohort;