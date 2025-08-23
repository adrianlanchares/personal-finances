function AccountFilter({account, setAccount}) {
  return (
    <div className="AccountFilter">
      <p>
        <strong>Account<br/></strong>
        <input type="text" value={account} onChange={(e) => setAccount(e.target.value)} placeholder="Account"/>
      </p>
    </div>
  );
}