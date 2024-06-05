import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchTasks, deleteTask } from '../features/tasks/tasksSlice';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const TaskList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const taskStatus = useSelector((state: RootState) => state.tasks.status);
  const error = useSelector((state: RootState) => state.tasks.error);

  useEffect(() => {
    if (taskStatus === 'idle') {
      dispatch(fetchTasks());
    }
  }, [taskStatus, dispatch]);

  const handleDelete = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };

  let content;

  if (taskStatus === 'loading') {
    content = <Typography>Loading...</Typography>;
  } else if (taskStatus === 'succeeded') {
    content = (
      <Grid container spacing={3}>
        {tasks.map(task => (
          <Grid item xs={12} sm={6} md={4} key={task._id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{task.title}</Typography>
                <Typography color="textSecondary">Description: {task.description}</Typography>
                <Typography color="textSecondary">Time: {new Date(task.date).toLocaleString()}</Typography>
                <Typography color="textSecondary">Status: {task.status}</Typography>
                {task.status === 'complete' && (
                  <Typography color="primary">File Created Successfully</Typography>
                )}
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  color="secondary" 
                  onClick={() => handleDelete(task._id)}
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
                {task.status === 'complete' && (
                  <CheckCircleIcon color="primary" />
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  } else if (taskStatus === 'failed') {
    content = <Typography>{error}</Typography>;
  }

  return (
    <Container maxWidth="lg">
      <Box mt={5}>
        {content}
      </Box>
    </Container>
  );
};

export default TaskList;
