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
  plusButton.addEventListener("click", () => increaseQuantity(product.id));

  const minusButton = document.createElement("button");
  const minusButtonContent = document.createTextNode("➖");
  minusButton.appendChild(minusButtonContent);
  minusButton.addEventListener("click", () => decreaseQuantity(product.id));
  if (product.quantity === 1) {
    minusButton.disabled = true;
  }

  const deleteButton = document.createElement("button");
  const deleteButtonContent = document.createTextNode("🗑️");
  deleteButton.appendChild(deleteButtonContent);
  deleteButton.addEventListener("click", () => deleteProduct(product.id));

  const quantity = document.createElement("span");
  const quantityContent = document.createTextNode(product.quantity);
  quantity.appendChild(quantityContent);

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("buttons-container");
  btnContainer.append(plusButton, quantity, minusButton, deleteButton);

  const productCard = document.createElement("div");
  productCard.setAttribute("id", `product-${product.id}`);
  productCard.append(title, price, image, btnContainer);
  productCard.classList.add("product-card");

  productsContainer.append(productCard);
});

function deleteProduct(id) {
  const updatedProducts = products.filter((product) => id !== product.id);
  console.log(updatedProducts);
  localStorage.setItem("produse", JSON.stringify(updatedProducts));
  const productCard = document.querySelector(`#product-${id}`);
  productCard.remove();
}

function decreaseQuantity(id) {
  const newProducts = localStorage.getItem("produse");
  const parsedProducts = JSON.parse(newProducts);
  const updatedProducts = parsedProducts.map((product) => {
    if (product.id === id) {
      const productQuantity = document.querySelector(`#product-${id} span`);
      productQuantity.innerHTML = product.quantity - 1;
      if (product.quantity - 1 === 1) {
        const minusButton = document.querySelectorAll(
          `#product-${id} button`
        )[1];
        minusButton.disabled = true;
      }
      return {
        ...product,
        quantity: product.quantity - 1,
      };
    } else {
      return product;
    }
  });
  localStorage.setItem("produse", JSON.stringify(updatedProducts));
}

function increaseQuantity(id) {
  const newProducts = localStorage.getItem("produse");
  const parsedProducts = JSON.parse(newProducts);
  const updatedProducts = parsedProducts.map((product) => {
    if (product.id === id) {
      const productQuantity = document.querySelector(`#product-${id} span`);
      productQuantity.innerHTML = product.quantity + 1;
      if (product.quantity + 1 === 2) {
        const minusButton = document.querySelectorAll(
          `#product-${id} button`
        )[1];
        minusButton.disabled = false;
      }
      return {
        ...product,
        quantity: product.quantity + 1,
      };
    } else {
      return product;
    }
  });
  localStorage.setItem("produse", JSON.stringify(updatedProducts));
}