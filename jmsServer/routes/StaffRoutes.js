const Express = require("express");
const FetchingController = require("../controller/staff/FetchingController");
const extractUserIdFromToken = require("../middleware/auth_verify");
const VerifyStaff = require("../middleware/verify_staff");
const InsertController  = require("../controller/staff/InsertController");
const UpdateController = require("../controller/staff/UpdateController");

const StaffRoute = Express.Router();
// Insert or post routes
StaffRoute.post("/order/addorder",extractUserIdFromToken,VerifyStaff,InsertController.insertOrder);
StaffRoute.post("/updatestaffprofilepwd",extractUserIdFromToken,VerifyStaff, UpdateController.staffUpdatePassword);
StaffRoute.post("/updatestaffprofileimage",extractUserIdFromToken,VerifyStaff, UpdateController.StaffUpdateProfileImage);

// Fetching or get routes
StaffRoute.get("/pdt/getproduct/:barcode",extractUserIdFromToken,VerifyStaff,FetchingController.FetchingProductByBarcode);
StaffRoute.get("/pdt/getAllProducts",extractUserIdFromToken,VerifyStaff,FetchingController.FetchingProduct);
StaffRoute.get("/cat/getAllcat",extractUserIdFromToken,VerifyStaff,FetchingController.FetchingCat);
StaffRoute.get("/getItemsByCategory/:category",extractUserIdFromToken,VerifyStaff,FetchingController.FetchingItemsByCategory);
StaffRoute.get("/profile",extractUserIdFromToken,VerifyStaff,FetchingController.FetchingProfileStaff);
StaffRoute.get("/order/getorders",extractUserIdFromToken,VerifyStaff,FetchingController.FetchingOrders);

module.exports = StaffRoute;