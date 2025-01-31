import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Container,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { getPermissions } from "../api/permissionApi";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";

const PermissionTable = () => {
  const [permissions, setPermissions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await getPermissions();
        setPermissions(response.data);
      } catch (error) {
        console.error("Error fetching permissions", error);
      }
    };
    fetchPermissions();
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography
            sx={{
              color: "text.primary",
              display: "flex",
              alignItems: "center",
            }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Permissions
          </Typography>
        </Breadcrumbs>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/new-permission")}
        >
          Create New Permission
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>ID</b>
              </TableCell>
              <TableCell>
                <b>First Name</b>
              </TableCell>
              <TableCell>
                <b>Last Name</b>
              </TableCell>
              <TableCell>
                <b>Permission Type</b>
              </TableCell>
              <TableCell>
                <b>Date</b>
              </TableCell>
              <TableCell>
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {permissions.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.nombreEmpleado}</TableCell>
                <TableCell>{row.apellidoEmpleado}</TableCell>
                <TableCell>{row.tipoPermisoDescripcion}</TableCell>
                <TableCell>{row.fechaPermiso}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() =>
                      navigate(`/edit-permission/${row.id}`, { state: row })
                    }
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default PermissionTable;
