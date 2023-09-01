const asyncHandler = require('express-async-handler');
const users = require("../schemas/User");
const userprofile = require("../schemas/Profile");
const ActiveSession = require("../schemas/Session");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Punch = require("../schemas/Clock");
const excel = require('exceljs');
const { PassThrough } = require('stream');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const getAllUserEmails = asyncHandler(async (req, res) => {
  try {
    const userEmails = await users.find().select('email');
    res.status(200).json(userEmails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
const getAllUsers = asyncHandler(async (req, res) => {
  try{
    const allUsers = await users.find();
    res.status(200).json(allUsers)
  } catch(error) {
    res.status(500).json("Internal server error")
  };
});
const updateUser = asyncHandler(async (req, res) => {
  try{
    const userUpdate = await users.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({message: "User Updated Successfully", userUpdate})
  } catch(error) {
    res.status(500).json("Internal server error")
  };
});
const userSignup = asyncHandler(async (req, res) => {
  const { firstname, lastname, username, email, password, role } = req.body;
  console.log(req.body)
  if (!firstname || !lastname || !username || !email || !password || !role ) {
    return res.status(400).json({ message: 'All Fields Are Manditory' });
  }; const emailRegex = /^[a-zA-Z0-9._%+-]+@beze\.in$/;
  if (!emailRegex.test(email)) {
    return res.status(405).json({ message: 'Please enter valid orgnization email.' });
  };
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(406).json({
      message: 'Password must be at least 8 characters long and contain at least one letter, one number, and one special character.'
    });
  };
  try {

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Orgniation Email already exists' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new users({ firstname, lastname, email, username, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: 'User created' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  };
});
const userLogin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const userLogin = await users.findOne({ email },{otp:0}).populate('address');

    if (!userLogin) {
      return res.status(401).json({ message: "Authentication Failed" });
    }

    const isPasswordValid = await bcrypt.compare(password, userLogin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    };
    const session = new ActiveSession({
      userId: userLogin._id,
      loginTime: new Date(),
      expireAt: new Date().getTime() + 15 * 60000,
      status: 'active'
    });

    try {
      res.cookie('session Id', session._id, { httpOnly: true, maxAge: new Date().getTime() + 15 * 60000 })
      res.cookie('session status', session.status, { httpOnly: true, maxAge: new Date().getTime() + 15 * 60000 })
      await session.save();
    } catch (saveError) {
      console.error('Error saving session:', saveError);
      return res.status(500).json({ message: 'Session save error' });
    }
    
    const token = jwt.sign({ email, _id: userLogin._id,role:userLogin.role }, 'secret', { expiresIn: '24h' });
    userLogin.token = token;
    const payload = {
      message: 'Authentication Successfully!',
      userLogin,
    };
    
    await userLogin.save();
    res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // Max age: 24 hours
    res.cookie('userId', userLogin._id, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // Max age: 24 hours
    res.status(200).json(payload);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  };
});
const userLogout = asyncHandler(async (req, res) => {
    const userId = req.body.userId;

    try {
      const session = await ActiveSession.findOne({ userId });

      if (!session) {
        return res.status(404).json({ message: 'Session not found' });
      }

      session.logoutTime = new Date();
      session.status = 'inactive';
      await session.save();

      return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

const extendSession = async (req, res) => {
  const currentTime = new Date();

  try {
    const expiredSessions = await ActiveSession.find({ expireAt: { $lt: currentTime }, status: 'active' });

    for (const session of expiredSessions) {
      session.status = 'inactive';
      await session.save();
    }

    return res.status(200).json({ message: `${expiredSessions.length} sessions marked as inactive.` });
  } catch (error) {
    console.error('Error marking sessions inactive:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
function generateSessionId() {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let sessionId = '';
  for (let i = 0; i < 32; i++) {
    sessionId += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return sessionId;
}
const punchIn = asyncHandler(async (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.status(404).json({ message: "No Data Found" });
  }

  const userLogin = await users.findOne({ email });

  const punch = new Punch({
    type: 'in',
    punchIn: new Date().toISOString(),
    firstname: userLogin.firstname,
    lastname: userLogin.lastname,
  });

  let timeCount = 0;
  const timerId = setInterval(() => {
    timeCount += 1; 
  }, 1000);
  req.on('close', async () => {
    clearInterval(timerId);
    punch.timeCount = timeCount;
    await punch.save();
  });

  punch.user = userLogin;
  await punch.save();

  res.status(200).json({ message: 'Punch in successful', punch });
});
const punchOut = asyncHandler(async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(404).json({ message: "No Data Found" });
    }

    const lastPunch = await Punch.findById(id).sort({ timestamp: -1 });
    if (!lastPunch) {
      return res.status(400).json({ message: 'No punch in record found' });
    }
    if (lastPunch.type === 'out') {
      return res.status(400).json({ message: 'User already punched out' });
    }

    lastPunch.type = 'out';
    lastPunch.punchOut = new Date().toISOString();
    const punchIn = new Date(lastPunch.punchIn);
    const punchOut = new Date(lastPunch.punchOut);
    const totalWorkingHours = ((punchOut - punchIn) / (1000 * 60 * 60)).toFixed(2);
    lastPunch.totalWorkingHours = new Date(totalWorkingHours * 3600000).toISOString().substr(11, 8);
    lastPunch.timeCount = 0; // Set timeCount to 0 for punch out
    await lastPunch.save();

    res.status(200).json({ message: 'Punch out successful', lastPunch });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
function formatTimeCount(milliseconds) {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
  return `${hours}:${minutes}:${seconds}`;
}
const allPunchins = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 5;
  const sortBy = req.query.sortBy || 'firstname';
  const orderBy = req.query.orderBy || 'asc';
  try {
    const totalCount = await Punch.countDocuments();
    const totalPages = Math.ceil( totalCount / pageSize );
    const sortOptions = {};
    sortOptions[sortBy] = orderBy === 'desc' ? -1 : 1;
    const result = await Punch.find().sort(sortOptions).skip((page - 1) * pageSize).limit(pageSize);
    res.json({result, totalPages, currentPage: page, currentSize: pageSize});
  } catch(error) {
    res.status(500).json({message: "Internal server error"})
  }
})
const downloadPunchData = async (req, res) => {
  try {
      const allPunchinDetails = await Punch.find();
      console.log("allPunchinDetails", allPunchinDetails);
      const workbook = new excel.Workbook();
      const worksheet = workbook.addWorksheet('Punch Data');
    
      worksheet.columns = [
        { header: 'ID', key: '_id', width: 25 },
        { header: 'First Name', key: 'firstname', width: 15 },
        { header: 'Last Name', key: 'lastname', width: 15 },
        { header: 'Type', key: 'type', width: 15 },
        { header: 'Punch In', key: 'punchIn', width: 25 },
        { header: 'Punch Out', key: 'punchOut', width: 25 },
        { header: 'Total Working Hours', key: 'totalWorkingHours', width: 25 },
      ];
      // allPunchinDetails.punchIn = moment(allPunchinDetails.punchIn).format('MM DD, YYYY')
      allPunchinDetails.forEach((punch) => {
        worksheet.addRow(punch);
      });
      
      const stream = new PassThrough();
      workbook.xlsx.write(stream);
      
      res.setHeader('Content-disposition', 'attachment; filename=punch_data.xlsx');
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      stream.pipe(res);

  } catch(error) {
    res.status(500).json({message: "Internal server error"})
  }
}
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + '.png');
  }
});
const upload = multer({ storage: storage }).single('image');
const uploadProfile = asyncHandler(async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error uploading file' });
    }
    try {
      const profile = await users.findById(req.params.id);
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      const file = req.file;
      if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      if (!profile.image) {
        profile.image = {};
      }
      profile.image = req.file.path;
      profile.image.contentType = req.file.mimetype;
      await profile.save();
      return res.json({ message: 'File uploaded successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error saving profile' });
    }
  });
});
const getUploadImage = asyncHandler(async (req, res) => {
  try {
    const profile = await users.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    const imagePath = profile.image;
    console.log("imagePath", imagePath);
    if (!imagePath) {
      return res.status(404).json({ message: 'Image not found' });
    }
    const file = path.join(__dirname, imagePath);
    console.log(__dirname);
    fs.readFile(file, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error retrieving image' });
      }
      res.writeHead(200, { 'Content-Type': profile.image.contentType });
      res.end(data);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving profile' });
  }
});

function getMonthName(month) {
  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  return monthNames[month];
}
const getAllCount = asyncHandler(async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const monthCounts = [];

    for (let month = 0; month < 12; month++) {
      const startOfMonth = new Date(currentYear, month, 1);
      const endOfMonth = new Date(currentYear, month + 1, 0, 23, 59, 59);

      const signupCounts = await users.countDocuments({
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
      });

      const punchCount = await Punch.countDocuments({
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
      });

      const profiles = await userprofile.countDocuments({
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
      });

      const monthData = {
        label: getMonthName(month),
        value: signupCounts,
        value1: punchCount,
        value2: profiles,
      };
      console.log(monthData);
      monthCounts.push(monthData);
    }

    res.json(monthCounts);
  } catch (error) {
    console.error('Error retrieving signup counts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = {getAllUsers, updateUser, userSignup, userLogin, punchIn, punchOut, allPunchins, downloadPunchData, uploadProfile, getAllUserEmails, userLogout, extendSession, getUploadImage, getAllCount }
