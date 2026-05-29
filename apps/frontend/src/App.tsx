import { useState } from "react";
import { useDuties } from "./hooks/useDuties";
import { useInlineEdit } from "./hooks/useInlineEdit";
import { useDeleteDuty } from "./hooks/useDeleteDuty";
import { Button } from "antd";
import AddDutyDialog from "./components/AddDutyDialog";
import DutyList from "./components/DutyList";
import ErrorPage from "./components/ErrorPage";

function App() {
  const { duties, loading, error, isBackendDown, refetch } = useDuties();
  const [showAddDialog, setShowAddDialog] = useState(false);

  const {
    editingId,
    editingText,
    submitting,
    setEditingText,
    startEdit,
    cancelEdit,
    confirmEdit,
  } = useInlineEdit(refetch);

  const { confirmDelete } = useDeleteDuty(refetch);
  if (isBackendDown) {
    return <ErrorPage onRetry={refetch} />;
  }

  return (
    <div className="flex min-h-screen p-4 items-center justify-center bg-slate-50">
      <div className="w-full max-w-md space-y-4">
        <DutyList
          duties={duties}
          loading={loading}
          error={error}
          editingId={editingId}
          editingText={editingText}
          submitting={submitting}
          onEditStart={startEdit}
          onEditCancel={cancelEdit}
          onEditConfirm={confirmEdit}
          onEditTextChange={setEditingText}
          onDelete={confirmDelete}
        />

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
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
