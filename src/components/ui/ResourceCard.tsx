import Card from "./Card";
import Button from "./Button";
import { Edit, Trash } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

interface ResourceCardProps {
  id: string;
  name: string;
  description?: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onBook?: (id: string) => void; // 👈 NEW prop
  className?: string;
}

const ResourceCard = ({
  id,
  name,
  description,
  onEdit,
  onDelete,
  onBook,
  className = "",
}: ResourceCardProps) => {
  const { user } = useAuth();

  return (
    <Card className={`p-4 space-y-2 ${className}`}>
      {/* Resource Info */}
      <div className="flex flex-col">
        <h3 className="text-lg font-bold text-gray-900">{name}</h3>
        {description && <p className="text-gray-600">{description}</p>}
      </div>

      {/* User Book Action */}
      {user && user.role !== "admin" && onBook && (
        <div className="mt-3">
          <Button variant="primary" onClick={() => onBook(id)}>
            Book Now
          </Button>
        </div>
      )}

      {/* Admin Actions */}
      {user?.role === "admin" && (onEdit || onDelete) && (
        <div className="flex gap-2 mt-3">
          {onEdit && (
            <Button variant="info" onClick={() => onEdit(id)}>
              <Edit className="w-4 h-4 mr-1" /> Edit
            </Button>
          )}
          {onDelete && (
            <Button variant="danger" onClick={() => onDelete(id)}>
              <Trash className="w-4 h-4 mr-1" /> Delete
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};

export default ResourceCard;
