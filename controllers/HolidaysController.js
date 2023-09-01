const asyncHandler = require('express-async-handler')
const Holiday = require("../schemas/HolidayCalander")
const getAllHolidays = asyncHandler(async (req, res) => {
    try{
        const holidays = await Holiday.find({});
        res.status(200).json(holidays)
    }catch(err){
        res.status(500)
        throw new Error(err.message) 
    }
})

const getHolidaysById = asyncHandler(async (req, res) => {
    try {
        const holiday = await Holiday.findById(req.params.id);
        if (!holiday) throw Error('Holiday not found');
        res.status(200).json(holiday);
      } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

const createHolidays = asyncHandler(async (req, res) => {
    const { title, primary, secondry, starttime, endtime } = req.body;
    const holiday = new Holiday({
        title: req.body.title,
        primary: req.body.primary,
        secondry: req.body.secondry,
        starttime: req.body.starttime,
        endtime: req.body.endtime
      });
      if(!title && !primary && !secondry && !starttime && !endtime){
        res.status(400).json({message: errorMsg[400]})
      }
      try {
        const newHoliday = await holiday.save();
        res.status(201).json(newHoliday);
      } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
      }
})

const updateHoliday = asyncHandler(async (req, res) => {
    try {
        const { date, name } = req.body 
        const holiday = await Holiday.findByIdAndUpdate(req.params.id, date, name);
        if (!holiday) throw Error('Holiday not found');
        
        const updatedHoliday = await holiday.save();
        res.status(200).json(updatedHoliday);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
})

const deleteHoliday = asyncHandler(async (req, res) => {
    try {
        const holiday = await Holiday.findByIdAndDelete(req.params.id);
        if (!holiday) throw Error('Holiday not found');
        res.status(200).json({ message: 'Holiday deleted successfully'});
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
});

module.exports = { getAllHolidays, getHolidaysById, createHolidays, updateHoliday, deleteHoliday }