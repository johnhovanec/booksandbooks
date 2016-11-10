/**
 * GET /
 * Books page.
 */
exports.index = (req, res) => {
  res.render('books', {
    title: 'Books'
  });
};


// exports.create = (req, res) => {
// //var mongodb = require('mongodb');
// //var MongoClient = mongodb.MongoClient;

//     //res.header("Access-Control-Allow-Origin", "*");
//     if(!req.query.title) {
//         return res.send({"status": "error", "message": "missing book title"});
//     } else {
//     var book = {
//         "id": "0001",
//         "title": req.query.title,
//         "ISBN" : req.query.ISBN,
//         "authorFName" : req.query.authorFName,
//         "authorLName" : req.query.authorLName
//         } //Close 
//         var url = 'mongodb://localhost:27017/books';
//         MongoClient.connect(url, function (err, db) {
//         if (err) {
//           return res.send({"result" : "failed"});
//         } else {
//           var collection = db.collection('products');
// 	  collection.insert(product); 
//           db.close();
//           return res.send({"result" : "Product successfully created"});
//          }  //close if
//         }); //close function
//     } //close else
// }); //Close app.get
