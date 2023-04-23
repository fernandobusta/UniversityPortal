import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// Material UI
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';

// Styling of page
import Navbar from './components/navbar';
import Home from './components/home';

// Degrees
import AllDegrees from './components/degrees/degrees';
import SingleDegree from './components/degrees/singledegree';
import CreateDegree from './components/degrees/newdegree';

// Cohorts
import AllCohorts from './components/cohorts/cohorts';
import SingleCohort from './components/cohorts/singlecohort';
import CreateCohort from './components/cohorts/newcohort';

// Modules
import AllModules from './components/unimodules/modules';
import SingleModule from './components/unimodules/singlemodule';
import ModulePerCohort from './components/unimodules/modulesincohort';
import CreateModule from './components/unimodules/newmodule';

// Students
import SingleStudent from './components/students/singlestudent';
import CreateStudent from './components/students/newstudent';
import SetGrade from './components/students/setGrade';




function App() {

  // Dark mode Toggle -------------------------------------
  const [checked, setChecked] = useState(true);
  const [theme, setTheme ] = useState(
    localStorage.getItem('theme') || 'light');

  const toggleTheme = (event) => {
    setChecked(event.target.checked);
    if (theme === 'light') {
    setTheme('dark');
    } else {
    setTheme('light');
    }
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme] );

  // --------------- END dark mode Toggle -----------------

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  return (
    <div className={`App ${theme}`}>
    <Router>
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        
        <DrawerHeader />
        
        <Grid container spacing={8}>
          
        <Switch
          checked={checked}
          onChange={toggleTheme}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        </Grid>
        
        <div className="App">
          <Routes>
            <Route exact path='/' element={<Home />} />

            {/* Links for Degrees */}
            <Route path='/degree' element={<AllDegrees />} />
            <Route path='/degree/:shortcode' element={<SingleDegree />} />
            <Route path='/newdegree' element={<CreateDegree />} />

            {/* Links for Cohorts */}
            <Route path='/cohorts' element={<AllCohorts />} />
            <Route path='/cohorts/:shortcode' element={<SingleCohort />} />
            <Route path='/newcohort' element={<CreateCohort />} />

            {/* Links for Modules */}
            <Route path='/modules' element={<AllModules />} />
            <Route path='/modules/:shortcode' element={<SingleModule />} />
            <Route path='/modules/cohorts/:shortcode' element={<ModulePerCohort />} />
            <Route path='/newmodule' element={<CreateModule /> } />

            {/* Links for Students */}
            <Route path='/student' element={<SingleStudent />} />
            <Route path='/newstudent' element={<CreateStudent />} />
            <Route path='/setgrade' element={<SetGrade />} />

          </Routes>
        </div>
      </Box>
    </Box>
    </Router>
    </div>
  );
}

export default App;
