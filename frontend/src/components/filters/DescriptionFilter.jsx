export default function DescriptionFilter({description, setDescription}) {
  return (
    <div className="DescriptionFilter">
      <p>
        <strong>Description<br/></strong>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"/>
      </p>
    </div>
  );
}