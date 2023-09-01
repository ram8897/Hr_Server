const asyncHandler = require('express-async-handler')
const userprofile = require("../schemas/Profile")
const getProfiles = asyncHandler(async (req, res) => {
  try {
    const profile = await userprofile.find()
    console.log('fetched all contacts')
    res.status(200).json(profile)
  } catch (err) {
    console.log('failed to fetch contacts')
    res.status(500)
    throw new Error(err.message)
  }
})
const getProfile = asyncHandler(async (req, res) => {
  try {
    const profile = await userprofile.find();
    res.status(200).json(profile);
  } catch (err) {
    console.log(`===failed to find contact`)
    res.status(500)
    throw new Error(err.message)
  }
})

const createProfile = asyncHandler(async (req, res) => {
  try {
    const { email, firstname, lastname, empId, designation, phone, city, state, zipcode, image, department, team, role, joiningDate, teams, education, dob, gender, address1, address2 } = req.body;

    if (!email || !firstname || !lastname || !phone || !city || !state || !zipcode) {
      return res.status(400).json({ message: 'All fields are mandatory!' });
    }

    const profile = new userprofile({ email, firstname, lastname, empId, designation, phone, city, state, zipcode, image, department, team, role, joiningDate, teams, education, dob, gender, address1, address2 });
    await profile.save();

    return res.status(201).json(profile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
})

const updateprofile = asyncHandler(async (req, res) => {
  try {
    const updateprofile = await userprofile.findByIdAndUpdate(req.params._id, req.body);
    if (!updateprofile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    getProfile(req, res);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
})

const deleteContact = asyncHandler(async (req, res) => {
  try {
    const profileDelete = await userprofile.findByIdAndDelete(req.params.id)
    console.log(`deleted contact - ${profileDelete.name}`)
    res.status(200).json(profileDelete)
  } catch (err) {
    console.log(`failed to delete contact`)
    res.status(500)
    throw new Error(err.message)
  }
})
const getAllAddress = asyncHandler(async (req, res) => {
  try {
    const profile = await userprofile.find({});
    res.status(200).json(profile);
  } catch (err) {
    console.log(`failed to find address`)
    res.status(500)
    throw new Error(err.message)
  }
})


// const downloadUsers = asyncHandler(async (req, res) => {
//   const id = req.params.id;
  
//   if (!ObjectId.isValid(id)) {
//     return res.status(400).json({ message: 'Invalid id' });
//   }

//   try {
//     const profiles = await userprofile.find({}, '-_id email firstname lastname empId designation phone city state zipcode image department team role joiningDate teams dob gender address1 address2');

//     if (!profiles) {
//       return res.status(404).json({ message: 'No profiles found' });
//     }

//     const fields = ['email', 'firstname', 'lastname', 'empId', 'designation', 'phone', 'city', 'state', 'zipcode', 'image', 'department', 'team', 'role', 'joiningDate', 'teams', 'dob', 'gender', 'address1', 'address2'];
//     const opts = { fields };

//     res.xls('users.xlsx', profiles, opts);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

  // const downloadById = asyncHandler( (req, res) => {
  //   const profileId = req.params.id;
  
  //   userprofile.findById(profileId)
  //     .then(profile => {
  //       if (!profile) {
  //         return res.status(404).json({ message: 'Profile not found' });
  //       }
  
  //       // code for generating and sending the Excel file goes here
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       res.status(500).json({ message: 'Server error' });
  //     });
  // });
  module.exports = { getProfiles, getProfile, createProfile, updateprofile, deleteContact, getAllAddress }