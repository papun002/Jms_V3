const ClientModels = require("../../models/client/ClientModels");
const { Sequelize } = require('sequelize');
const { Op } = require('sequelize');

//delete category
const deleteCategory = async (req, res, next) => {
    const catid = req.params.id
    const cid = req.id;
    console.log(catid, cid)
    try {
        const category = await ClientModels.CategoryJms.findOne({
            where: {
                _id: catid,
                cid: cid
            },
            attributes: ['cat_name']
        });
        if (!category) {
            return res.send({ status: "404", data: "Category Not Found" });
        }
        const categoryName = category.cat_name;
        // Check if the category name is present in the ProductJms table
        const productCount = await ClientModels.ProductJms.count({
            where: {
                cname: categoryName, // Assuming the column name in ProductJms table is 'category'
                cid: cid
            }
        });
        if (productCount > 0) {
            return res.send({ status: "400", data: "Category cannot be deleted because it is associated with products." });
        }
        const result = await ClientModels.CategoryJms.destroy({
            where: {
                _id: catid,
                cid: cid
            }
        });
        if (result) {
            return res.send({ status: "200", data: "Category Deleted Successfully!" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({ status: "500", data: "Error Occurred" });
    }
};
//end of delete category


//delete product
const deleteProduct = async (req, res, next) => {
    const { ids } = req.body; 
    const cid = req.id;
    console.log(ids, cid);

    const idArray = Array.isArray(ids) ? ids : [ids];

    try {
        const result = await ClientModels.ProductJms.destroy({
            where: {
                _id: {
                    [Op.in]: idArray
                },
                cid: cid
            }
        });

        if (result) {
            return res.send({ status: "200", data: "Product(s) Deleted Successfully!" });
        } else {
            return res.send({ status: "404", data: "Product(s) Not Found" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({ status: "500", data: "Error Occurred" });
    }
};

module.exports = { deleteCategory, deleteProduct }