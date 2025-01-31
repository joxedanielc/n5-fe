import apiClient from "./apiClient";

export const requestPermission = async (data) => {
  return await apiClient.post("/Permisos/request", data);
};

export const modifyPermission = async (id, data) => {
  return await apiClient.put(`/permisos/modify/${id}`, data);
};

export const getPermissions = async () => {
  return await apiClient.get("/permisos");
};
