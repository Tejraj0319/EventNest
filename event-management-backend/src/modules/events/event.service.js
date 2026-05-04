const prisma = require("../../config/db")
const generateUniqueSlug = require('../../utils/slugify');
const cloudinary = require("../../config/cloudinary");
const streamifier = require("streamifier");
const fs = require("fs");

// const createEvent = async (data, user) => {
//   const slug = await generateUniqueSlug(data.title)
//   const event = await prisma.event.create({
//     data: {
//       title: data.title,
//       slug,
//       description: data.description,
//       location: data.location,
//       price: parseFloat(data.price),
//       totalSeats: parseInt(data.totalSeats),
//       availableSeats: parseInt(data.totalSeats),
//       date: new Date(data.date),
//       image: data.image || null,
//       category: data.category,
//       organizerId: user.id
//     }
//   })
//   return event;
// }

const createEvent = async (data, user, file) => {
  const slug = await generateUniqueSlug(data.title);
  let imageUrl = null;

  if (file) {
    const uploadedImage = await cloudinary.uploader.upload(file.path, {
      folder: "EventNest/events",
      resource_type: "image",
      timeout: 120000
    });

    imageUrl = uploadedImage.secure_url;

    fs.unlinkSync(file.path);
  }

  return await prisma.event.create({
    data: {
      title: data.title,
      slug,
      description: data.description,
      location: data.location,
      price: parseFloat(data.price),
      totalSeats: parseInt(data.totalSeats),
      availableSeats: parseInt(data.totalSeats),
      date: new Date(data.date),
      image: imageUrl,
      category: data.category,
      organizerId: user.id
    }
  });
};

const getAllEvents = async () => {
  const events = await prisma.event.findMany({ orderBy: { createdAt: "desc" } })
  return events
}

const getEventBySlug = async (slug) => {
  return prisma.event.findUnique({
    where: { slug }
  })
}

// const updateEvent = async (id, data, user) => {
//   const event = await prisma.event.findUnique({
//     where: { id: parseInt(id) }
//   });

//   if (!event) {
//     throw new Error("Event not found");
//   }

//   if (event.organizerId !== user.id) {
//     throw new Error("Unauthorized");
//   }

//   let updatedData = {};

//   if (data.title) {
//     updatedData.title = data.title;

//     if (data.title !== event.title) {
//       updatedData.slug = await generateUniqueSlug(data.title);
//     }
//   }

//   if (data.description) updatedData.description = data.description;
//   if (data.location) updatedData.location = data.location;
//   if (data.image !== undefined) updatedData.image = data.image;
//   if (data.category) updatedData.category = data.category;

//   if (data.price !== undefined) {
//     updatedData.price = parseFloat(data.price);
//   }

//   if (data.date) {
//     updatedData.date = new Date(data.date);
//   }

//   if (data.totalSeats !== undefined) {
//     const newTotalSeats = parseInt(data.totalSeats);

//     const bookedSeats = event.totalSeats - event.availableSeats;

//     if (newTotalSeats < bookedSeats) {
//       throw new Error(
//         `Cannot reduce seats below already booked (${bookedSeats})`
//       );
//     }

//     updatedData.totalSeats = newTotalSeats;
//     updatedData.availableSeats = newTotalSeats - bookedSeats;
//   }

//   const updatedEvent = await prisma.event.update({
//     where: { id: parseInt(id) },
//     data: updatedData
//   });

//   return updatedEvent;
// };

const updateEvent = async (id, data, user, file) => {
  const event = await prisma.event.findUnique({
    where: { id: parseInt(id) }
  });

  if (!event) {
    throw new Error("Event not found");
  }

  if (event.organizerId !== user.id) {
    throw new Error("Unauthorized");
  }

  let updatedData = {};

  // title + slug
  if (data.title) {
    updatedData.title = data.title;

    if (data.title !== event.title) {
      updatedData.slug = await generateUniqueSlug(data.title);
    }
  }

  if (data.description) updatedData.description = data.description;
  if (data.location) updatedData.location = data.location;
  if (data.category) updatedData.category = data.category;

  if (data.price !== undefined) {
    updatedData.price = parseFloat(data.price);
  }

  if (data.date) {
    updatedData.date = new Date(data.date);
  }

  // seats logic
  if (data.totalSeats !== undefined) {
    const newTotalSeats = parseInt(data.totalSeats);
    const bookedSeats = event.totalSeats - event.availableSeats;

    if (newTotalSeats < bookedSeats) {
      throw new Error(
        `Cannot reduce seats below already booked (${bookedSeats})`
      );
    }

    updatedData.totalSeats = newTotalSeats;
    updatedData.availableSeats = newTotalSeats - bookedSeats;
  }

  // IMAGE UPLOAD FIX (NEW PART)
  if (file) {
    const uploadedImage = await cloudinary.uploader.upload(file.path, {
      folder: "EventNest/events",
      resource_type: "image",
      timeout: 120000
    });

    updatedData.image = uploadedImage.secure_url;

    fs.unlinkSync(file.path); // cleanup local file
  }

  const updatedEvent = await prisma.event.update({
    where: { id: parseInt(id) },
    data: updatedData
  });

  return updatedEvent;
};

const deleteEvent = async (id, user) => {
  const event = await prisma.event.findUnique({
    where: { id: parseInt(id) }
  });
  if (!event) {
    throw new Error("Event not found");
  }
  if (event.organizerId !== user.id) {
    throw new Error("Unauthorized");
  }
  await prisma.event.delete({
    where: { id: parseInt(id) }
  });
  return { message: "Event deleted successfully" };
};

const getMyEvents = async (user) => {
  return await prisma.event.findMany({
    where: {
      organizerId: user.id
    },
    orderBy: { createdAt: "desc" }
  })
}

module.exports = {
  createEvent, getAllEvents, getEventBySlug, updateEvent, deleteEvent, getMyEvents
}
