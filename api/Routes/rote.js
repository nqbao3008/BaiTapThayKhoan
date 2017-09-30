var mongoose = require('mongoose'),
    ejs = require('ejs'),
    product = mongoose.model('product'),
    cart = mongoose.model('cart');
module.exports = function(app) {

    app.get('/product', (req, res) => {
        ejs.renderFile('./view/product.ejs', {}, (err, html) => {
            res.end(html);
        });
    });

    app.post('/product', (req, res) => {
        var new_product = new product(req.body);
        new_product.save(function(err, product) {
            if (err)
                res.send(err);
            ejs.renderFile('./view/product.ejs', {}, (err, html) => {
                res.end(html);
            });

        });
    });
    app.get('/productlist', (req, res) => {
        product.find({}, function(err, product) {
            if (err)
                res.send(err);
            ejs.renderFile('./view/productlist.ejs', { "product": product }, (err, html) => {
                res.end(html);
            });

        });
    });

    //-------------------test
    app.get('/search', (req, res) => {
        var query = req.query.searchtext;
        if (!query) {
            ejs.renderFile('./view/search.ejs', { query: query }, (err, html) => {
                res.end(html);
            });
        } else {

            product.find({ name: { $regex: ".*" + query + ".*" } }, (err, product) =>{
                if (err)
                    res.send(err);
                ejs.renderFile('./view/search.ejs', { product: product, query: query }, (err, html) => {
                    res.end(html);
                });

            });
        }
    });


    //-----------------test search range---------------------
    app.get('/searchprice', (req, res) => {
        var queryFP = req.query.firstPrice;
        var queryLP = req.query.lastPrice;
        if (!queryFP || !queryLP) {
            console.log('eeeeeeeee')
            ejs.renderFile('./view/searchprice.ejs', { queryFP: queryFP, queryLP: queryLP }, (err, html) => {
                res.end(html);
            });
        } else {

            product.find({}).where('price').gt(queryFP-1).lt(queryLP+1).exec((err, product)=> {
                if (err)
                    res.send(err);
                ejs.renderFile('./view/searchprice.ejs', { queryFP: queryFP, queryLP: queryLP, product: product }, (err, html) => {
                    res.end(html);
                });

            });
        }
    });
    /*User
      .find({})
      .where('id').gt(0).lt(10)
      .exec(callback);*/
    //---------------------------------

    app.post('/cart/:id', (req, res) => {
        var new_cart = new cart(req.body);
        console.log('vao day')
        new_cart.save(function(err, cart) {
            if (err)
                res.send(err);
            ejs.renderFile('./view/productlist.ejs', { "cart": cart }, (err, html) => {
                res.end(html);
            });
        });
    });


    app.get('/cart', (req, res) => {
        product.find({}, function(err, cart) {
            if (err)
                res.send(err);
            ejs.renderFile('./view/cart.ejs', { "cart": cart }, (err, html) => {
                res.end(html);
            });

        });
    });

    app.delete('/cart', (req, res) => {
        cart.remove({}, function(err, cart) {
            if (err)
                res.send(err);
            ejs.renderFile('./view/cart.ejs', { "cart": cart }, (err, html) => {
                res.end(html);
            });

        });
    });



}