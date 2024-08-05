const ClientModels = require("../../models/client/ClientModels");

// Update staff password
const staffUpdatePassword = async (req, res, next) => {
    const { oldPassword, newPassword, staffusername } = req.body;
    // console.log(req.body);
    const cid = req.id; // Assuming req.id contains the client id

    try {
        // Check if the staff exists with the given staffusername and cid
        const existingStaff = await ClientModels.StaffJms.findOne({
            where: {
                staffusername: staffusername,
                cid: cid
            }
        });

        console.log(existingStaff);
        if (!existingStaff) {
            return res.json({ status: "400", data: "Staff does not exist!" });
        }

        // Check if old password is correct
        if (existingStaff.staffpwd !== oldPassword) {
            return res.json({ status: "401", data: "Old password is incorrect!" });
        }

        // Update the staff password
        existingStaff.staffpwd = newPassword;
        await existingStaff.save();

        return res.json({ status: "200", data: "Password updated successfully!" });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ status: "500", data: "Error occurred" });
    }
};
//end of update staff password


// Update staff profile image
const StaffUpdateProfileImage = async (req, res, next) => {
  
};


module.exports = { staffUpdatePassword, StaffUpdateProfileImage };
