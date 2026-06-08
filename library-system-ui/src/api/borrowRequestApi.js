import api from "./api";

export const getBorrowRequests = () => api.get("/borrow-requests");

export const createBorrowRequest = (request) =>
  api.post("/borrow-requests", request);

export const approveBorrowRequest = (id, adminId) =>
  api.put(`/borrow-requests/${id}/approve`, { adminId });

export const rejectBorrowRequest = (id, adminId, reason) =>
  api.put(`/borrow-requests/${id}/reject`, { adminId, reason });