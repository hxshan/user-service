import express from "express"
import customerController from "../controllers/customerController";

const router = express.Router();

router.route('/customer/profile')
    .post(customerController.addCustomerProfile)
    
router.route('/customer/profile/:id')
    .get(customerController.getCustomerProfile)
    .put(customerController.updateCustomerProfile)

    
router.route('/customer/address/:id')
    .get(customerController.getCustomerAdresses)
    .post(customerController.updateCustomerAdress)

export default router;