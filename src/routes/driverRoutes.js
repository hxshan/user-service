import express from "express"
import driverController from "../controllers/driverController.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post('/profile',upload.fields([
    { name: 'licenseDocument', maxCount: 1 },
    { name: 'nicDocument', maxCount: 1 }
  ]),driverController.addDriverProfile)
  
  router.put('/profile/:id',upload.fields([
    { name: 'profilePicture', maxCount: 1 }
  ]),driverController.editDriverProfile)
  
router.get('/profile/:id',driverController.getDriverProfile)
router.put('/profile/:id/delivery',driverController.UpdateDeliveryCount)

    
// router.route('/address/:id')
//     .get(customerController.getCustomerAdresses)
//     .post(customerController.updateCustomerAdress)

export default router;