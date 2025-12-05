import Image from "next/image";
import Navbar from "../../components/navbar/page";

export default function Home() {
  return (
    <>
      <div className="flex flex-col box-border min-h-screen ">
        
        {/* fixed Welcome div */}

        <div className="border">
          <div className=" flex justify-center items-center w-full px-5 py-6 h-60 bg-black text-white">
            <p className=" font-bold text-4xl">WELCOME</p>
          </div>
        </div>

        {/* Div 1 content  */}

        <div className="border flex min-h-[calc(100vh-100px)] p-2">
          <div className="border flex grow rounded-2xl bg-orange-800"></div>
        </div>

        {/* Div 2 content */}

        <div className="border flex min-h-[calc(100vh-100px)] p-2 gap-3" >
          <div className="w-1/4 grow rounded-2xl bg-indigo-700 "></div>
          <div className="w-1/4 grow rounded-2xl bg-indigo-700 "></div>
          <div className="w-1/4 grow rounded-2xl bg-indigo-700 "></div>
          <div className="w-1/4 grow rounded-2xl bg-indigo-700 "></div>
        </div>

        {/* Div 3 content */}

        

        <div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div></div>
        <div></div>
      </div>
    </>
  );
}
