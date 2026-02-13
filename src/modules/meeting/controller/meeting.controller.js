const meetingService = require("../service/meeting.service");

exports.createMeeting = async (req, res, next) => {
  try {
    const meeting = await meetingService.createMeeting(req.body);
    res.status(201).json(meeting);
  } catch (err) {
    next(err);
  }
};

exports.getMeetings = async (req, res, next) => {
  try {
    const meetings = await meetingService.getMeetings(req.query);
    res.json(meetings);
  } catch (err) {
    next(err);
  }
};

exports.getMeetingById = async (req, res, next) => {
  try {
    const meeting = await meetingService.getMeetingById(req.params.id);
    if (!meeting) return res.status(404).json({ message: "Meeting not found" });
    res.json(meeting);
  } catch (err) {
    next(err);
  }
};

exports.updateMeeting = async (req, res, next) => {
  try {
    const meeting = await meetingService.updateMeeting(req.params.id, req.body);
    res.json(meeting);
  } catch (err) {
    next(err);
  }
};

exports.deleteMeeting = async (req, res, next) => {
  try {
    await meetingService.deleteMeeting(req.params.id);
    res.json({ message: "Meeting deleted successfully" });
  } catch (err) {
    next(err);
  }
};

