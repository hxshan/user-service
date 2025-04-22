import express from "express"
import customerController from "../controllers/customerController";

const router = express.Router();

router.route('/profile')
    .post(customerController.addCustomerProfile)
    
router.route('/profile/:id')
    .get(customerController.getCustomerProfile)
    .put(customerController.updateCustomerProfile)

    
router.route('/address/:id')
    .get(customerController.getCustomerAdresses)
    .post(customerController.updateCustomerAdress)

export default router;