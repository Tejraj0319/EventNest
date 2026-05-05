const service = require("./organizerRequest.service");

const createRequest = async (req, res) => {
  try {
    const request = await service.createRequest(req.body, req.user);

    res.status(201).json({
      success: true,
      message: "Organizer request submitted",
      data: request
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const getAllRequests = async (req, res) => {
  try {
    const data = await service.getAllRequests();

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const approveRequest = async (req, res) => {
  try {
    const data = await service.approveRequest(req.params.id);

    res.json({
      success: true,
      message: data.message
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const rejectRequest = async (req, res) => {
  try {
    const data = await service.rejectRequest(req.params.id);

    res.json({
      success: true,
      message: data.message
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createRequest,
  getAllRequests,
  approveRequest,
  rejectRequest
};