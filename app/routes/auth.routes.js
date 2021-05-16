const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

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
 * '/auth/signup':
 *   post:
 *     tags:
 *      - Auth
 *     summary: Create Account.
 *     security:
 *     description: Create Account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200,500:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                message:
 *                 type: string
 */
  app.post("/api/auth/signup",[verifySignUp.checkDuplicateUsernameOrEmail],controller.signup);

    /**
 * @swagger
 * '/auth/signin':
 *   post:
 *     tags:
 *      - Auth
 *     summary: Login with credentials.
 *     security:
 *     description: Login with credentials.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                id:
 *                 type: integer
 *                email:
 *                 type: string
 *                tokenType:
 *                 type: string
 *                accessToken:
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
  app.post("/api/auth/signin", controller.signin);
};
