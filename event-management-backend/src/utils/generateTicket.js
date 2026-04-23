const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");

const generateTicket = (booking, user, event, qrCode) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ bufferPages: true });

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

        if (qrCode) {
            const base64Data = qrCode.replace(/^data:image\/png;base64,/, "");
            const qrBuffer = Buffer.from(base64Data, "base64");

            doc.image(qrBuffer, {
                fit: [150, 150],
                align: "center"
            });
        }

        doc.moveDown();
        doc.text("Scan this QR at entry", { align: "center" });

        doc.moveDown();
        doc.text("Thank you for booking!", { align: "center" });

        doc.end();
    });
};

module.exports = generateTicket;
