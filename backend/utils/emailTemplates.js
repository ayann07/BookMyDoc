
export const IssueReceived = (name, email, subject, message,ref_no) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                color: #333;
            }
            .container {
                width: 90%;
                max-width: 600px;
                margin: 20px auto;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                padding: 20px;
            }
            .header {
                text-align: center;
                padding-bottom: 20px;
            }
            .header h1 {
                margin: 0;
                color: #007BFF;
            }
            .content {
                margin-bottom: 20px;
            }
            .content p {
                margin: 0 0 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Issue Received</h1>
            </div>
            <div class="content">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Reference ID:</strong> ${ref_no}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            </div>
            
        </div>
    </body>
    </html>
    `;
};

export const UserSuccessMail = (name, doctor_name, doctor_email, reference_no,selected_date) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                color: #333;
            }
            .container {
                width: 90%;
                max-width: 600px;
                margin: 20px auto;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                padding: 20px;
            }
            .header {
                text-align: center;
                padding-bottom: 20px;
            }
            .header h1 {
                margin: 0;
                color: #007BFF;
            }
            .content {
                margin-bottom: 20px;
            }
            .content p {
                margin: 0 0 10px;
            }
            .footer {
                text-align: center;
                font-size: 12px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Booking Confirmation</h1>
            </div>
            <div class="content">
                <p>Dear ${name},</p>
                <p>Your booking has been successfully confirmed. Here are the details:</p>
                <p><strong>Doctor Name:</strong> ${doctor_name}</p>
                <p><strong>Doctor Email:</strong> ${doctor_email}</p>
                <p><strong>Appointment Date:</strong> ${selected_date}</p>
                <p><strong>Reference Number:</strong> ${reference_no}</p>
            </div>
            <div class="footer">
                <p>Thank you for choosing our service. If you have any questions or need further assistance, please contact us.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

export const DoctorSuccessMail = (name, user_name, user_email, reference_no,selected_date) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                color: #333;
            }
            .container {
                width: 90%;
                max-width: 600px;
                margin: 20px auto;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                padding: 20px;
            }
            .header {
                text-align: center;
                padding-bottom: 20px;
            }
            .header h1 {
                margin: 0;
                color: #007BFF;
            }
            .content {
                margin-bottom: 20px;
            }
            .content p {
                margin: 0 0 10px;
            }
            .footer {
                text-align: center;
                font-size: 12px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Booking Notification</h1>
            </div>
            <div class="content">
                <p>Dear Dr. ${name},</p>
                <p>You have a new booking. Here are the details:</p>
                <p><strong>User Name:</strong> ${user_name}</p>
                <p><strong>User Email:</strong> ${user_email}</p>
                <p><strong>Appointment date:</strong> ${selected_date}</p>
                <p><strong>Reference Number:</strong> ${reference_no}</p>
            </div>
            <div class="footer">
                <p>Thank you for providing excellent care. If you have any questions or need further information, please contact us.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

export const UserFailedMail = (name, doctorName, doctorEmail, referenceNo,selected_date) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                color: #333;
            }
            .container {
                width: 90%;
                max-width: 600px;
                margin: 20px auto;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                padding: 20px;
            }
            .header {
                text-align: center;
                padding-bottom: 20px;
            }
            .header h1 {
                margin: 0;
                color: #dc3545;
            }
            .content {
                margin-bottom: 20px;
            }
            .content p {
                margin: 0 0 10px;
            }
            .footer {
                text-align: center;
                font-size: 12px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Booking Failed</h1>
            </div>
            <div class="content">
                <p>Dear ${name},</p>
                <p>We regret to inform you that your appointment with Dr. ${doctorName} (${doctorEmail}) for the date ${selected_date} could not be completed due to a payment issue.</p>
                <p>Please check your payment details and try again.</p>
                <p><strong>Reference Number:</strong> ${referenceNo}</p>
            </div>
            <div class="footer">
                <p>If you have any questions or need assistance, feel free to contact us.</p>
                <p>Thank you for your understanding.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

export const DoctorFailedMail = (name, userName, userEmail, referenceNo,selected_date) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                color: #333;
            }
            .container {
                width: 90%;
                max-width: 600px;
                margin: 20px auto;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                padding: 20px;
            }
            .header {
                text-align: center;
                padding-bottom: 20px;
            }
            .header h1 {
                margin: 0;
                color: #dc3545;
            }
            .content {
                margin-bottom: 20px;
            }
            .content p {
                margin: 0 0 10px;
            }
            .footer {
                text-align: center;
                font-size: 12px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Booking Failed</h1>
            </div>
            <div class="content">
                <p>Dear Dr. ${name},</p>
                <p>We regret to inform you that the appointment with ${userName} (${userEmail}) for the date ${selected_date} could not be completed due to a payment issue.</p>
                <p><strong>Reference Number:</strong> ${referenceNo}</p>
            </div>
            <div class="footer">
                <p>If you have any questions or need assistance, please contact us.</p>
                <p>Thank you for your understanding.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};
