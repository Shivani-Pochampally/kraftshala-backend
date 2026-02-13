const { Meeting } = require("../../../models");
const { Op } = require("sequelize");

async function hasConflict({ userId, startTime, endTime, excludeId }) {
  return await Meeting.findOne({
    where: {
      userId,
      ...(excludeId && { id: { [Op.ne]: excludeId } }),
      startTime: { [Op.lt]: endTime },
      endTime: { [Op.gt]: startTime },
    },
  });
}

exports.createMeeting = async (data) => {
  const { title, startTime, endTime, userId } = data;

  // Validation: required fields
  if (!title || !startTime || !endTime || !userId) {
    throw { status: 400, message: "All fields are required" };
  }

  // Validation: start < end
  if (new Date(startTime) >= new Date(endTime)) {
    throw { status: 400, message: "startTime must be less than endTime" };
  }

  // Conflict check
  const conflict = await hasConflict({ userId, startTime, endTime });
  if (conflict) {
    throw { status: 400, message: "Time slot already booked" };
  }

  return await Meeting.create({ title, startTime, endTime, userId });
};

exports.getMeetings = async (filters) => {
  const where = {};

  if (filters.userId) where.userId = filters.userId;

  if (filters.startDate && filters.endDate) {
    where.startTime = {
      [Op.between]: [filters.startDate, filters.endDate],
    };
  }

  return await Meeting.findAll({ where });
};

exports.getMeetingById = async (id) => {
  return await Meeting.findByPk(id);
};

exports.updateMeeting = async (id, data) => {
  const { startTime, endTime, userId } = data;

  if (startTime && endTime && new Date(startTime) >= new Date(endTime)) {
    throw { status: 400, message: "startTime must be less than endTime" };
  }

  const conflict = await hasConflict({
    userId,
    startTime,
    endTime,
    excludeId: id,
  });

  if (conflict) {
    throw { status: 400, message: "Time slot already booked" };
  }

  await Meeting.update(data, { where: { id } });
  return await Meeting.findByPk(id);
};

exports.deleteMeeting = async (id) => {
  return await Meeting.destroy({ where: { id } });
};
