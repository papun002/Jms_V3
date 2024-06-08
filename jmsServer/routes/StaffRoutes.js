const Express = require("express");
const FetchingController = require("../controller/staff/FetchingController");
const extractUserIdFromToken = require("../middleware/auth_verify");
const VerifyStaff = require("../middleware/verify_staff");

const StaffRoute = Express.Router();
// Insert or post routes

// Fetching or get routes
StaffRoute.get("/pdt/getproduct/:barcode",extractUserIdFromToken,FetchingController.FetchingProductByBarcode);
StaffRoute.get("/pdt/getAllProducts",extractUserIdFromToken,VerifyStaff,FetchingController.FetchingProduct);
StaffRoute.get("/cat/getAllcat",extractUserIdFromToken,VerifyStaff,FetchingController.FetchingCat);


module.exports = StaffRoute;