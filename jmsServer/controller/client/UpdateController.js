const ClientModels = require('../../models/client/ClientModels');

const updateStaff = async (req, res, next) => {
    const cid = req.id;
    try {
        const { id } = req.params; 
        const updatedStaffData = req.body;
        console.log(id, updatedStaffData)

        // Find the staff member by id and update their data
        const [updatedRowCount, [updatedStaff]] = await ClientModels.StaffJms.update(updatedStaffData, {
            where: { _id: id,cid: cid },
            returning: true,
        });

        if (updatedRowCount === 0 || !updatedStaff) {
            return res.status(404).json({ message: 'Staff member not found' });
        }

        res.status(200).json(updatedStaff);
    } catch (error) {
        console.error('Error updating staff data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { updateStaff };
