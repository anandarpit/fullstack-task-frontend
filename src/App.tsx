import React from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { CssBaseline, Container, AppBar, Toolbar, Typography, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Task Scheduler</Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          paddingTop: '20px',
        }}
      >
        <Container>
          <TaskForm />
          <TaskList />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
