import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
    <div className="bg-bgPrimary min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        {/* flex grow mean i cover all the empty space */}
        {/* mean parent children render (outlet) */}
        <Outlet /> 
      </div>
      <footer className="">Footer</footer>
    </div>
    </>
  )
}





