// A simple utility to format professional text-based invoices/bills for logs or terminal receipts
exports.generateTextInvoice = (saleData) => {
  const taxRate = 0.18; // 18% GST standard
  const subTotal = saleData.items.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const gstAmount = subTotal * taxRate;
  const grandTotal = subTotal + gstAmount;

  return `
=========================================
        INVOICE: ${saleData.invoiceNumber}
=========================================
Date: ${new Date().toLocaleDateString()}
Customer: ${saleData.customerName}
-----------------------------------------
Items Ordered:
${saleData.items.map(item => `${item.name} x ${item.qty} -> ₹${item.price * item.qty}`).join('\n')}
-----------------------------------------
Subtotal:  ₹${subTotal.toFixed(2)}
CGST/SGST: ₹${gstAmount.toFixed(2)}
=========================================
GRAND TOTAL: ₹${grandTotal.toFixed(2)}
=========================================
   Thank You for Business with Vyapar!
  `;
};