import { useRef, useState } from "react";
import { useDuties } from "./hooks/useDuties";
import { Button, message } from "antd";
import AddDutyDialog from "./components/AddDutyDialog";
import {
  DeleteOutlined,
  EditOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import { deleteDuty } from "./apis/hub";

function App() {
  const { duties, loading, error, refetch } = useDuties();
  const [editingId, setEditingId] = useState<string | null>(null);
  const editingDuty = duties.find((d) => d.id === editingId) ?? null;

  const ADD_DIALOG_ID = "__add__";
  const listRef = useRef<HTMLDivElement | null>(null);

  const handleDeleteDuty = async (id: string) => {
    try {
      await deleteDuty(id);
      message.success("Duty deleted");
      await refetch();
    } catch (err) {
      message.error(err instanceof Error ? err.message : "Delete failed");
    }
  };
  return (
    <div className="flex min-h-screen p-4 items-center justify-center bg-slate-50">
      <div className="w-full max-w-md space-y-4">
        <div
          id="duties"
          className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
        >
          <div id="header" className="flex items-center gap-4 mb-3">
            <ScheduleOutlined className="text-4xl" />
            <h1 className=" text-2xl font-bold text-slate-800 ">Duty List</h1>
          </div>

          {loading && (
            <p className="text-slate-400 animate-pulse text-sm">Loading...</p>
          )}
          {error && <p className="text-red-500 text-sm">Error: {error}</p>}

          {!loading && !error && (
            <div className="relative group">
              <div
                ref={listRef}
                className={
                  duties.length > 6 ? "max-h-80 overflow-y-auto pr-2" : ""
                }
              >
                <ul className="space-y-2">
                  {duties.map((duty) => (
                    <li
                      key={duty.id}
                      className="border-slate-200 border rounded-lg p-3 w-full bg-slate-50 text-slate-700 hover:border-blue-400 transition-colors"
                    >
                      <div
                        id="inline-text-container"
                        className="flex items-center justify-between"
                      >
                        <p className="font-medium">{duty.title}</p>
                        <div className="flex gap-5">
                          <EditOutlined
                            className="cursor-pointer hover:text-blue-500 transition-colors"
                            onClick={() => setEditingId(duty.id)}
                          />
                          <DeleteOutlined
                            className="cursor-pointer hover:text-red-700 transition-colors"
                            onClick={() => handleDeleteDuty(duty.id)}
                          />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div
          id="create-duty"
          className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
        >
          <Button type="primary" onClick={() => setEditingId(ADD_DIALOG_ID)}>
            Add
          </Button>
          <AddDutyDialog
            id={
              editingId && editingId !== ADD_DIALOG_ID ? editingId : undefined
            }
            open={editingId !== null}
            title={editingDuty?.title ?? ""}
            onClose={() => setEditingId(null)}
            onCreated={refetch}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
