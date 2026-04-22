const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");

const generateTicket = (booking, user, event) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();

        const buffers = [];

        doc.on("data", (chunk) => buffers.push(chunk));

        doc.on("end", () => {
            const pdfData = Buffer.concat(buffers);
            resolve(pdfData);
        });

        doc.on("error", reject);

        doc.fontSize(20).text("Event Ticket", { align: "center" });
        doc.moveDown();

        doc.fontSize(12).text(`Name: ${user.email}`);
        doc.text(`Event: ${event.title}`);
        doc.text(`Quantity: ${booking.quantity}`);
        doc.text(`Booking ID: ${booking.id}`);
        doc.text(`Order ID: ${booking.orderId}`);

        doc.moveDown();
        doc.text("Thank you for booking!", { align: "center" });

        doc.end();
    });
};

module.exports = generateTicket;
