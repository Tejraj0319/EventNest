import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Music",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=30&w=400",
  },
  {
    name: "Comedy",
    image:
      "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?q=30&w=400",
  },
  {
    name: "Workshops",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=30&w=400",
  },
  {
    name: "Sports",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCGOSFj6LxwF7wnXuHGUHfqeh3Mgk2z6ukYA&s?q=30&w=400",
  },
  {
    name: "Theatre",
    image:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?q=30&w=400",
  },
];

const CategorySection = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 mt-10">
      <h2 className="text-lg md:text-xl font-bold mb-4 text-white">
        Browse by Category
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => navigate(`/events?category=${cat.name}`)}
            className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition"
          >
            {/* Background Image */}
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 blur-[1px]"
              loading="lazy"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition"></div>

            {/* Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white text-sm md:text-base font-semibold">
                {cat.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;