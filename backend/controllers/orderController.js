const { Order, Category } = require('../models');
const { Op } = require('sequelize');

exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Order.findAll({
            order: [['limitDate', 'ASC']],
            include: [{ model: Category, as: 'category' }]
        });

        return res.status(200).json({orders: orders});
    }
    catch (err) {
        return res.status(500).json({message: 'Une erreur interne s\'est produite'});
    }
}