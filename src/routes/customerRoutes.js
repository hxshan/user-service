import express from "express"
import customerController from "../controllers/customerController";

const router = express.Router();

router.route('/customer/profile')
    .get(customerController.getCustomerProfiles)
    .post(customerController.addCustomerProfile)
    
router.route('/customer/profile/:id')
    .put(customerController.updateCustomerProfile)

export default router;