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
let cart = []



// EVENT LISTNERS
document.addEventListener( "DOMContentLoaded", initializeApp )


// FUNCTIONS
function initializeApp() {
    // instantiate class
    const ui = new UI()
    const Products = new PRODUCTS()

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
            return products
        })
    } catch (error) {
        console.log(error)
    }
     
}


// CLASSES
class UI {

}

class STORAGE {
    // local storage
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



