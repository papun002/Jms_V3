const sequelize = require("../../../db/conn");

const viewQueries = [
  {
    check: `SELECT 1 FROM pg_views WHERE viewname = 'view_products';`,
    create: `CREATE VIEW view_products AS 
             SELECT p._id AS product_id, p.pbarcode, p.pname, p.ptype, p.pweight, p.cname, p.phuid, p.pdescription, p.cid, p.sts, s._id AS staff_id 
             FROM product_jms p 
             JOIN staff_jms s ON p.cid = s.cid;`
  },
  {
    check: `SELECT 1 FROM pg_views WHERE viewname = 'staffandclientdata';`,
    create: `CREATE VIEW staffandclientdata AS 
             SELECT s._id AS staff_id, s.name AS staff_name, s.contact AS staff_contact, s.email AS staff_email, s.gender AS staff_gender, s.doj AS staff_doj, s.address AS staff_address, s.govtproof AS staff_govtproof, s.staffimg AS staff_image, s.sts AS staff_status, s.cid, s.staffusername AS staff_username, s.staffpwd AS staff_password, c.name AS client_name, c.sub_sts, c.sub_start, c.sub_end 
             FROM staff_jms s 
             LEFT JOIN client_jms c ON s.cid = c._id;`
  }
];

const createViews = async (sequelizeInstance) => {
  console.log('Starting to create views...'); // Initial log

  try {
    // Start a transaction
    const transaction = await sequelizeInstance.transaction();
    try {
      for (const { check, create } of viewQueries) {
        console.log(`Checking if view exists: ${check}`); // Log check query
        const [results] = await sequelizeInstance.query(check, { transaction });

        if (results.length > 0) {
          console.log('View already exists.'); // Log if view exists
        } else {
          console.log(`Creating view: ${create}`); // Log create query
          await sequelizeInstance.query(create, { transaction });
          console.log('View created successfully.'); // Log successful creation
        }
      }
      // Commit the transaction
      await transaction.commit();
      console.log('All views checked/created successfully.');
    } catch (queryErr) {
      // Rollback the transaction if any query fails
      await transaction.rollback();
      console.error('Error executing queries, transaction rolled back:', queryErr);
    }
  } catch (transactionErr) {
    console.error('Error starting transaction:', transactionErr);
  }
};

createViews(sequelize);
