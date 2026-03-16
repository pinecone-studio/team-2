export type RequestStatus = "pending" | "approved" | "rejected";

export interface Request {
  id: string;
  title: string;
  user: string;
  date: string;
  status: RequestStatus;
}