import HeroImage from "../assets/dt.svg";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-blue-50 relative">
      {/* 🔝 Navbar at top */}
      <Navbar />

      {/* 🦋 Hero Section */}
      <div className="pt-20 md:pt-20 flex items-center justify-center">
        <div className="ml-30 mt-20 max-w-7xl w-full flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          
          {/* 📝 Left: Text Content */}
          <div className="flex-3 text-center md:text-left animate-fade-up ml-4 md:ml-12">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight group">
              <span className="inline-block transition-all duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_25px_rgba(99,102,241,0.7)]">
                Meet Your{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                  Past Self
                </span>
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-gray-700 drop-shadow-sm max-w-xl mx-auto md:mx-0 transition duration-300 group-hover:scale-105">
              ✨ The Digital Twin Journal is your AI-powered mirror — where your past reflections evolve into a wiser version of you, ready to guide, remind, and reflect.
            </p>

            <div className="mt-8">
              <a
                href="/register"
                className="relative inline-block px-8 py-3 text-white font-semibold text-lg rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-300 hover:scale-105"
              >
                Start Journaling Now 🚀
                <span className="absolute top-0 left-0 w-full h-full rounded-xl opacity-10 bg-white animate-ping pointer-events-none"></span>
              </a>
            </div>
          </div>
          <div className="flex-1 flex "></div>
          {/* 🖼️ Right: Image */}
          <div className="flex-2 flex justify-center items-center p-8 md:p-20">
            <img
              src={HeroImage}
              alt="Digital Twin Illustration"
              className="w-full max-w-md transition-transform duration-500 hover:scale-105 hover:-rotate-1 hover:drop-shadow-[0_0_20px_rgba(147,51,234,0.4)] animate-float"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
