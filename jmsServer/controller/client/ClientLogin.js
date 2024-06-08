const jwt = require("jsonwebtoken");
const hashValue = require("bcrypt");
const moment = require('moment');
const dotenv = require('dotenv').config();
const sequelize = require("../../db/conn");
const ClientModel = require("../../models/client/ClientModels");

const saltValue = 10;

// console.log("secret",dotenv.parsed.SECRET_KEY_HASH);

const clientLoginAuth = async (req, res, next) => {
    const { username, password, mType } = req.body;
    const cid = req.id;
    try {
        if (mType === "client") {
            const client = await ClientModel.ClientJms.findOne({
                where: {
                    username,
                    password
                }
            });
            if (client) {
                const end_date = new Date(client.sub_end);
                const current_date = new Date();
                const check_sub = end_date >= current_date;

                if (!check_sub) {
                    await ClientModel.ClientJms.update({ sub_sts: false }, {
                        where: {
                            username
                        }
                    });

                    await ClientModel.StaffJms.update({ sub_sts: false }, {
                        where: {
                            cid: cid
                        }
                    });
                }
                jwt.sign({ _id: client._id, username: client.username, email: client.email, sub: client.sub_sts }, process.env.SECRET_KEY_HASH, (err, token) => {
                    if (err) {
                        console.error(err);
                        return res.send({ status: "500", data: "Error creating token" });
                    }
                    hashValue.hash(process.env.SECRET_KEY_HASH, saltValue, (err, hash) => {
                        if (err) {
                            console.error(err);
                            return res.send({ status: "500", data: "Error creating token" });
                        } else {
                            return res.send({ status: "201", data: { token: token, name: client.name, uid: hash, mtype: "client" } });
                        }
                    });
                });
            } else {
                return res.send({ status: "500", data: "Invalid Credentials" });
            }
        } else if (mType === "staff") {
            const staff = await ClientModel.StaffJms.findOne({
                where: {
                    staffusername: username,
                    staffpwd: password
                }
            });
            if (staff) {
                jwt.sign({ _id: staff._id, name: staff.name, username: staff.staffusername, email: staff.email, sub: staff.sub_sts }, process.env.SECRET_KEY_HASH, (err, token) => {
                    if (err) {
                        console.error(err);
                        return res.send({ status: "500", data: "Error creating token" });
                    }
                    hashValue.hash(process.env.SECRET_KEY_HASH, saltValue, (err, hash) => {
                        if (err) {
                            console.error(err);
                            return res.send({ status: "500", data: "Error creating token" });
                        } else {
                            return res.send({ status: "201", data: { token: token, name: staff.name, uid: hash, mtype: "staff" } });
                        }
                    });
                });
            } else {
                console.log("Invalid Username or Password", { username: username, password: password });
                return res.send({ status: "500", data: "Invalid Username or Password" });
            }
        } else {
            return res.send({ status: "500", data: "Invalid User Type" });
        }
    } catch (err) {
        console.error(err);
        return res.send({ status: "500", data: "Error Occurred" });
    }
}


// Subscription Status
const SubStatus = async (req, res) => {
    req.headers['authorization'] = req.headers['authorization'].replace('Bearer ', '');
    jwt.verify(req.headers['authorization'], dotenv.parsed.SECRET_KEY_HASH, function (err, decoded) {
        console.log("decode " + decoded.sub)
        if (err) {
            console.error(err);
            return res.send({ status: "500", data: "Error Occured" });
        } else {
            return res.send({ status: "200", subPeriod: decoded.sub });
        }
    })
}

module.exports = {
    clientLoginAuth,
    SubStatus
}