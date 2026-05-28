import { useDuties } from "./hooks/useDuties";
function App() {
  const { duties, loading, error } = useDuties();
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
                  {duty.title || duty.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div
          id="create-duty"
          className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
        >
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            Add Duty
          </h2>
        </div>
      </div>
    </div>
  );
}

export default App;
