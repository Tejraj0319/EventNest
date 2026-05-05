const prisma = require("../../config/db");

const createRequest = async (data, user) => {
  // check if already pending request exists
  const existing = await prisma.organizerRequest.findFirst({
    where: {
      userId: user.id,
      status: "PENDING"
    }
  });

  if (existing) {
    throw new Error("You already have a pending request");
  }

  // create new request
  const request = await prisma.organizerRequest.create({
    data: {
      userId: user.id,
      fullName: data.fullName,
      phone: data.phone,
      organization: data.organization,
      experience: data.experience,
      eventType: data.eventType,
      message: data.message
    }
  });

  return request;
};

const getAllRequests = async () => {
  return await prisma.organizerRequest.findMany({
    include: {
      user: true
    },
    orderBy: { createdAt: "desc" }
  });
};

const approveRequest = async (id) => {
  const request = await prisma.organizerRequest.findUnique({
    where: { id: parseInt(id) }
  });

  if (!request) throw new Error("Request not found");

  await prisma.organizerRequest.update({
    where: { id: request.id },
    data: { status: "APPROVED" }
  });

  // upgrade user role
  await prisma.user.update({
    where: { id: request.userId },
    data: { role: "ORGANIZER" }
  });

  return { message: "Request approved" };
};

const rejectRequest = async (id) => {
  const request = await prisma.organizerRequest.findUnique({
    where: { id: parseInt(id) }
  });

  if (!request) throw new Error("Request not found");

  await prisma.organizerRequest.update({
    where: { id: request.id },
    data: { status: "REJECTED" }
  });

  return { message: "Request rejected" };
};

module.exports = {
  createRequest,
  getAllRequests,
  approveRequest,
  rejectRequest
};
