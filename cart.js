const items = localStorage.getItem("produse");
console.log(JSON.parse(items));

const products = JSON.parse(items);
const productsContainer = document.querySelector(".products");

products.forEach((product) => {
  //titlu
  const title = document.createElement("h3");
  const titleContent = document.createTextNode(product.title);
  title.appendChild(titleContent);

  //descriere
  const price = document.createElement("p");
  const priceContent = document.createTextNode(product.price);
  price.appendChild(priceContent);

  //imagine
  const image = document.createElement("img");
  image.src = product.thumbnail;

  const plusButton = document.createElement("button");
  const plusButtonContent = document.createTextNode("➕");
  plusButton.appendChild(plusButtonContent);

  const minusButton = document.createElement("button");
  const minusButtonContent = document.createTextNode("➖");
  minusButton.appendChild(minusButtonContent);
  if (product.quantity === 1) {
    minusButton.disabled = true;
  }

  const deleteButton = document.createElement("button");
  const deleteButtonContent = document.createTextNode("🗑️");
  deleteButton.appendChild(deleteButtonContent);

  const quantity = document.createElement("span");
  const quantityContent = document.createTextNode(product.quantity);
  quantity.appendChild(quantityContent);

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("btn-container");
  btnContainer.append(plusButton, quantity, minusButton, deleteButton);

  const productCard = document.createElement("div");
  productCard.append(title, price, image, btnContainer);
  productCard.classList.add("product-card");

  productsContainer.append(productCard);
});
