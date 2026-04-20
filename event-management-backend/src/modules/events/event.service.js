const prisma = require("../../config/db")
const generateUniqueSlug = require('../../utils/slugify');

const createEvent = async (data, user) => {
    const slug = await generateUniqueSlug(data.title)
    const event = await prisma.event.create({
        data: {
            title: data.title,
            slug,
            description: data.description,
            location: data.location,
            price: parseFloat(data.price),
            totalSeats: parseInt(data.totalSeats),
            availableSeats: parseInt(data.totalSeats),
            date: new Date(data.date),
            image: data.image || null,
            organizerId: user.id
        }
    })
    return event;
}

const getAllEvents = async () => {
    const events = await prisma.event.findMany({ orderBy: { createdAt: "desc" } })
    return events
}


const getEventBySlug = async (slug) => {
    return prisma.event.findUnique({
        where: { slug }
    })
}

const updateEvent = async (id, data, user) => {
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

  if (data.title) {
    updatedData.title = data.title;

    if (data.title !== event.title) {
      updatedData.slug = await generateUniqueSlug(data.title);
    }
  }

  if (data.description) updatedData.description = data.description;
  if (data.location) updatedData.location = data.location;
  if (data.image !== undefined) updatedData.image = data.image;

  if (data.price !== undefined) {
    updatedData.price = parseFloat(data.price);
  }

  if (data.date) {
    updatedData.date = new Date(data.date);
  }

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

  const updatedEvent = await prisma.event.update({
    where: { id: parseInt(id) },
    data: updatedData
  });

  return updatedEvent;
};

module.exports = updateEvent;


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


module.exports = {
    createEvent, getAllEvents, getEventBySlug, updateEvent, deleteEvent
}