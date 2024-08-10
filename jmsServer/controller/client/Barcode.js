const ClientModel = require("../../models/client/ClientModels");

const generateUniqueNumber = async (cid, barcodePrefix) => {
    let uniqueNumber;
    let isUnique = false;
    while (!isUnique) {
        // Generate a 6-digit number
        const randomNumber = Math.floor(100000 + Math.random() * 900000).toString();
        uniqueNumber = `${barcodePrefix}${randomNumber}`;

        // Check if this number already exists in the database
        const existingRecord = await ClientModel.ProductJms.findOne({ where: { pbarcode: uniqueNumber, cid: cid } });

        if (!existingRecord) {
            isUnique = true;
        } else {
            console.log('Conflict detected, generating a new number...');
        }
    }

    return uniqueNumber;
};

const GenerateBarcode = async (req, res) => {
    const cid = req.id
    const barcodePrefix = await ClientModel.ClientJms.findAll({ where: { _id: cid } })
    // console.log(barcodePrefix[0].dataValues.tag_mark)
    try {
        const uniqueNumber = await generateUniqueNumber(cid, barcodePrefix[0].dataValues.tag_mark);
        console.log(uniqueNumber)
        res.status(200).json({ uniqueNumber });
    } catch (error) {
        console.error('Error generating unique number:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = { GenerateBarcode };