const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// const sendTicketEmail = async (to, pdfBuffer) => {
//     try {
//         await transporter.sendMail({
//             from: process.env.EMAIL_USER,
//             to,
//             subject: "Your Event Ticket - EventNest",
//             text: "Booking confirmed. Ticket attached.",
//             attachments: [
//                 {
//                     filename: "ticket.pdf",
//                     content: pdfBuffer,
//                     contentType: "application/pdf",
//                     encoding: "base64" //sometimes PDF breaks if encoding is wrong.
//                 }
//             ]
//         });
//     } catch (err) {
//         throw err;
//         console.log(err);
//     }
// };

// module.exports = sendTicketEmail;




const sendTicketEmail = async (to, pdfBuffer) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject: "Your Event Ticket - EventNest",
            text: "Your booking is confirmed. Please find your ticket attached.",

            html: `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
                    
                    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 18px rgba(0,0,0,0.08);">
                        
                        <!-- Header -->
                        <div style="background: linear-gradient(135deg, #4f46e5, #6366f1); color: white; padding: 25px; text-align: center;">
                            <h1 style="margin: 0; font-size: 24px;">EventNest</h1>
                            <p style="margin-top: 8px; font-size: 14px;">Your booking has been confirmed!</p>
                        </div>

                        <!-- Body -->
                        <div style="padding: 25px; color: #333;">
                            
                            <h2 style="margin-top: 0; font-size: 20px;">Your Ticket is Ready</h2>

                            <p style="font-size: 14px; line-height: 1.6;">
                                Hello,
                            </p>

                            <p style="font-size: 14px; line-height: 1.6;">
                                Great news! Your event booking is <strong>successfully confirmed</strong>.
                                Your ticket is attached to this email.
                            </p>

                            <div style="margin: 20px 0; padding: 15px; background: #f9fafb; border-left: 4px solid #4f46e5; border-radius: 6px;">
                                <p style="margin: 0; font-size: 14px;">
                                    📌 <strong>Entry Instructions:</strong><br/>
                                    Please present your ticket at the venue. The QR code will be scanned for verification.
                                </p>
                            </div>

                            <p style="font-size: 14px; line-height: 1.6;">
                                💡 Tip: Save this email or download your ticket in advance to avoid last-minute hassle.
                            </p>

                            <p style="font-size: 14px; line-height: 1.6;">
                                We’re excited to have you join us. Have an amazing experience!
                            </p>
                        </div>

                        <!-- Footer -->
                        <div style="background: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #777;">
                            <p style="margin: 0;">© ${new Date().getFullYear()} EventNest</p>
                            <p style="margin-top: 5px;">Crafting memorable event experiences ❤️</p>
                        </div>

                    </div>

                </div>
            `,

            attachments: [
                {
                    filename: "ticket.pdf",
                    content: pdfBuffer,
                    contentType: "application/pdf",
                    encoding: "base64"
                }
            ]
        });
    } catch (err) {
        throw err;
    }
};


module.exports = sendTicketEmail;