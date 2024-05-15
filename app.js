const loadAllProducts = () =>{
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(data=>{
                displayProducts(data)
            })
}

loadAllProducts()

let cartItemsCount = 0;
document.getElementById("cart-item-count").innerText=cartItemsCount;

const displayProducts = (products) =>{
    const porductsContainer = document.getElementById("products-container");
    
    products.forEach(product => {
        // console.log(product)
        const div= document.createElement("div")
        // div.classList.add("card")
        div.innerHTML = `
        <div class="col">
            <div class="card ">
                <div class="d-flex justify-content-center align-items-center card-header">
                    <img src="${product.image}" class="card-img-top w-50" alt="...">
                </div>
                <div class="card-body bg-dark-subtle">
                    <h5 class="card-title">${product.title}</h5>
                    <h6 class="text-success">Price: $${product.price} </h6>
                    <p class="card-text">${product.description}</p>
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center bg-dark-subtle">

                    <button onclick="singleProduct('${product.id}')" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                   
                    <button onclick="handleAddToCart('${product.title}', '${product.price}')" class="btn btn-outline-primary">Add To Cart </button>
                </div>
            </div>
        </div>
        `
        porductsContainer.appendChild(div)

    });
}

const handleAddToCart = (title, price) =>{
    // console.log(title, price)
    const cartContainer = document.getElementById("cart-container")

    const div = document.createElement("div")

    div.innerHTML = `
    
        <div class="border-bottom mx-0 border-dark d-flex justify-content-between align-items-center row">
            <p class="m-0 px-0 col-8">${title}</p>
            <p class="m-0 px-0 col-4 text-end ">$<span class="cart-item-price">${price}</span></p>
        </div>

    `
    cartContainer.appendChild(div)
    cartItemsCount ++;
    document.getElementById("cart-item-count").innerText = cartItemsCount;
    totalPriceUpdate();
}

const totalPriceUpdate = () => {
    const allCartItemsPrice = document.getElementsByClassName("cart-item-price")
    let total = 0;
    for ( const element of allCartItemsPrice){
        total = total + parseFloat(element.innerText);
    }
    document.getElementById("total-price").innerText = total.toFixed(2);
}

const singleProduct = (id) => {
    fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res=>res.json())
            .then(data=>{
                viewSingleProduct(data)
            })
}

const viewSingleProduct = (product) => {
    const title = document.getElementById("single-product-title")
    const body = document.getElementById("single-product-body")
    console.log(product.title)
    title.innerText = product.title

    body.innerHTML = `
    <div class="card mb-3" ">
        <div class="row g-0">
            <div class="col-md-4 d-flex justify-content-center align-items-center">
                <img src=${product.image} class="img-fluid rounded-start" alt="...">
            </div>
            
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title text-success">Price: $<span id="single-product-price">${product.price} </span> </h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text"><small class="text-body-secondary">Category: ${product.category} </small></p>
                </div>
            </div>
        </div>
    </div>
    `
}