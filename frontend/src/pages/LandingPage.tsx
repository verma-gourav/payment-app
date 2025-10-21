import { useNavigate } from "react-router-dom";
import Logo from "../assets/icons/Logo";
import Button from "../components/common/Button";
import landingImage from "../assets/landingImage.svg";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-start mx-4 sm:mx-6 md:mx-8 lg:mx-12 text-primary">
      {/* Navbar */}
      <header className="flex justify-between items-center px-4 sm:px-8 py-5">
        <div className="flex items-center text-black gap-2 cursor-pointer">
          <Logo />
        </div>

        <div className="flex gap-6">
          <Button
            variant="secondary"
            size="md"
            text="Login"
            onClick={() => navigate("/auth?mode=signin")}
          />
          <Button
            variant="primary"
            size="md"
            text="SignUp"
            onClick={() => navigate("/auth?mode=signup")}
          />
        </div>
      </header>

      {/* Hero section */}
      <main className=" flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 md:px-10 lg:px-20 py-8 gap-8 lg:gap-12">
        {/* Left side */}
        <div className="flex-1 max-w-lg space-y-6 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
            Payments <br /> Made <span className="text-black">Easy.</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 mt-6 lg:mt-10">
            Free Wallet Payment Gateway — fast, secure, and reliable.
          </p>

          <button className="text-dark cursor-pointer font-semibold border-b-2 border-dark hover:opacity-70 transition">
            Learn More
          </button>

          <div className="flex items-center justify-center lg:justify-start gap-3 pt-6 lg:pt-10">
            <div className="w-6 h-6 border-2 border-black rounded-full"></div>
            <p className="text-gray-700">
              Best Wallet Payment Gateway <br />
              <span className="text-sm text-gray-500">Go Live instantly</span>
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex-1 flex justify-center items-center mt-8 lg:mt-0">
          <div className="w-[80vw] max-w-[500px] h-[300px] sm:h-[400px] md:h-[450px] lg:w-[600px] lg:h-[500px] flex items-center justify-center">
            <img
              src={landingImage}
              alt="Payment illustration"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-400 mt-10 py-8">
        © {new Date().getFullYear()} WalletPay — All rights reserved
      </footer>
    </div>
  );
};

export default LandingPage;
