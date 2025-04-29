import CustomerProfile from "../models/customerProfile.js";
import { errorEnum } from "../utils/errorEnum.js";
import axios from '../config/axios.js'

const getAllCustomers = async (req, res) => {
  try {
    const profiles =await CustomerProfile.find().lean().exec();
    return res.status(200).json(profiles);
  } catch (error) {
    console.error("Error fetching profiles:", error.message);
    return res.status(500).json({ message: errorEnum.SERVER_ERROR });
  }
};
const getCustomerProfile = async (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(404).json({ message: errorEnum.USERID_REQUIRED });

  try {
    const [profile,userResponse] =await Promise.all([CustomerProfile.findOne({ userId: id }).lean().exec(),axios.get(`/auth/users/${id}`)]) 
    if (!profile || !userResponse) {
      return res.status(404).json({ message: errorEnum.USER_NOT_FOUND });
    }
    const mergedData = {
      ...profile,
      user: userResponse.data.user 
    };

    return res.status(200).json(mergedData);
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    return res.status(500).json({ message: errorEnum.SERVER_ERROR });
  }
};

const addCustomerProfile = async (req, res) => {
  const { userId, phone, firstName, lastName } = req.body;

  if (!userId)
    return res.status(404).json({ message: errorEnum.USERID_REQUIRED });
  if (!phone)
    return res.status(404).json({ message: errorEnum.PHONE_REQUIRED });
  if (!firstName)
    return res.status(404).json({ message: errorEnum.FIRSTNAME_REQUIRED });
  if (!lastName)
    return res.status(404).json({ message: errorEnum.LASTNAME_REQUIRED });

  try {
    const profile = new CustomerProfile({
      userId,
      phone,
      firstName,
      lastName,
    });
    const savedProfile = await profile.save();

    if (!savedProfile)
      return res.status(500).json({ message: errorEnum.SERVER_ERROR });

    //===== make api call to auth======

    //================================
    return res.status(200).json({ message: "Profile Saved" });
  } catch (err) {
    console.error("Error creating profile:", err.message);
    return res.status(500).json({ message: errorEnum.SERVER_ERROR });
  }
};

const updateCustomerProfile = async (req, res) => {
  const { phone, firstName, lastName } = req.body;
  const id = req.params.id;


  if (!id) return res.status(404).json({ message: errorEnum.USERID_REQUIRED });
  if (!phone)
    return res.status(404).json({ message: errorEnum.PHONE_REQUIRED });
  if (!firstName)
    return res.status(404).json({ message: errorEnum.FIRSTNAME_REQUIRED });
  if (!lastName)
    return res.status(404).json({ message: errorEnum.LASTNAME_REQUIRED });

  try {
    const savedProfile = await profile.findOne({ userId: id }).exec();

    if (!savedProfile) {
      return res.status(404).json({ message: errorEnum.USER_NOT_FOUND });
    }

    savedProfile.phone = phone;
    savedProfile.firstName = firstName;
    savedProfile.lastName = lastName;

    await savedProfile.save();
    return res.status(200).json({ message: "Profile Updated" });
  } catch (err) {
    console.error("Error creating profile:", error.message);
    return res.status(500).json({ message: errorEnum.SERVER_ERROR });
  }
};

const getCustomerAdresses = async (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(404).json({ message: errorEnum.USERID_REQUIRED });

  try {
    const [profile] =await CustomerProfile.findOne({ userId: id }).lean().exec()
    if (!profile) {
      return res.status(404).json({ message: errorEnum.USER_NOT_FOUND });
    }
  
    return res.status(200).json(profile.addresses);
  } catch (error) {
    console.error("Error fetching Addresses:", error.message);
    return res.status(500).json({ message: errorEnum.SERVER_ERROR });
  }
}

const updateCustomerAdress = async (req, res) => {

}

export default {
  getAllCustomers,
  getCustomerProfile,
  addCustomerProfile,
  updateCustomerProfile,
  getCustomerAdresses,
  updateCustomerAdress
};
