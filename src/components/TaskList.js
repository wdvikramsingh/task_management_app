import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { deleteTask } from "../redux/actions/taskActions";
import { styled } from "@mui/material/styles";
import {
  FormControl,
  InputLabel,
  Select,
  Stack,
  MenuItem,
  Typography,
  Divider,
  Paper,
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Box,
} from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const TaskList = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showMore, setShowMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("taskListSearchTerm") || ""
  );
  const [sortOption, setSortOption] = useState(
    localStorage.getItem("taskListSortOption") || ""
  );
  const [filterCategory, setFilterCategory] = useState(
    localStorage.getItem("taskListFilterCategory") || ""
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setSearchTerm(searchParams.get("search") || "");
    setSortOption(searchParams.get("sort") || "");
    setFilterCategory(searchParams.get("filter") || "");
  }, [location.search]);

  const matchSearchQuery = (task, query) => {
    // If the query is wrapped in double quotes, perform an exact match
    if (query.startsWith('"') && query.endsWith('"')) {
      const exactQuery = query.substring(1, query.length - 1);
      return (
        task.taskName.toLowerCase() === exactQuery.toLowerCase() ||
        task.description.toLowerCase() === exactQuery.toLowerCase()
      );
    } else {
      // Perform a partial match
      return (
        task.taskName.toLowerCase().includes(query.toLowerCase()) ||
        task.description.toLowerCase().includes(query.toLowerCase())
      );
    }
  };

  const filteredTasks = Array.isArray(tasks)
    ? tasks.filter((task) => matchSearchQuery(task, searchTerm))
    : [];

  // Sort tasks based on the selected sorting option

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOption === "asc") {
      return a.taskName.localeCompare(b.taskName);
    } else if (sortOption === "desc") {
      return b.taskName.localeCompare(a.taskName);
    } else {
      return 0;
    }
  });

  const categorizedTasks = sortedTasks.filter((task) =>
    filterCategory
      ? task.category.toLowerCase() === filterCategory.toLowerCase()
      : true
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    localStorage.setItem("taskListSearchTerm", term);
  };

  const handleSortChange = (event) => {
    const option = event.target.value;
    setSortOption(option);
    localStorage.setItem("taskListSortOption", option);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setFilterCategory(category);
    localStorage.setItem("taskListFilterCategory", category);
  };

  const handleEdit = (taskId) => {
    // Navigate to the TaskForm for editing
    navigate(`/task/edit/${taskId}`);
  };

  const handleDelete = (taskId) => {
    // Dispatch an action to delete the task
    dispatch(deleteTask(taskId));
  };

  const handleAdd = () => {
    // Navigate to the add route
    navigate("/task/add");
  };

  const columns = [
    { id: "taskName", label: "Name", minWidth: 170 },
    { id: "category", label: "Category", minWidth: 100 },
    { id: "description", label: "Description", minWidth: 100 },
    { id: "status", label: "Status", minWidth: 100 },
    {
      id: "Actions",
      label: "Action",
      minWidth: 170,
    },
  ];

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div className="App">
      <Grid style={{ margin: 50 }}>
        <Typography style={{ fontSize: 20, paddingBottom: 50 }}>
          Task Management Application
        </Typography>
        <Stack
          direction={"row"}
          gap={1}
          justifyContent={"space-between"}
          sx={{ alignitems: "center" }}
        >
          <Stack direction={"row"} gap={1} justifyContent={"space-between"}>
            <Grid style={{ width: "200px" }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel htmlFor="sort-dropdown">
                  Sort by Task Name
                </InputLabel>
                <Select
                  id="sort-dropdown"
                  value={sortOption}
                  onChange={handleSortChange}
                  label="Sort by Task Name"
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="asc">Ascending</MenuItem>
                  <MenuItem value="desc">Descending</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid style={{ width: "200px" }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel htmlFor="category-dropdown">
                  Filter by Category
                </InputLabel>
                <Select
                  id="category-dropdown"
                  value={filterCategory}
                  onChange={handleCategoryChange}
                  label="Filter by Category"
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Stack>
          <Grid>
            <TextField
              label="Search by Task Name"
              value={searchTerm}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
          </Grid>
        </Stack>
        <Grid
          container
          item
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {categorizedTasks.map((item, index) => {
            return (
              <Grid
                item
                xs={2}
                sm={4}
                md={4}
                sx={{ cursor: "pointer" }}
                key={item.id}
              >
                <Item
                  sx={{
                    p: "1rem",
                    border: "1px solid #EAECF0",
                    boxShadow: "0px 1px 3px 0px #1018281A",
                  }}
                >
                  <Typography
                    style={{
                      fontSize: "18px",
                      fontWeight: "500",
                      color: "#101828",
                      textAlign: "left",
                    }}
                  >
                    {item?.taskName}
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: "left",
                      fontSize: "14px",
                      paddingBottom: "10px",
                    }}
                  >
                    {!showMore
                      ? item?.description
                      : `${item?.description?.substring(0, 90)}...`}
                  </Typography>
                  <Divider
                    style={{ backgroundColor: "#EAECF0", opacity: 0.4 }}
                  />
                  <Stack
                    flexDirection={"row"}
                    sx={{ marginTop: "10px" }}
                    justifyContent={"space-between"}
                  >
                    <Typography variant="subtitle2" sx={{ fontSize: "14px" }}>
                      Status : {item?.status}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontSize: "14px" }}>
                      Category : {item?.category}
                    </Typography>
                  </Stack>
                </Item>
              </Grid>
            );
          })}
        </Grid>

        <Grid style={{ marginTop: "50px" }}>
          <Box
            mt={1}
            display="flex"
            justifyContent="flex-end"
            alignitem="flex-end"
          >
            <Button
              variant="contained"
              onClick={handleAdd}
              style={{ marginBottom: "20px" }}
            >
              Create Task
            </Button>
          </Box>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categorizedTasks
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow hover role="checkbox" key={row.id}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <React.Fragment key={column.id}>
                                {column.id === "Actions" ? (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    <Stack
                                      direction={"row"}
                                      sx={{ width: "200px" }}
                                    >
                                      <Button
                                        variant="text"
                                        sx={{ ml: 0 }}
                                        startIcon={
                                          <ModeEditOutlineOutlinedIcon color="action" />
                                        }
                                        onClick={() => handleEdit(row.id)}
                                      ></Button>
                                      <Button
                                        sx={{ ml: 0 }}
                                        variant="text"
                                        startIcon={
                                          <DeleteOutlinedIcon color="action" />
                                        }
                                        onClick={() => handleDelete(row.id)}
                                      ></Button>
                                    </Stack>
                                  </TableCell>
                                ) : (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {column.format && typeof value === "number"
                                      ? column.format(value)
                                      : value}
                                  </TableCell>
                                )}
                              </React.Fragment>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={categorizedTasks.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default TaskList;
