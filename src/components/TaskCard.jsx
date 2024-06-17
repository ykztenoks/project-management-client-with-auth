function TaskCard({ title, status, _id }) {
  return (
    <div className="TaskCard card" key={_id}>
      <h3>{title}</h3>
      <h4>Status:</h4>
      <p>{status}</p>
    </div>
  );
}

export default TaskCard;
