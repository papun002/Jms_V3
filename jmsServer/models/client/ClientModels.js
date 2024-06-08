const { DataTypes } = require('sequelize');
const sequelize = require('../../db/conn');

// Define ClientJms model
const ClientJms = sequelize.define('ClientJms', {
    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    store_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    tag_mark: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    contact: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    sts: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    sub_start: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    sub_end: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    sub_sts: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
}, {
    tableName: 'client_jms',
    timestamps: false, 
});
//end of client table

// Define StaffJms model
const StaffJms = sequelize.define('StaffJms', {
    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    contact: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    doj: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    govtproof: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    staffimg: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    sts: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    cid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    staffusername: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    staffpwd: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    sub_sts: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
}, {
    tableName: 'staff_jms',
    timestamps: false, 
});
//end of staff table

// Define Category table
const CategoryJms = sequelize.define('CategoryJms', {
    _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    pdt_type: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    cat_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    cid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'category_jms',
    timestamps: false,
});
//end of category table

// Define Subscription table
const Subscription = sequelize.define('Subscription', {
    _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    client_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    client_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    sub_type: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    sub_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    razorpay_order_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    razorpay_payment_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    razorpay_signature: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'subscriptions',
    timestamps: false, 
});
//end of subscription table

//define product table
const ProductJms = sequelize.define('ProductJms', {
    _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    pbarcode: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    pname: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    ptype: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    pweight: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    cname: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    phuid: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    pdescription: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    cid: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    sts: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
}, {
    tableName: 'product_jms',
    timestamps: false,
});
//end of product table

//define order table
const OrderJms = sequelize.define('OrderJms', {
    _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    order_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    customer_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    contact: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    product_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    product_weight: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    product_category: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    product_type: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    product_description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    product_image: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    advance_type: {
        type: DataTypes.STRING(200),
        allowNull: true,
    },
    cash_amount: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    ornaments_type: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    ornaments_weight: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    cid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sts: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    tableName: 'order_jms',
    timestamps: false, 
});
//end of order table


// Ensure the models sync with the database
async function syncDatabase() {
    try {
        await sequelize.sync({ force: false }); // Set force to true to drop existing tables
        console.log('Tables synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing models:', error);
    }
}

// Sync the models
syncDatabase();

module.exports = { ClientJms, StaffJms, CategoryJms, Subscription, ProductJms, OrderJms};
