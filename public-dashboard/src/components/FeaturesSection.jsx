// const features = [
//   {
//     title: "Easy Booking",
//     desc: "Book events in seconds",
//   },
//   {
//     title: "Secure Payments",
//     desc: "100% safe transactions",
//   },
//   {
//     title: "Verified Events",
//     desc: "Only trusted organizers",
//   },
//   {
//     title: "Instant Confirmation",
//     desc: "No waiting, instant access",
//   },
// ];

// const FeaturesSection = () => {
//   return (
//     <div className="px-4 mt-16 mb-10">
//       <div className="max-w-6xl mx-auto">

//         {/* Title */}
//         <h2 className="text-lg md:text-xl font-bold text-white text-center mb-8">
//           Why Choose Us
//         </h2>

//         {/* Features Row */}
//         <div className="flex flex-col md:flex-row justify-between items-center text-center gap-6 md:gap-0">

//           {features.map((item, index) => (
//             <div key={index} className="flex-1">

//               <h3 className="text-white font-semibold text-base">
//                 {item.title}
//               </h3>

//               <p className="text-gray-400 text-sm mt-1">
//                 {item.desc}
//               </p>

//               {/* Divider (except last) */}
//               {index !== features.length - 1 && (
//                 <div className="hidden md:block absolute h-10 w-[1px] bg-gray-700 right-0 top-1/2 -translate-y-1/2"></div>
//               )}
//             </div>
//           ))}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeaturesSection;

import { CalendarCheck, ShieldCheck, BadgeCheck, Zap } from "lucide-react";

const features = [
  {
    icon: CalendarCheck,
    desc: "Book events in seconds",
  },
  {
    icon: ShieldCheck,
    desc: "100% safe transactions",
  },
  {
    icon: BadgeCheck,
    desc: "Only trusted organizers",
  },
  {
    icon: Zap,
    desc: "No waiting, instant access",
  },
];

const FeaturesSection = () => {
  return (
    <div className="px-4 mt-16 mb-10">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white text-center mb-15">
          Why Choose Us?
        </h2>

        {/* Features Row */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center gap-6 md:gap-0">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="flex-1 relative flex flex-col items-center"
              >
                {/* Icon */}
                <Icon className="w-10 h-10 md:w-12 md:h-12 text-gray-300 mb-2 hover:text-red-400 transition" />

                {/* Description */}
                <p className="text-gray-400 text-sm md:text-base mt-1">
                  {item.desc}
                </p>

                {/* Divider */}
                {index !== features.length - 1 && (
                  <div className="hidden md:block absolute h-10 w-[1px] bg-gray-700 right-0 top-1/2 -translate-y-1/2"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
