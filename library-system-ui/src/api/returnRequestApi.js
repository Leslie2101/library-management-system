import api from "./api";

export const getReturnRequests = () => api.get("/return-requests");

export const createReturnRequest = (request) =>
  api.post("/return-requests", request);

export const approveReturnRequest = (id, adminId) =>
  api.put(`/return-requests/${id}/approve`, { adminId });

export const rejectReturnRequest = (id, adminId, reason) =>
  api.put(`/return-requests/${id}/reject`, { adminId, reason });