import type { Resource } from "./resource";
import type { User } from "./auth";

export interface Booking {
  _id: string;
  resource: Resource;
  user: User;
  date: string;
  status: "pending" | "approved" | "rejected" | "cancelled";
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}
