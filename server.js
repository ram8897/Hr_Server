const express = require('express');
const { connectDb } = require('./config/dbConnection');
const { errorHandler } = require('./middlewares/errorHandler');
const cors = require('cors');
require('dotenv').config();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const contactsRouter = require('./routes/ContactsRoute');
const userRoute = require("./routes/UserRoute");
const profileDetails = require("./routes/UserProfileRoute");
const forgot = require("./routes/ForgotPasswordRoute");
const changePassword = require("./routes/ChangePasswordRoute");
const leaveRequest = require("./routes/LeaveRoute");
const otp = require("./routes/TwilioRoute");
const holidays = require("./routes/HolidaysRoute");
const addressDetails = require('./routes/AddressRoute');
const employee = require('./routes/EmployeeRoute');
const education = require('./routes/EducationRoute');
const PayrollRoute = require('./routes/PayrolleRoute')
const taskRoute = require('./routes/TasksRoute');
const MenuRoute = require('./routes/MenuRoute');
const contactSchema = require('./schemas/Contacts')
const cookieParser = require('cookie-parser');

const uuid = require('uuid')
const IP_ADDRESS = "192.168.168.78";
const PORT = process.env.PORT || 8500;
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());


const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Library API",
        version: "1.0.0",
        description: "A simple Express Library API",
        termsOfService: "http://example.com/terms/",
        contact: {
          name: "API Support",
          url: "http://www.exmaple.com/support",
          email: "support@example.com",
        },
      },
  
      servers: [
        {
          url: `http://${IP_ADDRESS}:${PORT}`,
          description: "My API Documentation",
        },
      ],

      components: {
        schemas: {
          Contact: contactSchema,
        },
      },
    },
    apis: ['./server.js'],
};
  
const specs = swaggerJsDoc(options);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(errorHandler);


app.get('/', (req, res)=>{
    res.status(200).send('Welcome')
});
app.use('/api', MenuRoute)
app.use('/api', forgot);
// app.use('/api/document', PayrollRoute);

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Get a list of contacts
 *     description: Retrieve a list of contacts.
 *     responses:
 *       200:
 *         description: A list of contacts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 */
app.use('/api/contacts', contactsRouter);
app.use('/api', userRoute);
app.use('/api/education', education);
app.use('/api/address', addressDetails);
app.use('/api/profile',  profileDetails);
app.use('/api/change-password', changePassword);
app.use('/api/leave-request', leaveRequest);
app.use('/api/sendotp', otp);
app.use('/api/holidays', holidays);
app.use('/api/employee', employee);
app.use('/api/task', taskRoute)

connectDb().then(()=>{
    app.listen(PORT, IP_ADDRESS, () => {
        console.log(`Server is running at http://${IP_ADDRESS}:${PORT}`);
      });
}).catch((err)=>{
    console.log(err)
})
