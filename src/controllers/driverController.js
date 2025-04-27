import deliveryDriverProfile from "../models/deliveryDriverProfile.js";
import { errorEnum } from "../utils/errorEnum.js";

const getDriverProfile = async (req, res) => {
    const id = req.params.id;
  
    if (!id) return res.status(404).json({ message: errorEnum.USERID_REQUIRED });
  
    try {
      const profile = await deliveryDriverProfile.findOne({ userId: id }).lean().exec();
      if (!profile) {
        return res.status(404).json({ message: errorEnum.USER_NOT_FOUND });
      }
      return res.status(200).json(profile);
    } catch (error) {
      console.error("Error fetching profile:", error.message);
      return res.status(500).json({ message: errorEnum.SERVER_ERROR });
    }
  };

  const addDriverProfile = async (req, res) => {
    const {userId,
        phone,
        firstName,
        lastName,
        licenseNumber,
        nicNumber,
        vehicle } = req.body;
        const licenseDocument = req.files?.licenseDocument?.[0]?.filename;
        const nicDocument = req.files?.nicDocument?.[0]?.filename;
  
    if (!userId)
      return res.status(404).json({ message: errorEnum.USERID_REQUIRED });
    if (!phone)
      return res.status(404).json({ message: errorEnum.PHONE_REQUIRED });
    if (!firstName)
      return res.status(404).json({ message: errorEnum.FIRSTNAME_REQUIRED });
    if (!lastName)
      return res.status(404).json({ message: errorEnum.LASTNAME_REQUIRED });
    if (!licenseNumber) return res.status(400).json({ message: errorEnum.LICENCE_NUMBER_REQUIRED  });
    if (!nicNumber) return res.status(400).json({ message: errorEnum.NIC_NUM_REQUIRED  });
    if (!vehicle?.type) return res.status(400).json({ message: errorEnum.VEHICLE_TYPE_REQUIRED  });
    if (!licenseDocument || !nicDocument) return res.status(400).json({message:errorEnum.DOCUMENTS_REQUIRED });
  
    try {
        const profile = new deliveryDriverProfile({
            userId,
            phone,
            firstName,
            lastName,
            licenseNumber,
            nicNumber,
            vehicle: {
              type: vehicle.type,
              plateNumber: vehicle.plateNumber,
              color: vehicle.color,
            },
            licenseDocument,
            nicDocument,
          });
      
          const savedProfile = await profile.save();
      //===== make api call to auth======
  
      //================================
      return res.status(200).json({ message: "Driver profile saved" });
    } catch (err) {
      console.error("Error creating profile:", err.message);
      return res.status(500).json({ message: errorEnum.SERVER_ERROR });
    }
  };
  
  export default {
    getDriverProfile,
    addDriverProfile,
  };
  