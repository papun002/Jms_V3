const { Op } = require('sequelize');
const ClientModels = require("../../models/client/ClientModels");
const sequelize = require('sequelize');

//Inserting Order
const insertOrder = async (req, res, next) => {
    const { formData, productDetails } = req.body;
    const cid = req.cid;

    try {
        const {
            orderDate,
            customerName,
            contact,
            address,
            advanceType,
            cashAmount,
            ornamentsType,
            ornamentsWeight,
        } = formData;

        // Prepare data for bulk insert
        const ordersToInsert = productDetails.map(product => ({
            order_date: orderDate,
            customer_name: customerName,
            contact: contact,
            address: address,
            product_name: product.productName,
            product_weight: product.productWeight,
            product_category: product.productCategory,
            product_type: product.productType,
            product_description: product.productDesc,
            product_image: product.productImage,
            advance_type: advanceType === 'both' ? 'Cash & Ornaments' : advanceType,
            cash_amount: (advanceType === 'Cash' || advanceType === 'both') ? cashAmount : null,
            ornaments_type: (advanceType === 'Ornaments' || advanceType === 'both') ? ornamentsType : null,
            ornaments_weight: (advanceType === 'Ornaments' || advanceType === 'both') ? ornamentsWeight : null,
            sts: 'Pending',
            cid: cid
        }));

        // Execute the bulk insert operation
        await ClientModels.OrderJms.bulkCreate(ordersToInsert);

        console.log("Orders inserted successfully");
        res.status(201).json({ status: "201", data: "Items Added Successfully!" });
    } catch (error) {
        console.error("Error inserting orders:", error);
        res.status(500).json({ status: "500", error: "Internal Server Error" });
    }
};

module.exports = {insertOrder};