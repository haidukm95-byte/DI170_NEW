async function getData(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    render(data);
  } catch (error) {
    console.log(error);
  }
}

const render = (arr) => {
  const html = arr.map((item) => {
    return `<div class="box">
        <h2>${item.name}</h2>
        <p>${item.price}</p>
        </div>`;
  });
  document.getElementById("root").innerHTML = html.join("");
};

getData("http://localhost:3001/api/products");
