import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="bg-gray-950 text-white">
      {/* HERO SECTION */}
      <div className="relative h-[60vh] flex items-center justify-center text-center">
        <img
          src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80"
          alt="event"
          className="absolute w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About EventNest
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We help people discover, host, and experience unforgettable events.
          </p>
        </div>
      </div>

      {/* MISSION */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <motion.img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=70 "
          alt="mission"
          className="rounded-2xl shadow-xl"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        />

        <div>
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-400 leading-relaxed">
            EventNest empowers individuals and organizations to create, manage,
            and explore events seamlessly. Whether it’s tech, music, workshops,
            or meetups — we bring communities together.
          </p>
        </div>
      </div>

      {/* FEATURES */}
      <div className="bg-gray-900 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-semibold">Why Choose Us</h2>
          <p className="text-gray-400 mt-2">
            Built with performance, scalability, and user experience in mind
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Easy Event Creation",
              desc: "Create and manage events in minutes with powerful tools.",
            },
            {
              title: "Real-Time Booking",
              desc: "Instant bookings with live seat updates and analytics.",
            },
            {
              title: "Secure Platform",
              desc: "JWT authentication, role-based access & secure payments.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* TEAM */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Meet Our Team
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            {
              name: "Rajesh Patil",
              role: "Full Stack Developer",
              img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=70 ",
            },
            {
              name: "Team Member",
              role: "UI/UX Designer",
              img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=70 ",
            },
            {
              name: "Team Member",
              role: "Backend Engineer",
              img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=800&q=70 ",
            },
          ].map((member, index) => (
            <motion.div
              key={index}
              className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <img
                src={member.img}
                alt={member.name}
                className="h-56 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-gray-400 text-sm">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-center py-16 px-6">
        <h2 className="text-3xl font-semibold mb-4">
          Ready to Host Your First Event?
        </h2>
        <p className="mb-6 text-gray-200">
          Join EventNest and start building amazing experiences today.
        </p>

        <a
          href="/become-organizer"
          className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:opacity-90 transition"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default About;
