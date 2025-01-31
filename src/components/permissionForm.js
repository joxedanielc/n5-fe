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
import { requestPermission, getPermissionTypes } from "../api/permissionApi";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const PermissionForm = () => {
  const [formData, setFormData] = useState({
    nombreEmpleado: "",
    apellidoEmpleado: "",
    tipoPermiso: "",
    fechaPermiso: "",
  });

  const [permissionTypes, setPermissionTypes] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [successSnackbar, setSuccessSnackbar] = useState(true);

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
      await requestPermission(formData);
      setSuccessSnackbar(true);
      setFormData({
        nombreEmpleado: "",
        apellidoEmpleado: "",
        tipoPermiso: "",
        fechaPermiso: "",
      });
    } catch (error) {
      console.error("Error requesting permission", error);
      setSuccessSnackbar(false);
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

  return (
    <Container maxWidth="sm">
      <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2, mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Request Permission
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
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Submit
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
          {successSnackbar
            ? "Permission Requested Successfully!"
            : "Failed to request permission"}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PermissionForm;
