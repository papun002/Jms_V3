const  ClientModels  = require("../models/client/ClientModels");
const { Op } = require('sequelize');

const VerifyStaff = async (req, res, next) =>{
    const staffid = req.id;
    // console.log("staff id",staffid)

    const result = await ClientModels.StaffJms.findAll({ where: { _id: { [Op.eq]: parseInt(staffid) } } });

    if(result){
        req.cid = result[0].dataValues.cid
        // console.log("cid Result",cid)
        next();
    }else{
        console.log("Not Allowed")
    }
}

module.exports = VerifyStaff