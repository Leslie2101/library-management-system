import api from "./api";

export const getBorrowRecordsByStudent = (studentId) =>
  api.get(`/borrow-records/student/${studentId}`);