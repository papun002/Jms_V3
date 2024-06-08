const { Op } = require('sequelize');
const ClientModels = require("../../models/client/ClientModels");

//fetching client profile
const FetchingClientProfile = async (req, res) => {
    try {
        const cid = req.id;

        const clientProfileData = await ClientModels.ClientJms.findOne({ where: { _id: cid } });

        if (!clientProfileData) {
            return res.status(404).json({ status: "404", error: "Client profile not found" });
        }

        res.json({ status: "200", data: clientProfileData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "500", error: "Internal server error" });
    }
}


//fetching Staff Profile all
const FetchingStaffProfile = async (req, res) => {
    const cid = req.id;
    try {
        const staffProfiles = await ClientModels.StaffJms.findAll({ where: { cid: { [Op.eq]: parseInt(cid) } } });
        res.send({ status: 200, data: staffProfiles });

    } catch (err) {
        console.log(err);
    }
}

//fetching individual staff profile
const FetchingStaffInfo = async (req, res) => {
    const id = req.params.id;
    const cid = req.id;
    console.log(id);
    try {
        const staffInfo = await ClientModels.StaffJms.findAll({ where: { _id: { [Op.eq]: parseInt(id) }, cid: { [Op.eq]: parseInt(cid) } }});
        res.send({ status: 200, data: staffInfo });
    } catch (err) {
        console.log(err);
    }
}

//fetching category
const FetchingCategory = async (req, res) => {
    const cid = req.id; 
    try {
        const categories = await ClientModels.CategoryJms.findAll({ where: { cid: { [Op.eq]: parseInt(cid) } } });
        res.status(200).json({ status: 200, data: categories });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, error: "Internal server error" });
    }
}


//fetching product
const FetchingProduct = async (req, res) => {
    const cid = req.id;
    try {
        const product = await ClientModels.ProductJms.findAll({ where: { cid: { [Op.eq]: parseInt(cid) } } });
        // console.log(product);
        res.json({ status: 200, data: product });
        return res;
    } catch (err) {
        console.log(err);
    }
}

//fetching Order
const FetchingOrders = async (req, res) => {
    const cid = req.id; 
    try {
        const orders = await ClientModels.OrderJms.findAll({ where: { cid: { [Op.eq]: parseInt(cid) } } });
        res.status(200).json({ status: 200, data: orders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, error: "Internal server error" });
    }
}

module.exports = { FetchingStaffProfile, FetchingStaffInfo ,FetchingCategory, FetchingProduct , FetchingClientProfile, FetchingOrders}