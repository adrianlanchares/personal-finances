function CategoryFilter({category, setCategory}) {
  return (
    <div className="CategoryFilter">
      <p>
        <strong>Category<br/></strong>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category"/>
      </p>
    </div>
  );
}