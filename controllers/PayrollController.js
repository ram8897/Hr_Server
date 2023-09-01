// const asyncHandler = require('express-async-handler');
// const PayrollSchema =  require('../schemas/Payslip');
// const { validationResult } = require('express-validator');
// const PDFDocument = require('pdfkit');

// const getAllPayrolls = asyncHandler(async (req, res) => {
//   try{
//     const payroll = await PayrollSchema.find({});
//     res.status(200).json(payroll);
//   } catch {
//     res.status(500)
//     throw new Error(err.message);
//   }
// })
// const createPayrole = asyncHandler(async (req, res) => {
//   try {
//     const { employeeId, empName, designation, DOJ, payPeriod, dateOfPay, basic, hra, allowence, medical, fixed, epf, pTax, nameOfCompany, address }  = req.body;
//     if (!employeeId, !empName, !designation, !payPeriod, !DOJ, !dateOfPay, !basic, !hra, !allowence, !medical, !fixed, !epf, !pTax, !nameOfCompany, !address){
//       res.status(400).json("All feilds are mandatory")
//     }

//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//           return res.status(400).json({ errors: errors.array() });
//       }
//       const Payroll = new PayrollSchema(req.body);
//       await Payroll.save();
//       return res.status(201).json(Payroll);
//     } catch (err) {
//         res.status(500)
//         throw new Error(err.message);
//     }
// });

// const downloadPdf = asyncHandler(async (req, res) => {
//   try {
//     const payrollData = await PayrollSchema.findById(req.params.id);
//     if (!payrollData) {
//       return res.status(404).json({ message: 'Payroll not found' });
//     }
//     const doc = new PDFDocument();
//     res.setHeader('Content-Disposition', `attachment; filename="payroll.pdf"`);
//     res.setHeader('Content-Type', 'application/pdf');
//     doc.pipe(res);
//     doc.fontSize(10).text(payrollData.nameOfCompany,   { align: 'left' });
//     doc.fontSize(9).text(payrollData.address, { align: 'left'})
//     doc.moveDown();
//     doc.strokeColor('#d1d1d1').lineWidth(0.2).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
//     doc.moveDown();
//     doc.fontSize(8).text(`Employee Name:   ${payrollData.empName}, ${payrollData.employeeId} `);
//     doc.moveDown();
//     doc.text(`Designation:          ${payrollData.designation}`);
//     doc.moveDown();
//     doc.text(`Date of Joining:     ${payrollData.DOJ}`);
//     doc.moveDown();
//     doc.text(`Pay Period:            ${payrollData.payPeriod}`);
//     doc.moveDown();
//     doc.text(`Pay Date:               ${payrollData.dateOfPay}`);
//     doc.moveDown();


//     doc.fontSize(8).text(`Employee Name:   ${payrollData.empName}, ${payrollData.employeeId} `, -50, doc.y, { align: 'right' });
   
//     doc.strokeColor('#d1d1d1').lineWidth(0.2).moveTo(50, doc.y).lineTo(550, doc.y).stroke();

//     // doc.moveDown();
//     //  const tableHeaders = ['Item', 'Amount'];
//     //  const tableData = [
//     //    ['Gross Salary', payrollData.grossSalary],
//     //    ['Deductions', payrollData.deductions],
//     //    ['Net Salary', payrollData.netSalary]
//     //  ];
//     //  const tableWidths = [200, 200];
 
//     //  // Draw table headers
//     //  doc.font('Helvetica-Bold').fontSize(12);
//     //  let currentX = 50;
//     //  tableHeaders.forEach((header, index) => {
//     //    doc.text(header, currentX, doc.y, { width: tableWidths[index], align: 'left' });
//     //    currentX += tableWidths[index];
//     //  });
//     //  doc.moveDown();
 
//     //  // Draw table rows
//     //  doc.font('Helvetica').fontSize(12);
//     //  tableData.forEach(row => {
//     //    currentX = 50;
//     //    row.forEach((cell, index) => {
//     //      doc.text(cell, currentX, doc.y, { width: tableWidths[index], align: 'left' });
//     //      currentX += tableWidths[index];
//     //    });
//     //    doc.moveDown();
//     //  });
 
//      // End the PDF document
//      doc.end();
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error generating PDF' });
//   }
// });
// module.exports = { createPayrole, getAllPayrolls, downloadPdf };