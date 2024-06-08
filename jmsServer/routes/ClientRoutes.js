const Express = require("express");
const clientLogin = require("../controller/client/ClientLogin");
const InsertController = require("../controller/client/InsertController");
const {checkout , paymentVerification} = require("../controller/payment/PaymentController");
const FetchingController = require("../controller/client/FetchingController");
const UpdateController = require("../controller/client/UpdateController");
const DeteleController = require("../controller/client/DeleteController");
const extractUserIdFromToken = require("../middleware/auth_verify");

const ClientRoute = Express.Router();
// Insert or post routes
ClientRoute.post("/clientLoginAuth",clientLogin.clientLoginAuth);
ClientRoute.post("/staffs/insertstaff",extractUserIdFromToken,InsertController.staffInsert);
ClientRoute.route("/checkout").post(checkout)
ClientRoute.route("/paymentverification").post(paymentVerification)
ClientRoute.post("/cat/categoryinsert",extractUserIdFromToken,InsertController.insertCategory);
ClientRoute.post("/pdt/addproduct",extractUserIdFromToken,InsertController.insertProduct);
ClientRoute.post("/order/addorder",extractUserIdFromToken,InsertController.insertOrder);



// Fetching or get routes 
ClientRoute.get("/substs",clientLogin.SubStatus);
ClientRoute.get("/staffs/staffprofile",extractUserIdFromToken,FetchingController.FetchingStaffProfile);
ClientRoute.get("/staffs/staffprofile/:id",extractUserIdFromToken,FetchingController.FetchingStaffInfo);
ClientRoute.get("/cat/getcategory",extractUserIdFromToken,FetchingController.FetchingCategory);
ClientRoute.get("/pdt/getAllProducts",extractUserIdFromToken,FetchingController.FetchingProduct);
ClientRoute.get("/clientprofile",extractUserIdFromToken,FetchingController.FetchingClientProfile);
ClientRoute.get("/order/getorders",extractUserIdFromToken,FetchingController.FetchingOrders);



// update routes (put)
ClientRoute.put("/staffs/updatestaff/:id", UpdateController.updateStaff);



//Delete Routes
ClientRoute.delete("/category/deletecategory/:id",extractUserIdFromToken,DeteleController.deleteCategory);
ClientRoute.delete("/pdt/productdelete",extractUserIdFromToken,DeteleController.deleteProduct);



module.exports = ClientRoute;