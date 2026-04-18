import SubHello from "./SubHello";
function Hello({ title, subtitle }) {
  // console.log(props);
  //   const {title, subtitle} = props
  if (title === "Title 1") {
    return <h1>It's raining today</h1>;
  }
  return (
    <>
      <h2>{title}</h2>
      <SubHello sub={subtitle} />
    </>
  );
}
export default Hello;
