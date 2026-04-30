




// import Sidebar from "../components/Sidebar";
// import HeroBanner from "../components/home/HeroBanner";
// import CurrentAffairs from "../components/home/CurrentAffairs";
// import PracticeSection from "../components/home/PracticeSection";
// import PopularTests from "../components/home/PopularTests";


import Sidebar from "../components/home/Sidebar";
import HeroBanner from "../components/home/HeroBanner";
import CurrentAffairs from "../components/home/CurrentAffairs";
import PracticeSection from "../components/home/PracticeSection";
import PopularTests from "../components/home/PopularTests";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main
        className="
          flex-1
          w-full
          transition-all
          duration-300
          
          /* spacing fix */
          px-4 sm:px-6 lg:px-8
          py-6

          /* sidebar offset only on desktop */
          md:ml-64
        "
      >
        {/* Centered Container */}
        <div className="max-w-7xl mx-auto space-y-10">

          {/* Hero */}
          <HeroBanner />

          {/* Current Affairs */}
          <section>
            <CurrentAffairs />
          </section>

          {/* Practice */}
          <section>
            <PracticeSection />
          </section>

          {/* Popular Tests */}
          <section>
            <PopularTests />
          </section>

        </div>
      </main>
    </div>
  );
};

export default Home;