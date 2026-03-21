import Navbar from "./components/Navbar";
import ProductBrief from "./components/ProductBreif";

function App() {
  return (
    <div className="">
      <Navbar />
      <div
        className="px-4 md:px-20 mt-8 w-full font-League leading-none flex flex-col gap-4"
        style={{ fontSize: "clamp(60px, 18vw, 300px)" }}
      >
        <div className="flex justify-between items-center">
          <p className="-ml-1">EMBRACE</p>
          <img
            src="https://i.pinimg.com/736x/f4/28/a8/f428a8f8fcda2f0f5247f43acf1dea16.jpg"
            alt="perfume"
            className="object-cover"
            style={{
              width: "clamp(120px, 25vw, 450px)",
              height: "clamp(60px, 12.5vw, 225px)",
            }}
          />
          <p>THE</p>
        </div>

        <div className="flex justify-between items-center">
          <img
            src="https://i.pinimg.com/736x/e1/0d/e0/e10de0e5d0d9398818a33b8c21419796.jpg"
            alt="perfume"
            className="object-cover"
            style={{
              width: "clamp(40px, 8vw, 150px)",
              height: "clamp(60px, 12.5vw, 225px)",
            }}
          />
          <p>EXTRAORDINARY</p>
        </div>

        <button className="outline-2 outline-black outline-offset-4 bg-neutral-50 w-3xs h-8 sm:w-xl sm:h-12 mt-8 self-center text-[20px] sm:text-[30px] leading-normal text-primary-50 rounded-4xl cursor-pointer">
          Explore
        </button>
      </div>
      <ProductBrief />
    </div>
  );
}

export default App;
