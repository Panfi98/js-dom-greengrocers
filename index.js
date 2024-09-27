const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.45,
      type: 'vegitable'
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      type: 'vegitable'
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.25,
      type: 'fruit'

    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.15,
      type: 'fruit'
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.46,
      type: 'vegitable'
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.15,
      type: 'fruit'
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.25,
      type: 'vegitable'
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.95,
      type: 'berry'
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      type: 'berry'
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.65,
      type: 'vegitable'
    }
  ],
  cart: []
};

const storeItemList = document.querySelector('.store--item-list')
const cartItemList = document.querySelector('.cart--item-list')
const total = document.querySelector('.total-number')

function renderStoreItems(type = 'All') {

  if (type === 'All') {

    state.items.forEach((item) => {

      const li = document.createElement('li');

      const divs = document.createElement('div');
      divs.className = 'store--item-icon';
      li.appendChild(divs);

      const img = document.createElement('img');
      img.src = `assets/icons/${item.id}.svg`;
      img.alt = item.name;
      divs.appendChild(img);

      const button = document.createElement('button');
      button.textContent = 'Add to cart';
      button.addEventListener('click', () => {
        addItemToCart(item)
      })
      li.appendChild(button);


      storeItemList.appendChild(li);

    }
    )
  }
  else {
    state.items.filter(item => item.type === type).forEach(item => {

      const li = document.createElement('li');

      const divs = document.createElement('div');
      divs.className = 'store--item-icon';
      li.appendChild(divs);

      const img = document.createElement('img');
      img.src = `assets/icons/${item.id}.svg`;
      img.alt = item.name;
      divs.appendChild(img);

      const button = document.createElement('button');
      button.textContent = 'Add to cart';
      button.addEventListener('click', () => {
        addItemToCart(item)
      })
      li.appendChild(button);


      storeItemList.appendChild(li);
    }
    )
  }
}

function sortFunction(order) {
  if (order === 'byAlphabet') {
    storeItemList.innerHTML = '';
    state.items.sort((a, b) => a.name.localeCompare(b.name))
    renderStoreItems()
  } else if (order === 'byPrice'){
    storeItemList.innerHTML ='';
    state.items.sort((a,b) => a.price - b.price)
    renderStoreItems()
  } else {
    renderStoreItems()
  }
}

function renderCartItems() {

  cartItemList.innerHTML = ''; // Clear the cart before re-rendering
  state.cart.forEach((item) => {

    const li = document.createElement('li')

    const img = document.createElement('img')
    img.className = 'cart--item-icon'
    img.src = `assets/icons/${item.id}.svg`
    img.alt = item.name
    li.appendChild(img)

    const p = document.createElement('p')
    p.textContent = item.name
    li.appendChild(p)

    const decButton = document.createElement('button')
    decButton.className = "quantity-btn remove-btn center"
    decButton.textContent = "-"
    decButton.addEventListener('click', () => {
      decrementItem(item)
    })
    li.appendChild(decButton)

    const span = document.createElement('span')
    span.className = 'quantity-text center'
    span.textContent = item.quantity
    li.appendChild(span)

    const incButton = document.createElement('button')
    incButton.className = "quantity-btn add-btn center"
    incButton.textContent = "+"
    incButton.addEventListener('click', () => {
      addItemToCart(item)
    })
    li.appendChild(incButton)

    cartItemList.appendChild(li)
  })
}

function addItemToCart(item) {
  const targetItem = state.cart.find((cartItem) => cartItem.id === item.id)

  if (targetItem) {
    targetItem.quantity += 1
  } else {
    state.cart.push({ ...item, quantity: 1 })
  }
  renderCartItems()
  calculateTotal()
}

function decrementItem(item) {
  const targetItem = state.cart.find((cartItem) => cartItem.id === item.id)
  targetItem.quantity--

  if (targetItem.quantity === 0) {
    state.cart.splice(state.cart.indexOf(targetItem), 1)
  }
  renderCartItems()
  calculateTotal()
}

function calculateTotal() {
  let totalA = 0

  state.cart.forEach((item) => {
    totalA += item.price * item.quantity
  })
  total.textContent = `£${totalA.toFixed(2)}`
}


function filterFunction(type) {
  storeItemList.innerHTML = '';
  renderStoreItems(type)
}
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function myFunction1() {
  document.getElementById("mySortDropdown").classList.toggle("show")
}

renderStoreItems();
renderCartItems()