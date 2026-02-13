exports.validateMeeting = (body) => {
  const { userId, title, startTime, endTime } = body;

  if (!userId || !title || !startTime || !endTime) {
    return "All fields are required";
  }

  if (new Date(startTime) >= new Date(endTime)) {
    return "startTime must be before endTime";
  }

  return null;
};
