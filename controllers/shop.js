const Product = require('../models/product');

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
  console.log(prodId);
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
  res.render('shop/cart',{
    prods :'/cart',
    pageTitle : 'Your carts'
  })
}

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