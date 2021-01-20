=> run "npm install" to install the dependencies
=> I have used mongoDB
=> for the Category collection I've implemented CREATE and READ operations
=> for the Product collection I've implemented CREATE, READ abd DELETE operations

=> Category manipulation{
CREATE( POST : http://localhost:5000/api/categories/ json-->{"name":"categoryName"} )
READ( GET : http://localhost:5000/api/categories/)
}

=> Product manipulation{
CREATE( POST: http://localhost:5000/api/products/ json-->{"name":"productName", "category_name": "categoryName" } )
READ( GET : http://localhost:5000/api/products/)
DELETE( POST: http://localhost:5000/api/products/ json-->{"product_id":"productId" } )
}

=> the id's are the \_id field of their respective collections
