import express from "express"
import customerController from "../controllers/customerController.js";

const router = express.Router();

router.post('/profile',customerController.addCustomerProfile)
    
router.get('/profile/:id',customerController.getCustomerProfile)
router.put('/profile/:id',customerController.updateCustomerProfile)

    
router.route('/address/:id')
    .get(customerController.getCustomerAdresses)
    .post(customerController.updateCustomerAdress)

export default router;