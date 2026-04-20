const prisma = require("../config/db");

const baseSlugify = (text) => {
    return text.toLowerCase().trim().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}
const generateUniqueSlug = async (title) => {

    let baseSlug = baseSlugify(title)
    let slug = baseSlug;
    let count = 1

    while (true) {
        const existing = await prisma.event.findUnique({
            where: { slug }
        });

        if (!existing) break;
        slug = `${baseSlug}-${count}`;
        count++;
    }
    return slug;
}
module.exports = generateUniqueSlug;