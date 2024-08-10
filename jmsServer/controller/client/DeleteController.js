const ClientModels = require("../../models/client/ClientModels");
const { Sequelize, Op } = require('sequelize');

// Delete a single category
const deleteCategory = async (req, res) => {
    const catid = req.params.id;
    const cid = req.id;
    
    try {
        // Fetch category by ID
        const category = await ClientModels.CategoryJms.findOne({
            where: {
                _id: catid,
                cid: cid
            },
            attributes: ['cat_name']
        });

        if (!category) {
            return res.status(404).send({ status: "404", data: "Category Not Found" });
        }

        const categoryName = category.cat_name;

        // Check if the category is associated with products
        const productCount = await ClientModels.ProductJms.count({
            where: {
                cname: categoryName,
                cid: cid
            }
        });

        if (productCount > 0) {
            return res.status(400).send({ status: "400", data: "Category cannot be deleted because it is associated with products." });
        }

        // Delete the category
        await ClientModels.CategoryJms.destroy({
            where: {
                _id: catid,
                cid: cid
            }
        });

        res.status(200).send({ status: "200", data: "Category Deleted Successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "500", data: "Error Occurred" });
    }
};

// Delete bulk categories
const bulkDeleteCategories = async (req, res) => {
    const categoriesToDelete = req.body;
    const cid = req.id;

    try {
        const ids = categoriesToDelete.map(item => item.id);
        const names = categoriesToDelete.map(item => item.name);
        const ctype = categoriesToDelete.map(item => item.category);

        // Find all categories to be deleted
        const categories = await ClientModels.CategoryJms.findAll({
            where: {
                _id: ids,
                cid: cid
            },
            attributes: ['_id', 'cat_name']
        });

        if (categories.length === 0) {
            return res.status(404).send({ status: "404", data: "No Categories Found" });
        }

        // Check associated products for each category
        for (const cat of categories) {
            const productCount = await ClientModels.ProductJms.count({
                where: {
                    cname: cat.cat_name,
                    ptype: ctype[ids.indexOf(cat._id)], // Ensure correct category type
                    cid: cid
                }
            });

            if (productCount > 0) {
                return res.status(400).send({ status: "400", data: `Category '${cat.cat_name}' cannot be deleted because it is associated with products.` });
            }
        }

        // Proceed to delete categories
        await ClientModels.CategoryJms.destroy({
            where: {
                _id: ids,
                cid: cid
            }
        });

        res.status(200).send({ status: "200", data: "Categories Deleted Successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "500", data: "Error Occurred" });
    }
};

// Delete products
const deleteProduct = async (req, res) => {
    const { ids } = req.body;
    const cid = req.id;

    try {
        const idArray = Array.isArray(ids) ? ids : [ids];

        // Delete products
        const result = await ClientModels.ProductJms.destroy({
            where: {
                _id: {
                    [Op.in]: idArray
                },
                cid: cid
            }
        });

        if (result) {
            res.status(200).send({ status: "200", data: "Product(s) Deleted Successfully!" });
        } else {
            res.status(404).send({ status: "404", data: "Product(s) Not Found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "500", data: "Error Occurred" });
    }
};
//end of product delete

//staff deleteion
const staffDelete = async (req, res) =>{
    const cid = req.id
    const data = req.body
  
    try{
        const result = await ClientModels.StaffJms.destroy({
            where:{
                _id: data._id,
                staffusername: data.staffusername,
                name: data.name,
                email: data.email,
                govtproof: data.govtproof,
                cid: cid
            }
        })

        if (result) {
            res.status(200).send({ status: "200", data: "Staff Deleted Successfully!" });
        } else {
            res.status(404).send({ status: "404", data: "Staff Not Found" });
        }

    }catch (err){
        console.error(err);
        res.status(500).send({ status: "500", data: "Error Occurred" });
    }
}

module.exports = { deleteCategory, deleteProduct, bulkDeleteCategories, staffDelete };
