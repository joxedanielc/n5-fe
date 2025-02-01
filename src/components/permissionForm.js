import { useState, useEffect } from "react";
import * as React from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import {
  requestPermission,
  getPermissionTypes,
  modifyPermission,
} from "../api/permissionApi";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import CreateIcon from "@mui/icons-material/Create";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

const PermissionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState(
    location.state
      ? {
          ...location.state,
          fechaPermiso: location.state.fechaPermiso
            ? dayjs(location.state.fechaPermiso).format("YYYY-MM-DD") // ✅ Fix date format
            : "",
        }
      : {
          nombreEmpleado: "",
          apellidoEmpleado: "",
          tipoPermiso: "",
          fechaPermiso: "",
        }
  );

  const [permissionTypes, setPermissionTypes] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [successSnackbar, setSuccessSnackbar] = useState(true);
  const [requestMessage, setRequestMessage] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [isEditMode, setIsEditMode] = useState(!!id);

  useEffect(() => {
    const fetchPermissionTypes = async () => {
      try {
        const response = await getPermissionTypes();
        setPermissionTypes(response.data);
      } catch (error) {
        console.error("Error fetching permission types", error);
      }
    };
    fetchPermissionTypes();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await modifyPermission(id, formData);
        setRequestMessage("Permission Updated Successfully!");
      } else {
        await requestPermission(formData);
        setRequestMessage("Permission Requested Successfully!");
      }
      setSuccessSnackbar(true);
    } catch (error) {
      console.error("Error requesting permission", error);
      setSuccessSnackbar(false);
      setRequestMessage("Failed to request permission");
    } finally {
      setOpenSnackbar(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  function handleClick(event) {
    event.preventDefault();
    navigate("/");
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            color="inherit"
            onClick={handleClick}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </Link>
          <Typography
            sx={{
              color: "text.primary",
              display: "flex",
              alignItems: "center",
            }}
          >
            <CreateIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {isEditMode ? "Edit" : "Create"}
          </Typography>
        </Breadcrumbs>
      </Box>

      <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          {isEditMode ? "Edit Permission" : "Request Permission"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="First Name"
            name="nombreEmpleado"
            value={formData.nombreEmpleado}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Last Name"
            name="apellidoEmpleado"
            value={formData.apellidoEmpleado}
            onChange={handleChange}
            margin="normal"
            required
          />
          <FormControl fullWidth variant="standard" margin="normal">
            <InputLabel id="permission-type-select-label">
              Permission Type
            </InputLabel>
            <Select
              labelId="permission-type-select-label"
              id="permission-type-select"
              name="tipoPermiso"
              value={formData.tipoPermiso}
              onChange={handleChange}
              required
            >
              {permissionTypes.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.descripcion}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            name="fechaPermiso"
            type="date"
            value={formData.fechaPermiso}
            onChange={handleChange}
            margin="normal"
            required
            disabled={isEditMode}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            {isEditMode ? "Update" : "Submit"}
          </Button>
        </form>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={successSnackbar ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {requestMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PermissionForm;
