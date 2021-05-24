const nodemailer = require('nodemailer');

const appEmail = process.env.EMAIL;
const appPass = process.env.PASSWORD;

const paymentConfirmation = async (req, res) => {
  const {
    name, email, image, title, price, plan, date,
  } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: appEmail || 'myhouseapp86@gmail.com',
      pass: appPass || 'Houseapp.123',
    },
  });

  const mailOptions = {
    from: '"My House App" <myhouseapp86@gmail.com>',
    to: email,
    subject: 'Payment Confirmation',
    html: `
    <div>
    <br></br>
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding-right: 0px;padding-left: 0px;" align="center">
            <img align="center" border="0"  src='https://lh3.googleusercontent.com/pw/ACtC-3d1f7Zbjgy2JdZoOoZ-a1km-O3si30DgzofokfZscWQGLpfphKVWgqLpeVDKWCxrMEvWufxWT4lvqf-4WUXDQ-aNiy8BBEUSka6vankGtUZ6j4YyoYituKojGZDWV8jMKPxYplGYIhyThN6Ie5f0i0=w805-h249-no?authuser=0' alt="Logo" title="Logo"  width="200"/>
          </td>
        </tr>
      </table>

<br></br>

      <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
          <tr>
            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
              
        <h2 class="v-text-align v-font-size" style="margin: 0px; color: #323b42; line-height: 140%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: 'Lato',sans-serif; font-size: 20px;">
          <strong>Your payment was successful! You will have ${plan} benefits until ${date}</strong>
        </h2>
      
            </td>
          </tr>
        </tbody>
      </table>
      <br></br>
    <div style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
      <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">

  <div style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
    <div style="width: 100% !important;">
    <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
        
  <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:13px;font-family:arial,helvetica,sans-serif;" align="left">
          
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="padding-right: 0px;padding-left: 0px;" align="center">
        
        <img align="center" border="0" src="${image}" alt="Photo" title="Photo" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 274px;" width="274" />
        
      </td>
    </tr>
  </table>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    </div>
    </div>
  </div>
  <div style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
    <div style="width: 100% !important;">
   <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
    
   <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
   <tbody>
     <tr>
       <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
         
   <div style="color: #323b42; line-height: 140%; text-align: left; word-wrap: break-word;">
     <p style="font-size: 14px; line-height: 140%;">${name}</p>
   </div>
 
       </td>
     </tr>
   </tbody>
 </table>

  <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:18px 10px 4px;font-family:arial,helvetica,sans-serif;" align="left">
          
    <h3 style="margin: 0px; color: #323b42; line-height: 140%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: arial,helvetica,sans-serif; font-size: 18px;">
      <strong>$${price}</strong>
    </h3>
  
        </td>
      </tr>
    </tbody>
  </table>
  
  <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:1px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
          
    <h3 style="margin: 0px; color: #323b42; line-height: 140%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: arial,helvetica,sans-serif; font-size: 16px;">
      ${title}
    </h3>
        </td>
      </tr>
    </tbody>
  </table>
  

            `,
  };

  const outbox = await transporter.sendMail(mailOptions);
  res.send(outbox);
};

module.exports = paymentConfirmation;
