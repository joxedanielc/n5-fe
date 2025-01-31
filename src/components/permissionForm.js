import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { requestPermission } from "../api/permissionApi";

const PermissionForm = () => {
  const [formData, setFormData] = useState({
    nombreEmpleado: "",
    apellidoEmpleado: "",
    tipoPermiso: "",
    fechaPermiso: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await requestPermission(formData);
      alert("Permission Requested Successfully!");
      setFormData({
        nombreEmpleado: "",
        apellidoEmpleado: "",
        tipoPermiso: "",
        fechaPermiso: "",
      });
    } catch (error) {
      console.error("Error requesting permission", error);
      alert("Failed to request permission");
    }
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
          <TextField
            fullWidth
            label="Permission Type"
            name="tipoPermiso"
            value={formData.tipoPermiso}
            onChange={handleChange}
            margin="normal"
            required
          />
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
    </Container>
  );
};

export default PermissionForm;
