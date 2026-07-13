const Sales = require('../models/Sales');
const Purchase = require('../models/Purchase');

exports.getFinancialSummary = async (req, res, next) => {
  try {
    const sales = await Sales.find({});
    const purchases = await Purchase.find({});
    
    const totalSales = sales.reduce((acc, curr) => acc + curr.grandTotal, 0);
    const totalPurchases = purchases.reduce((acc, curr) => acc + curr.totalAmount, 0);

    res.status(200).json({
      success: true,
      data: { totalSales, totalPurchases, grossProfit: totalSales - totalPurchases }
    });
  } catch (error) { next(error); }
};