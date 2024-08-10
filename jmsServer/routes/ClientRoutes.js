const Express = require("express");
const clientLogin = require("../controller/client/ClientLogin");
const InsertController = require("../controller/client/InsertController");
const {checkout , paymentVerification} = require("../controller/payment/PaymentController");
const FetchingController = require("../controller/client/FetchingController");
const UpdateController = require("../controller/client/UpdateController");
const DeteleController = require("../controller/client/DeleteController");
const extractUserIdFromToken = require("../middleware/auth_verify");
const { GenerateBarcode } = require("../controller/client/Barcode");

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
ClientRoute.get("/cat/retrivecategory",extractUserIdFromToken,FetchingController.RetriveCategory);
ClientRoute.get("/pdt/getAllProducts",extractUserIdFromToken,FetchingController.FetchingProduct);
ClientRoute.get("/clientprofile",extractUserIdFromToken,FetchingController.FetchingClientProfile);
ClientRoute.get("/order/getorders",extractUserIdFromToken,FetchingController.FetchingOrders);
ClientRoute.get("/barcode/generate",extractUserIdFromToken,GenerateBarcode);



// update routes (put)
ClientRoute.put("/staffs/updatestaff/:id",extractUserIdFromToken ,UpdateController.updateStaff);



//Delete Routes
ClientRoute.delete("/category/deletecategory/:id",extractUserIdFromToken,DeteleController.deleteCategory);
ClientRoute.delete("/cat/bulkdeletecategory",extractUserIdFromToken,DeteleController.bulkDeleteCategories);
ClientRoute.delete("/pdt/productdelete",extractUserIdFromToken,DeteleController.deleteProduct);
ClientRoute.delete("/staffs/deletestaff",extractUserIdFromToken,DeteleController.staffDelete);



module.exports = ClientRoute;