import { Input } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import type { IDuty } from "../types";

type Props = {
  duty: IDuty;
  isEditing: boolean;
  editingText: string;
  submitting: boolean;
  onEditStart: (id: string, name: string) => void;
  onEditCancel: () => void;
  onEditConfirm: () => void;
  onEditTextChange: (text: string) => void;
  onDelete: (id: string) => void;
};

export default function DutyListItem({
  duty,
  isEditing,
  editingText,
  submitting,
  onEditStart,
  onEditCancel,
  onEditConfirm,
  onEditTextChange,
  onDelete,
}: Props) {
  return (
    <li className="border-slate-200 border rounded-lg p-3 w-full bg-slate-50 text-slate-700 hover:border-blue-400 transition-colors">
      <div className="flex items-center justify-between gap-2">
        {isEditing ? (
          <>
            <Input
              value={editingText}
              onChange={(e) => onEditTextChange(e.target.value)}
              onPressEnter={onEditConfirm}
              disabled={submitting}
              autoFocus
              className="flex-1 h-8"
            />
            <div className="flex gap-3">
              <CheckOutlined
                className="cursor-pointer hover:scale-125 transition-all text-lg text-green-600"
                onClick={onEditConfirm}
              />
              <CloseOutlined
                className="cursor-pointer hover:scale-125 transition-all text-lg text-red-600"
                onClick={onEditCancel}
              />
            </div>
          </>
        ) : (
          <>
            <p className="font-medium flex-1 leading-8">{duty.name}</p>
            <div className="flex gap-5">
              <EditOutlined
                className="cursor-pointer hover:scale-125 transition-all text-lg"
                onClick={() => onEditStart(duty.id, duty.name)}
              />
              <DeleteOutlined
                className="cursor-pointer hover:scale-125 transition-all text-lg"
                onClick={() => onDelete(duty.id)}
              />
            </div>
          </>
        )}
      </div>
    </li>
  );
}
