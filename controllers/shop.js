const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
      });
    });
  };

exports.getProduct = (req,res,next)=>{
  //access id in url /products/:productId
  const prodId = req.params.productId;
  console.log(Product.findById(prodId,product=>{
    res.render('shop/product-detail',{
      product: product,
      pageTitle: product.title,
      path:'/products'
    })
  }));
  res.redirect('/');
}


exports.getIndex = (req, res, next)=>{
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
}

exports.getCart = (req, res, next) =>{
  Cart.getCart(cart =>{
    Product.fetchAll(products =>{
      const cartProducts = [];
      for(product of products){
        const cartProductData = cart.product.find(prod => prod.id === product.id);
        if(cartProductData){
          cartProducts.push({productsData : product, qty: cartProductData.qty});
        }
      }
      res.render('shop/cart',{
        prods :'/cart',
        pageTitle : 'Your carts',
        products: cartProducts
      })
    })
  })

}

exports.postCart = (req,res,next) =>{
  const prodId = req.body.productId;
  Product.findById(prodId, (product)=>{
    Cart.addProduct(prodId, product.price);
  })
  res.redirect('/cart');
};

exports.getOrders = (req, res, next) =>{
  res.render('shop/orders',{
    prods :'/orders',
    pageTitle : 'Your Orderss'
  })
}

exports.getCheckout = ( req, res , nect) =>{
  res.render('shop/checkout',{
    path:'/checkout',
    pageTitle:'Checkout'
  })
}