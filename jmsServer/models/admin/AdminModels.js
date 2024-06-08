const { DataTypes } = require('sequelize');
const sequelize = require('../../db/conn');

// define plan model
const Plan = sequelize.define('Plan', {
    plan_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    admin_id: {
        type: DataTypes.INTEGER,
    },
    plan_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    plan_duration: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    plan_price: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: 'plan_jms',
    timestamps: true,
});



module.exports = { Plan };

























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