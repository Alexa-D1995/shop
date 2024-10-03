async function init() {
  const response = await fetch("https://dummyjson.com/products");
  const result = await response.json();
  render(result);
}

async function loadMore() {
  const itemNumber = document.querySelectorAll("li");

  const response = await fetch(
    `https://dummyjson.com/products/?limit=10&skip=${itemNumber.length}`
  );
  const result = await response.json();
  render(result);
}

function render(result) {
  const itemsContainer = document.querySelector(".items-container");
  result.products.forEach((product) => {
    const title = document.createElement("h3");
    const titleContent = document.createTextNode(product.title);
    title.appendChild(titleContent);

    const description = document.createElement("span");
    const descriptionContent = document.createTextNode(product.description);
    description.appendChild(descriptionContent);

    const price = document.createElement("p");
    const priceContent = document.createTextNode(product.price);
    price.appendChild(priceContent);

    const productImg = document.createElement("img");
    productImg.src = product.thumbnail;

    const itemCard = document.createElement("li");
    itemCard.append(productImg, title, description, price);

    itemsContainer.appendChild(itemCard);
  });
}

const btnTop = document.querySelector(".btn-top");
btnTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const btnLoad = document.querySelector(".btn-load-more");

btnLoad.addEventListener("click", loadMore);
