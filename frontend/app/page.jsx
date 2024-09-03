import Link from "next/link";
import Navbar from "@/components/structComponents/Navbar";


export default function Home() {
  return (
    <>
 
      <div className="h-screen bg-cream">
        <Navbar />
        <div className="p-6">
          <div className="text-center mb-3 md:mb-6 md:flex md:justify-center gap-8 font-semibold md:text-2xl">
            <h2 className="">
              Helpline No.: <span className="font-bold">+91 89XXX XXX32</span>
            </h2>
            <h2 className="">
              Email id: <span className="font-bold">something@gmail.com</span>
            </h2>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href="/student" className="student">
              <div className="bg-white p-6 rounded-md shadow-md text-center hover:bg-lime-400 duration-300">
                <h2 className="text-xl font-semibold">Student Login</h2>
              </div>
            </Link>
            <Link href="/teacher" className="teacher">
              <div className="bg-white p-6 rounded-md shadow-md text-center hover:bg-red-400 duration-300">
                <h2 className="text-xl font-semibold">Teacher Login</h2>
              </div>
            </Link>
            <Link href="/administrator" className="admin">
              <div className="bg-white p-6 rounded-md shadow-md text-center hover:bg-blue-400 duration-300">
                <h2 className="text-xl font-semibold">Administrator Login</h2>
              </div>
            </Link>
          </div>
        </div>
      </div>
     
    </>
  );
}
