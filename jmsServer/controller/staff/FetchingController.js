const { Op } = require('sequelize');
const ClientModels = require("../../models/client/ClientModels");
const sequelize = require('sequelize');

//fetching Product through barcode
const FetchingProductByBarcode = async (req, res) => {
  const cid = req.id;
  const { barcode } = req.params;
  try {
    const product = await sequelize.query( // Using sequelize.query
      `SELECT * FROM view_products WHERE pbarcode = $1 AND staff_id = $2`,
      {
        type: sequelize.QueryTypes.SELECT, // Specify query type
        bind: [barcode, parseInt(cid)],   // Bind parameters
      }
    );
    if (product.length > 0) { // Check for existence (array length)
      res.json({ status: 200, data: product[0] }); // Return first element
    } else {
      res.json({ status: 404, data: "Product not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, message: "Internal server error" }); // Handle errors
  }
};
//end

//fetching product
const FetchingProduct = async (req, res) => {
  const cid = req.cid;
  // console.log(cid)
  try {
    const product = await ClientModels.ProductJms.findAll({ where: { cid: { [Op.eq]: parseInt(cid) } } });
    // console.log(product);
    res.json({ status: 200, data: product });
    return res;
  } catch (err) {
    console.log(err);
  }
}
//end of fetching product

//fetching Category
const FetchingCat = async (req, res) => {
  const cid = req.cid;
  // console.log(cid)
  try {
    const category = await ClientModels.CategoryJms.findAll({ where: { cid: { [Op.eq]: parseInt(cid) } } });
    // console.log(product);
    res.json({ status: 200, data: category });
    return res;
  } catch (err) {
    console.log(err);
  }
}
//end of Category

module.exports = { FetchingProductByBarcode, FetchingProduct, FetchingCat };