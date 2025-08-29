import axiosInstance from "./axiosInstance";
import type { Booking } from "../types/booking";

export const getAllBookings = async (): Promise<Booking[]> => {
  const { data } = await axiosInstance.get("/bookings");
  return data.bookings;
};

export const getMyBookings = async (): Promise<Booking[]> => {
  const { data } = await axiosInstance.get("/bookings/my");
  return data.bookings;
};

export const getBookingById = async (id: string): Promise<Booking> => {
  const { data } = await axiosInstance.get(`/bookings/${id}`);
  return data;
};

export const createBooking = async (booking: { resourceId: string; date: string }) => {
  const { data } = await axiosInstance.post("/bookings", booking);
  return data;
};

export const approveBooking = async (id: string) => {
  const { data } = await axiosInstance.put(`/bookings/${id}/approve`);
  return data;
};

export const rejectBooking = async (id: string, reason?: string) => {
  const { data } = await axiosInstance.put(`/bookings/${id}/reject`, { reason });
  return data;
};

export const cancelBooking = async (id: string) => {
  const { data } = await axiosInstance.put(`/bookings/${id}/cancel`);
  return data;
};
