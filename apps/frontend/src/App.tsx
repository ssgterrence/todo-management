import { useState } from "react";
import { useDuties } from "./hooks/useDuties";
import { Button } from "antd";
import AddDutyDialog from "./components/AddDutyDialog";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { deleteDuty } from "./apis/hub";

function App() {
  const { duties, loading, error, refetch } = useDuties();
  const [editingId, setEditingId] = useState<string | null>(null);
  const editingDuty = duties.find((d) => d.id === editingId) ?? null;

  const handleDeleteDuty = async (id: string) => {
    await deleteDuty(id);
    await refetch();
  };
  return (
    <div className="flex min-h-screen p-4 items-center justify-center bg-slate-50">
      <div className="w-full max-w-md space-y-4">
        <div
          id="duties"
          className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
        >
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Duty List</h1>

          {loading && (
            <p className="text-slate-400 animate-pulse text-sm">Loading...</p>
          )}
          {error && <p className="text-red-500 text-sm">Error: {error}</p>}

          {!loading && !error && (
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
                    <p className="font-medium">{duty.title || duty.title}</p>
                    <div className="flex gap-5">
                      <EditOutlined
                        className="cursor-pointer hover:text-blue-500 transition-colors"
                        onClick={() => {
                          setEditingId(duty.id);
                        }}
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
          )}
        </div>

        <div
          id="create-duty"
          className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
        >
          <Button type="primary" onClick={() => setEditingId("")}>
            Add
          </Button>
          <AddDutyDialog
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
