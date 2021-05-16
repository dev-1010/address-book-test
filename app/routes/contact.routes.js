const { authJwt } = require("../middleware");
const contactController = require("../controllers/contact.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

 /**
 * @swagger
 * '/contact':
 *   get:
 *     tags:
 *      - Contact
 *     summary: Get All Contacts.
 *     security:
 *      - authorization: [authorization]
 *     description: Get Contacts.
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *                 type: array
 *                 items:
 *                  type: object
 *                  properties:
 *                    firstName:
 *                      type: string
 *                    lastName:
 *                      type: string
 *                    phoneNumber:
 *                      type: integer
 *                      format: mobile
 *                    address:
 *                      type: string
 *       400,404,401:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                message:
 *                 type: string
 */
app.get("/api/contact",[authJwt.verifyToken],contactController.getAllContacts);
 /**
 * @swagger
 * '/contact':
 *   post:
 *     tags:
 *      - Contact
 *     summary: Add new Contact.
 *     security:
 *      - authorization: [authorization]
 *     description: Add new Contact.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                message:
 *                 type: string
 *       400,404,401:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                message:
 *                 type: string
 */
app.post("/api/contact",[authJwt.verifyToken],contactController.addContact);


};
