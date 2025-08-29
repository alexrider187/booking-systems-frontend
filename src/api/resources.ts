// api/resources.ts
import axiosInstance from "./axiosInstance";
import type { Resource } from "../types/resource";

export const getAllResources = async (): Promise<Resource[]> => {
  const { data } = await axiosInstance.get<Resource[]>("/resources");
  return data;
};

export const getResourceById = async (id?: string): Promise<Resource> => {
  if (!id) throw new Error("Resource ID is required");
  const { data } = await axiosInstance.get<Resource>(`/resources/${id}`);
  return data;
};

export const createResource = async (resource: { name: string; description?: string }) => {
  const { data } = await axiosInstance.post<{
    message: string;
    id: string;
    name: string;
    description?: string;
  }>("/resources", resource);
  return data;
};

export const updateResource = async (
  id?: string,
  resource: { name?: string; description?: string } = {}
) => {
  if (!id) throw new Error("Resource ID is required");
  const { data } = await axiosInstance.put<{
    message: string;
    resource: Resource;
  }>(`/resources/${id}`, resource);
  return data;
};

export const deleteResource = async (id?: string) => {
  if (!id) throw new Error("Resource ID is required");
  const { data } = await axiosInstance.delete<{ message: string }>(`/resources/${id}`);
  return data;
};
