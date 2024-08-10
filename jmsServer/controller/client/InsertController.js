const ClientModels = require("../../models/client/ClientModels");

// Inserting staff
const staffInsert = async (req, res, next) => {
    const data = req.body.staffdata;
    const cid = req.id;
    console.log(data, cid)

    try {
        // Check if the staff ID already exists
        const existingStaff = await ClientModels.StaffJms.findOne({ where: { staffusername: data.staffusername, cid: cid } });

        if (existingStaff) {
            return res.send({ status: "400", data: "Staff Username already exists!" });
        }

        // If staff ID doesn't exist, insert the new staff data
        await ClientModels.StaffJms.create({
            name: data.name,
            contact: data.contact,
            email: data.email,
            gender: data.gender,
            doj: data.doj,
            address: data.address,
            govtproof: data.govtproof,
            staffimg: data.img,
            sts: "active",
            cid: cid,
            staffusername: data.staffusername,
            staffpwd: data.staffpwd,
        });

        console.log("Successfully inserted staff data");
        return res.status(201).send({ status: "201", data: "Staff Added Successfully!" });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ status: "500", data: "Error Occurred" });
    }
};

module.exports = staffInsert;

// end of staff Insert

//insert category
const insertCategory = async (req, res, next) => {
    const data = req.body;
    const cid = req.id; // Assuming req.id contains the client id

    // console.log(data)
    try {
        // Check if the category already exists
        const existingCategory = await ClientModels.CategoryJms.findOne({ where: { cat_name: data.category, pdt_type: data.pdttype, cid: cid } });

        if (existingCategory) {
            return res.json({ status: "400", data: "Category already exists!" });
        }

        // Insert the new category
        const insertedCategory = await ClientModels.CategoryJms.create({
            pdt_type: data.pdttype,
            cat_name: data.category,
            cid: cid
        });

        if (insertedCategory) {
            return res.status(201).json({ status: "201", data: "Category Added Successfully!" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: "500", data: "Error Occurred" });
    }
};

module.exports = insertCategory;

//end of insert category


//Inserting Product
const insertProduct = async (req, res, next) => {
    const data = req.body;
    const cid = req.id;

    try {
        // Prepare an array of objects for bulk insert
        const productsToInsert = data.map(product => ({
            pbarcode: product.barcode,
            pname: product.name,
            pweight: product.weight,
            cname: product.cname,
            phuid: product.huid,
            pdescription: product.description,
            ptype: product.ptype,
            cid: cid,
            sts: 'In Stock'
        }));

        // Check if the barcode already exists
        const existingProducts = await ClientModels.ProductJms.findAll({
            where: {
                pbarcode: data.map(product => product.barcode)
            }
        });

        const existingBarcodes = existingProducts.map(product => product.pbarcode);
        const newProductsToInsert = productsToInsert.filter(product => !existingBarcodes.includes(product.pbarcode));

        // Insert only the products with unique barcodes
        if (newProductsToInsert.length > 0) {
            await ClientModels.ProductJms.bulkCreate(newProductsToInsert);
            console.log("Products inserted successfully");
            res.status(201).json({ status: "201", data: "Items Added Successfully!" });
        } else {
            console.log("No new products to insert");
            res.json({ status: "400", data: "Already Present Barcode: " + existingBarcodes, msg: "No new items to insert" });
        }
    } catch (error) {
        console.error("Error inserting products:", error);
        res.status(500).json({ status: "500", error: "Internal Server Error" });
    }
};


module.exports = insertProduct;


//end of inserting product

//Inserting Order
const insertOrder = async (req, res, next) => {
    const { formData, productDetails } = req.body;
    const cid = req.id;

    try {
        const {
            orderDate,
            customerName,
            contact,
            address,
            advanceType,
            cashAmount,
            ornamentsType,
            ornamentsWeight,
        } = formData;

        // Prepare data for bulk insert
        const ordersToInsert = productDetails.map(product => ({
            order_date: orderDate,
            customer_name: customerName,
            contact: contact,
            address: address,
            product_name: product.productName,
            product_weight: product.productWeight,
            product_category: product.productCategory,
            product_type: product.productType,
            product_description: product.productDesc,
            product_image: product.productImage,
            advance_type: advanceType === 'both' ? 'Cash & Ornaments' : advanceType,
            cash_amount: (advanceType === 'Cash' || advanceType === 'both') ? cashAmount : null,
            ornaments_type: (advanceType === 'Ornaments' || advanceType === 'both') ? ornamentsType : null,
            ornaments_weight: (advanceType === 'Ornaments' || advanceType === 'both') ? ornamentsWeight : null,
            sts: 'Pending',
            cid: cid
        }));

        // Execute the bulk insert operation
        await ClientModels.OrderJms.bulkCreate(ordersToInsert);

        console.log("Orders inserted successfully");
        res.status(201).json({ status: "201", data: "Items Added Successfully!" });
    } catch (error) {
        console.error("Error inserting orders:", error);
        res.status(500).json({ status: "500", error: "Internal Server Error" });
    }
};







module.exports = { staffInsert, insertCategory, insertProduct, insertOrder };
