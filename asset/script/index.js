class Product{
    constructor(title, price, imgUrl){
        this.title = title;
        this.price=price;
        this.imgUrl=imgUrl;
    }
}
class ShoppingCart{
    items = [];

    addProduct(prod){
        this.items.push(prod);
        console.log(this.items);
        this.sum = this.items.reduce((a, b)=>{
            return a+b.price;
        },0)
        this.totalPrice.textContent = `Price: \$${this.sum.toFixed(2)}`;
        this.totalCont.textContent = `${this.items.length===1? this.items.length + " Item":this.items.length + " Items"} in your cart`;
        console.log(this.sum);
        this.checkOutBtn.textContent='Check Out';
    }
    render(){
        let cartEle = document.createElement('div');
        cartEle.className = 'cart';
        cartEle.innerHTML = `
            <h3 class = prod-count>${0} Item in your cart</h3>
            <h4 class = 'cart-price'>Price: \$${0}</h4>
            <button>Check Out</button>
        `;
        this.checkOutBtn = cartEle.querySelector('button');
        this.checkOutBtn.addEventListener('click', this.checkOut.bind(this));
        this.totalPrice = cartEle.querySelector('.cart-price');
        this.totalCont = cartEle.querySelector('.prod-count');

        return cartEle;
    }
    checkOut(){
        this.items = [];
        this.totalCont.innerHTML = `<h1>Tank Your For Ordering!</h1>`;
        setTimeout(()=>{
            this.totalCont.textContent = '';
            this.totalPrice.textContent ='';
            this.checkOutBtn.textContent = '';
        }, 3000);
    }
}
class ProductItem{
    constructor(product){
        this.product = product;
    }
    addToCart(){
        App.addProductToCart(this.product);
    }
    render(){
        let prodItem = document.createElement('div');
        prodItem.className = 'prod-item';
        prodItem.innerHTML = `
            <div class='prod-title'>${this.product.title}</div>
            <div class='prod-price'>Price: \$${this.product.price}</div>
            <div class = 'img-container'>
                <img src="${this.product.imgUrl}" alt="${this.product.title}">
            </div>
            <button>Add to Cart</button>
        `;
        prodItem.querySelector('button').addEventListener('click', this.addToCart.bind(this));
        return prodItem;
    }
}
class Shop{
    render(){
        let shopEle = document.getElementById('prod-container');
        let prodList = new ProductsList();
        let prodListEle = prodList.render();
        this.cartList = new ShoppingCart();
        let cartEle = this.cartList.render();
        shopEle.append(cartEle);
        shopEle.append(prodListEle);
    }
}
class ProductsList{
    products = [
        new Product('Canon 5D MK IV', 2499.99, 'https://www.abesofmaine.com/files/AB/product/large/canon_eos_5d_mark_iv_dslr_camera_body_only__1030344.jpg'),
        new Product('Sony A7S III', 3499.99, 'https://shop.texasmediasystems.com/assets/images/new2.PNG'),
        new Product('Canon 1DX MK III', 5499.99, 'https://cdn.mos.cms.futurecdn.net/58JntMbF2dWJzqRwsaksAm.jpg'),
    ];
    
    render(){
        let prodListEle = document.createElement('div');
        prodListEle.className = 'prod-list';
        this.products.forEach(product=>{
            let prodItem = new ProductItem(product);
            let prod_ele = prodItem.render();
            prodListEle.append(prod_ele);
        })
        return prodListEle;
    }
}
class App{
    static init(){
        let shop = new Shop();
        shop.render();
        this.cart = shop.cartList;
    }
    static addProductToCart(prod){
        this.cart.addProduct(prod);
    }
}
App.init();