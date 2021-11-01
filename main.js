// CONTENTFUL JS


// select DOM elements
const cartBtn = document.querySelector(".cart-btn")
const cartItems = document.querySelector(".cart-items")
const productsCenter = document.querySelector(".products-center")
const bagBtn = document.querySelector(".bag-btn")
const cartClose = document.querySelector(".close-cart")
const remove = document.querySelector(".remove-item")
const cartTotal = document.querySelector(".cart-total")
const clearCart = document.querySelector(".clear-cart")

// GLOBAL VARIABLES
let buttonsDOM = []
let cart = []

// EVENT LISTNERS
// before content loaded
document.addEventListener( "DOMContentLoaded", initializeApp )


// FUNCTIONS
function initializeApp() {
    // instantiate class
    const ui = new UI()
    const Products = new PRODUCTS()

    STORAGE.getCart()

    try {
        Products.getProducts()
        .then( data => {
            let products = data.items
            // distruct object
            products = products.map( product => {
                const {id} = product.sys
                const {title,price} = product.fields
                const image = product.fields.image.fields.file.url
                return {id,title,price,image}
            })
            Products.displayProducts(products)
            STORAGE.saveProducts(products)
            return products
        })
        .then( () => {
            ui.getBagButtons()
        }) 
       
    } catch (error) {
        console.log(error)
    }
     
}


// CLASSES
class UI {
   getBagButtons() {
      // get all butttons
      const buttons = [...document.querySelectorAll(".bag-btn")]
      buttonsDOM = buttons

      buttons.forEach( button => {
          const id = button.dataset.id
          const inCart = cart.find( item => item.id === id)
          if(inCart) {
              button.disabled = true
              button.innerText = "In Cart"
          }
          button.addEventListener( "click", e => {
              e.target.innerText = "In Cart"
              e.target.disabled = true
              const id = e.target.dataset.id

              // get product from products
              let cartItem = {...STORAGE.getProduct(id),amount:1}

              // add product to cart
              cart = [...cart,cartItem]
        
              console.log(cart);
              // save cart in local storage
              STORAGE.saveCart()

              // set cart values
              this.setCartValues(cart)
              // display cart item
              
              // show the cart

          })
      })
   }
   setCartValues(cart) {
       let tempTotal = 0
       let totalItems = 0
       cart.map( item => {
           tempTotal += item.price * item.amount
           totalItems += item.amount 
       })
       cartItems.innerText = totalItems
       cartTotal.innerText = tempTotal       
   }
}

class STORAGE {
    // local storage
    static saveProducts(products) {
       localStorage.setItem("products", JSON.stringify(products))
    }
    static getCart() {
        return localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("item")) : [] 
    }
    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem("products"))
        const product = products.find( product => product.id === id)
        return product
    }
    static saveCart() {
        localStorage.setItem("cart",JSON.stringify(cart))
    }
}

class PRODUCTS {

   async getProducts() {
       // get poducts using fetch API
       const response = await fetch("products.json")
       const result = await response.json()
       return result
   }
 
   // render products on page
   displayProducts(products) {
       products = products.map( product => {
           return `<!-- single product -->
           <article class="product">
             <div class="img-container">
                 <img class="product-img" src=${product.image} alt="product">
                 <button class="bag-btn" data-id=${product.id}>
                     <i class="fas fa-shopping-cart"></i>
                     add to bag
                 </button>
             </div>
             <h3>${product.title}</h3>
             <h3>$${product.price}</h3>
         </article>
         <!-- single product END-->`
       })
       products = products.join('')
       productsCenter.innerHTML = products      
   }    
    
}





