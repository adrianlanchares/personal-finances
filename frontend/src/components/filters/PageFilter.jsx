const INITIAL_PAGE = 1;

export default function PageFilter({currentPage, setCurrentPage}) {
  function changePage(page) {
    page = Math.max(INITIAL_PAGE, page);
    setCurrentPage(page);
  }
  return (
    <div className="PageFilter">
      <button onClick={() => changePage(currentPage - 1)} disabled={currentPage===INITIAL_PAGE}>&lt;</button>
      <p>{currentPage}</p>
      {/* <input type="number" value={currentPage} onChange={(e) => changePage(e.target.value)}/> */}
      <button onClick={() => changePage(currentPage + 1)}>&gt;</button>
    </div>
  );
}