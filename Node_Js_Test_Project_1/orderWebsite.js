const myOrder = document.querySelector(".my-form");
const UserPrice = document.getElementById("price");
const UserProduct = document.getElementById("product");
let value = 0;

myOrder.addEventListener("submit", NewOrder);

function NewOrder(e) {
  e.preventDefault();
  if (UserPrice.value === "" || UserProduct.value === "") {
    alert("Please Fill The Deatils");
  } else {
    try {
      let price = UserPrice.value;
      let product = UserProduct.value;

      const Object = {
        price,
        product,
      };
      axios
        .post("http://localhost:3000/user/add-order", Object)
        .then((response) => {
          showScreen(response.data.newOrder);
        });

      UserPrice.value = "";
      UserProduct.value = "";
    } catch (error) {
      console.log(error);
    }
  }
}

function showScreen(Object) {
  
  const parent = document.getElementById("user");
  const child = document.createElement("li");

  child.appendChild(
    document.createTextNode(`${Object.amount}: ${Object.product}`)
  );

  // delete button
  const deleteOrder = document.createElement("input");
  deleteOrder.value = "Delete Order";
  deleteOrder.id = "deleteButton";
  deleteOrder.type = "button";

  deleteOrder.onclick = (e) => {
    // if (confirm("Are You Sure?")) {
    axios
      .delete(`http://localhost:3000/user/delete-order/${Object.id}`)
      .then((response) => {
        parent.removeChild(child);
        value -= Object.amount;
        document.getElementById("total").textContent = 'Total Value Worth of Product : Rs '+value;
      })
      .catch((error) => {
        console.log(error);
        document.body.innerHTML =
          document.body.innerHTML + "<h4>something went wrong</h4>";
      });
    // };
  };

  child.appendChild(deleteOrder);
  parent.appendChild(child);

  const x = parseInt(Object.amount);
  value += x;

  document.getElementById("total").textContent = 'Total Value Worth of Product : Rs '+value;
}

window.addEventListener("DOMContentLoaded", fetchData);
function fetchData(e) {
  axios.get("http://localhost:3000/user/get-order").then((response) => {
    console.log(response);
    for (let i = 0; i < response.data.allOrder.length; i++) {
      showScreen(response.data.allOrder[i]);
    }
  });
}
