import { useRef, useState } from "react";
import { useDuties } from "./hooks/useDuties";
import { Button, Input, message, Modal } from "antd";
import AddDutyDialog from "./components/AddDutyDialog";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import { deleteDuty, editDuty } from "./apis/hub";

function App() {
  const { duties, loading, error, refetch } = useDuties();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const listRef = useRef<HTMLDivElement | null>(null);

  const handleDeleteDuty = async (id: string) => {
    Modal.confirm({
      title: "Delete Duty",
      content: "Are you sure you want to delete this duty?",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await deleteDuty(id);
          message.success("Duty deleted");
          await refetch();
        } catch (err) {
          message.error(err instanceof Error ? err.message : "Delete failed");
        }
      },
    });
  };

  const handleEditStart = (id: string, name: string) => {
    setEditingId(id);
    setEditingText(name);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingText("");
  };

  const handleEditConfirm = async () => {
    if (!editingId || !editingText.trim()) {
      message.error("Name cannot be empty");
      return;
    }

    setSubmitting(true);
    try {
      await editDuty(editingId, editingText.trim());
      message.success("Duty updated");
      await refetch();
      setEditingId(null);
      setEditingText("");
    } catch (err) {
      message.error(err instanceof Error ? err.message : "Update failed");
    } finally {
      setSubmitting(false);
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
                        className="flex items-center justify-between gap-2"
                      >
                        {editingId === duty.id ? (
                          <>
                            <Input
                              value={editingText}
                              onChange={(e) => setEditingText(e.target.value)}
                              onPressEnter={handleEditConfirm}
                              disabled={submitting}
                              autoFocus
                              className="flex-1"
                            />
                            <div className="flex gap-3">
                              <CheckOutlined
                                className="cursor-pointer hover:scale-125 transition-all text-lg "
                                onClick={handleEditConfirm}
                              />
                              <CloseOutlined
                                className="cursor-pointer hover:scale-125 transition-all text-lg"
                                onClick={handleEditCancel}
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <p className="font-medium flex-1">{duty.name}</p>
                            <div className="flex gap-5">
                              <EditOutlined
                                className="cursor-pointer hover:scale-125 transition-all text-lg"
                                onClick={() =>
                                  handleEditStart(duty.id, duty.name)
                                }
                              />
                              <DeleteOutlined
                                className="cursor-pointer hover:scale-125 transition-all text-lg"
                                onClick={() => handleDeleteDuty(duty.id)}
                              />
                            </div>
                          </>
                        )}
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
          <Button type="primary" onClick={() => setShowAddDialog(true)}>
            Add
          </Button>
          <AddDutyDialog
            open={showAddDialog}
            onClose={() => setShowAddDialog(false)}
            onCreated={refetch}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
