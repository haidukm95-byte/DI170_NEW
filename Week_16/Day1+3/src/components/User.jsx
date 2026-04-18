import './user.css'
function User({ name, email }) {
  //    const {name, email} = props

  const userStyle = {
    display: "inline-block",
    margin: "20px",
    padding: "20px",
    border: "1px solid #000",
    backgroundColor: "lightcoral",
  };

  return (
    <>
      <div className='box'>
        <h2>{name}</h2>
        <p>{email}</p>
      </div>
    </>
  );
}
export default User;
