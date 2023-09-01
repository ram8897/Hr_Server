const EducationDetails = require("../schemas/Education");
const User = require('../schemas/User')
const asyncHandler = require('express-async-handler');

const getEducationDetails = asyncHandler(async (req, res) => {
  try {
      const education = await User.find({})
      console.log('fetched all contacts')
      res.status(200).json(education)
  }catch(err){
      console.log('failed to fetch contacts')
      res.status(500)
      throw new Error(err.message) 
  }
})

const createEducation = asyncHandler(async (req, res) => {

    try {
      const educationDetail = new EducationDetails(req.body);
      await educationDetail.save();
      const user = await User.findById(req.body.userId).populate('education');
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      user.education.push(educationDetail);
      await user.save();
      res.status(201).json({ message: "Education details added successfully", user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

  const updateEducation = asyncHandler(async (req, res) => {
    console.log(req.params.userId)
    try {
      const educationDetail = await User.findByIdAndUpdate(req.params.id, req.body);
      console.log(educationDetail)
      if (!educationDetail) {
        return res.status(404).json({ error: 'Education detail not found' });
      }
      res.status(201).json({message: "Educational details updated successfully", educationDetail});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


  const getEdu = asyncHandler(async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId).populate('education');
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const educationDetails = user.education;
      res.status(200).json({ educationDetails });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  
  
  // Update an education detail
//   router.put('/education/:id', async (req, res) => {
//     try {
//       const educationDetail = await EducationDetails.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         { new: true }
//       );
//       if (!educationDetail) {
//         return res.status(404).json({ error: 'Education detail not found' });
//       }
//       res.json(educationDetail);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });

//   router.delete('/education/:id', async (req, res) => {
//     try {
//       const educationDetail = await EducationDetails.findByIdAndDelete(
//         req.params.id
//       );
//       if (!educationDetail) {
//         return res.status(404).json({ error: 'Education detail not found' });
//       }
//       res.json({ message: 'Education detail deleted' });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });

module.exports = {getEdu, getEducationDetails, createEducation , updateEducation}
