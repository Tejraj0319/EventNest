const prisma = require("../../config/db");

const getStats = async () => {
    const totalUsers = await prisma.user.count();
    const totalEvents = await prisma.event.count();
    const totalBookings = await prisma.booking.count();

    const revenue = await prisma.booking.aggregate({
        _sum: {
            totalPrice: true
        },
        where: {
            status: "CONFIRMED"
        }
    })
    return {
        totalUsers,
        totalEvents,
        totalBookings,
        totalRevenue: revenue._sum.totalPrice || 0,
    };
}

// get all users
const getUsers = async () => {
    return await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            role: true,
            isBlocked: true,
            createdAt: true,
        },
        orderBy: {
            createdAt: "desc"
        }
    })
}

// update user role
const updateUserRole = async (id, role) => {
    return await prisma.user.update({
        where: {
            id: Number(id)
        },
        data: {
            role
        }
    })
}

// Block / unblock user
const toggleBlockUser = async (id, isBlocked) => {
    return await prisma.user.update({
        where: { id: Number(id) },
        data: { isBlocked },
    })
}

// get all events
const getEvents = async () => {
    return await prisma.event.findMany({
        include: {
            organizer: {
                select: { id: true, email: true }
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    })
}

// Delete event
const deleteEvent = async (id) => {
    return await prisma.event.delete({
        where: { id: Number(id) },
    });
};

// Get All Bookings
const getBookings = async () => {
    return await prisma.booking.findMany({
        include: {
            user: { select: { id: true, email: true } },
            event: { select: { id: true, title: true } },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

module.exports = {
    getStats,
    getUsers,
    updateUserRole,
    toggleBlockUser,
    getEvents,
    deleteEvent,
    getBookings,
};