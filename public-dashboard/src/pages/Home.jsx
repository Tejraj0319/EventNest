import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../features/events/eventsSlice";
import HeroCarousel from "../components/HeroCarousel";
import EventRow from "../components/EventRow";
import CategorySection from "../components/CategorySection";
import FeaturesSection from "../components/FeaturesSection";

const Home = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <HeroCarousel />

      {/* ROWS */}
      <EventRow title="Recommended Events" events={events.slice(0, 10)} />
      <CategorySection/>
      <FeaturesSection/>
    </div>
  );
};

export default Home;