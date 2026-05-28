import { useDuties } from "./hooks/useDuties";
function App() {
  const { duties, loading, error } = useDuties();
  return (
    <>
      <div id="container" className="bg-amber-100">
        <div id="duties" className="bg-amber-200">
          <h1 className="text-2xl font-bold mb-4">職責列表</h1>
          {loading && <p>載入中...</p>}
          {error && <p className="text-red-500">錯誤: {error}</p>}
          {!loading && !error && (
            <ul>
              {duties.map((duty) => (
                <li key={duty.id} className="mb-2">
                  {duty.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div id="create-duty" className="bg-amber-300 mt-4 p-4">
          <h2 className="text-xl font-semibold mb-2">新增職責</h2>
          <p>這裡可以放置一個表單來新增職責</p>
        </div>
      </div>
    </>
  );
}

export default App;
