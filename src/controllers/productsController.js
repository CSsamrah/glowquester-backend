const pool=require('../../db')


// add product in product table
const addingProduct=async(req,res)=>{
    try {
        const { product_id, product_name, description, price, quantity, category_id, rating } = req.body;
        const picture = req.file.buffer;

        const addProduct = await pool.query('INSERT INTO product(product_id,product_name,description,price,picture,quantity,category_id,rating)values($1, $2, $3, $4, $5, $6, $7, $8)', [product_id, product_name, description, price, picture, quantity, category_id, rating])
        res.status(201).send('Product added successfully');
    } catch (error) {
        console.error(error.message)
    }
}
// get product details
const getProductDetails=async(req,res)=>{
    const { product_id } = req.params;
  
    try {
      const selectQuery = 'SELECT * FROM product WHERE product_id = $1';
      const result = await pool.query(selectQuery, [product_id]);
  
      if (result.rows.length > 0) {
        const product = result.rows[0];
        // Assuming 'image_data' is the column containing bytea data
        const imageData = product.picture.toString('base64');
        const productWithBase64Image = {
          ...product,
          image_data: imageData,
        };
        res.json(productWithBase64Image);
      } else {
        res.status(404).send('Product not found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
}

//delete product
const deleteProduct= async (req, res) => {
    try {
        const { product_id } = req.params;
        const deleteproduct = await pool.query("DELETE FROM product WHERE product_id=$1", [product_id])

        if (deleteproduct.rowCount > 0) {
            res.status(200).send('Product deleted successfully');
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

};

// edit product quantity
const editProductQuantity= async (req, res) => {
    const { quantity } = req.body;
    const { product_id } = req.params;
    if (quantity === undefined) {
        return res.status(400).send("Quantity is required");
    }
    try {
        const editquantity = await pool.query("UPDATE product SET quantity=$1 WHERE product_id=$2", [quantity, product_id])

        if (editquantity.rowCount > 0) {
            res.status(200).send('Product quantity updated successfully');
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// edit product price
const editProductPrice= async (req, res) => {
    const { price } = req.body;
    const { product_id } = req.params;
    if (price === undefined) {
        return res.status(400).send("price is required");
    }
    try {
        const editprice = await pool.query("UPDATE product SET price=$1 WHERE product_id=$2", [price, product_id])

        if (editprice.rowCount > 0) {
            res.status(200).send('Product price updated successfully');
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// get all products
const getAllProducts= async (req, res) => {
    try {
        const selectQuery = 'SELECT * FROM product';
        const result = await pool.query(selectQuery);
        res.json(result.rows)
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};







module.exports={addingProduct,getProductDetails,deleteProduct,editProductQuantity,editProductPrice,getAllProducts}