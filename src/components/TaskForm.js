import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Stack,
  Typography,
  Container,
  CardContent,
  Card,
} from "@mui/material";
import { addTask, editTask } from "../redux/actions/taskActions";

const TaskForm = ({ isAdding }) => {
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    taskName: "",
    description: "",
    category: "",
    status: "",
  });

  const [errors, setErrors] = useState({
    taskName: "",
    description: "",
    category: "",
    status: "",
  });

  useEffect(() => {
    if (!isAdding && taskId) {
      const existingTask = tasks.find(
        (task) => task.id === parseInt(taskId, 10)
      );

      if (existingTask) {
        setTaskData({
          taskName: existingTask.taskName,
          description: existingTask.description,
          category: existingTask.category,
          status: existingTask.status,
        });
      }
    }
  }, [isAdding, taskId, tasks]);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Simple validation logic
    if (!taskData.taskName) {
      newErrors.taskName = "Task name is required";
      isValid = false;
    }

    if (!taskData.description) {
      newErrors.description = "Description is required";
      isValid = false;
    }

    if (!taskData.category) {
      newErrors.category = "Category is required";
      isValid = false;
    }

    if (!taskData.status) {
      newErrors.status = "Status is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (event) => {
    setTaskData((prevData) => ({
      ...prevData,
      category: event.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const newTaskData = {
        id: isAdding ? tasks.length + 1 : parseInt(taskId, 10),
        taskName: taskData.taskName,
        description: taskData.description,
        category: taskData.category,
        status: taskData.status,
      };

      if (isAdding) {
        dispatch(addTask(newTaskData));
      } else {
        dispatch(editTask(parseInt(taskId, 10), newTaskData));
      }

      // Redirect back to task list after adding/editing task
      navigate(-1);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Box sx={{ pt: 7 }}>
        <Stack
          direction={"row"}
          gap={1}
          sx={{ alignitems: "center" }}
          style={{ marginBottom: "40px", marginLeft: "40px" }}
        >
          <KeyboardBackspaceIcon
            size={22}
            onClick={handleBack}
            style={{ cursor: "pointer" }}
          />
          <Box>
            <Typography sx={{ fontSize: "17px", fontWeight: 500 }}>
              {isAdding ? "Add Task" : "Edit Task"}
            </Typography>
          </Box>
        </Stack>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignitems: "center",
            width: "800px",
          }}
        >
          <Stack>
            <Card
              sx={{
                width: "100%",
                borderRadius: 3,
                boxShadow: "0px 0px 32px rgba(0, 0, 0, 0.08)",
                overflow: "initial",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Stack gap={4}>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      label="Task Name"
                      name="taskName"
                      value={taskData.taskName}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      error={!!errors.taskName}
                      helperText={errors.taskName}
                    />

                    <TextField
                      label="Description"
                      name="description"
                      value={taskData.description}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      error={!!errors.description}
                      helperText={errors.description}
                    />

                    <FormControl
                      fullWidth
                      error={!!errors.category}
                      variant="outlined"
                      margin="normal"
                    >
                      <InputLabel id="category-label">Category</InputLabel>
                      <Select
                        labelId="category-label"
                        id="category"
                        value={taskData.category}
                        onChange={handleCategoryChange}
                        label="Category"
                      >
                        <MenuItem value="">
                          <em>Select Category</em>
                        </MenuItem>
                        <MenuItem value="Low">Low</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="High">High</MenuItem>
                      </Select>
                      {errors.category && (
                        <Typography variant="caption" color="error">
                          {errors.category}
                        </Typography>
                      )}
                    </FormControl>

                    <FormControl
                      fullWidth
                      error={!!errors.status}
                      variant="outlined"
                      margin="normal"
                    >
                      <InputLabel id="status-label">Status</InputLabel>
                      <Select
                        labelId="status-label"
                        label="Status"
                        name="status"
                        value={taskData.status}
                        onChange={handleChange}
                      >
                        <MenuItem value="">
                          <em>Select Status</em>
                        </MenuItem>
                        <MenuItem value="Not Completed">Not Completed</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                      </Select>
                      {errors.status && (
                        <Typography variant="caption" color="error">
                          {errors.status}
                        </Typography>
                      )}
                    </FormControl>

                    <Button variant="contained" type="submit">
                      {isAdding ? "Create Task" : "Update Task"}
                    </Button>
                  </form>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Container>
      </Box>
    </div>
  );
};

export default TaskForm;
