const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendTicketEmail = async (to, pdfBuffer) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject: "Your Event Ticket - EventNest",
            text: "Booking confirmed. Ticket attached.",
            attachments: [
                {
                    filename: "ticket.pdf",
                    content: pdfBuffer,
                    contentType: "application/pdf"
                }
            ]
        });
    } catch (err) {
        throw err;
        console.log(err);
    }
};

module.exports = sendTicketEmail;