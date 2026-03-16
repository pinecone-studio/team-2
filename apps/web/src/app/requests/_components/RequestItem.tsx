import { StatusBadge } from "./StatusBadge";
import type { Request } from "./types";

interface RequestItemProps {
  request: Request;
}

export function RequestItem({ request }: RequestItemProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
      <div>
        <p className="font-medium text-gray-900">{request.title}</p>
        <p className="text-sm text-gray-500">
          {request.user} • {request.date}
        </p>
      </div>

      <StatusBadge status={request.status} />
    </div>
  );
}