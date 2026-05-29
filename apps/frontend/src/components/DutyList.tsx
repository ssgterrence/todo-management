import { useRef } from "react";
import { ScheduleOutlined } from "@ant-design/icons";
import type { IDuty } from "../types";
import DutyListItem from "./DutyListItem";

type Props = {
  duties: IDuty[];
  loading: boolean;
  error: string | null;
  editingId: string | null;
  editingText: string;
  submitting: boolean;
  onEditStart: (id: string, name: string) => void;
  onEditCancel: () => void;
  onEditConfirm: () => void;
  onEditTextChange: (text: string) => void;
  onDelete: (id: string) => void;
};

export default function DutyList({
  duties,
  loading,
  error,
  editingId,
  editingText,
  submitting,
  onEditStart,
  onEditCancel,
  onEditConfirm,
  onEditTextChange,
  onDelete,
}: Props) {
  const listRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      <div className="flex items-center gap-4 mb-3">
        <ScheduleOutlined className="text-4xl" />
        <h1 className="text-2xl font-bold text-slate-800">Duty List</h1>
      </div>

      {loading && (
        <p className="text-slate-400 animate-pulse text-sm">Loading...</p>
      )}
      {error && <p className="text-red-500 text-sm">Error: {error}</p>}

      {!loading && !error && (
        <div className="relative group">
          <div
            ref={listRef}
            className={duties.length > 6 ? "max-h-80 overflow-y-auto pr-2" : ""}
          >
            <ul className="space-y-2">
              {duties.map((duty) => (
                <DutyListItem
                  key={duty.id}
                  duty={duty}
                  isEditing={editingId === duty.id}
                  editingText={editingText}
                  submitting={submitting}
                  onEditStart={onEditStart}
                  onEditCancel={onEditCancel}
                  onEditConfirm={onEditConfirm}
                  onEditTextChange={onEditTextChange}
                  onDelete={onDelete}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
