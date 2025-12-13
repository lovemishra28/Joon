"use client";
import Image from "next/image";
import coverImage from "../../components/assets/homePagecover.png";
import headphone from "../../components/assets/div2images/headphone.jpg";
import sneaker from "../../components/assets/div2images/sneakers.jpg";
import sneaker2 from "../../components/assets/div4images/sneakers-2.jpg";
import iphone from "../../components/assets/div4images/iphone.jpg";
import Bag from "../../components/assets/div4images/Bag.jpg";
import jacket from "../../components/assets/div2images/jacket.jpg";
import shirt from "../../components/assets/div2images/shirt.jpg";
import mens from "../../components/assets/div3images/mens.jpg";
import womens from "../../components/assets/div3images/womens.jpg";
import Link from "next/link";
import { useRef } from "react";
import FadeImage from "../../components/ui/FadeImage";

export default function Home() {
  const mensRef = useRef<HTMLDivElement>(null);
  const womensRef = useRef<HTMLDivElement>(null);

  const handleScroll = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  return (
    <>
      <div className="flex flex-col box-border min-h-screen ">
        {/* fixed Welcome div */}

        <div className="">
          <div className=" flex justify-center items-center w-full px-5 py-6 h-60 bg-orange-400 text-white">
            <p className=" font-bold text-4xl text-white">WELCOME</p>
          </div>
        </div>

        {/* Div 1 content  */}

        <div className=" flex h-[calc(100vh-340px)] p-2">
          <div className="relative border flex grow rounded-2xl overflow-hidden">
            <FadeImage
              src={coverImage}
              alt="cover Image"
              fill
              className="object-center md:object-cover"
              priority
            />
            <div className=" top-2/5 md:top-6/10 left-1/15 absolute  p-5  md:w-max w-40 text-black font-bold font-sans text-left flex flex-col gap-4">
              <div>
                <p className="text-xs md:text-xl ">
                  Your world of products, one click away.
                </p>
              </div>
              <div>
                <p className="md:text-3xl ">
                  Discover more. spend less. smile bigger.
                </p>
              </div>
              <div>
                <Link href={"/shop"}>
                  <button className="p-3 rounded-4xl bg-orange-400  hover:bg-black text-white">
                    SHOP NOW
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Div 2 content */}

        <div className=" flex flex-col md:flex-row h-[600px]  md:h-[calc(100vh-100px)] p-2 gap-3">
          <div
            tabIndex={0}
            className="flex overflow-hidden w-full md:w-1/4 md:h-full h-1/4 focus:h-3/4 grow rounded-[20px] bg-black md:focus:h-full hover:rounded-[250px] transition-all md:transition-[border-radius] duration-300 "
          >
            <FadeImage
              src={headphone}
              alt="product"
              className="object-cover w-full h-full"
            />
          </div>
          <div
            tabIndex={0}
            className="flex overflow-hidden w-full md:w-1/4 md:h-full h-1/4 focus:h-3/4 grow rounded-[20px] bg-black md:focus:h-full hover:rounded-[250px] transition-all md:transition-[border-radius] duration-300 "
          >
            <FadeImage
              src={sneaker}
              alt="product"
              className="object-cover w-full h-full"
            />
          </div>
          <div
            tabIndex={0}
            className="flex overflow-hidden w-full md:w-1/4 md:h-full h-1/4 focus:h-3/4 grow rounded-[20px] bg-black md:focus:h-full hover:rounded-[250px] transition-all md:transition-[border-radius] duration-300 "
          >
            <FadeImage
              src={shirt}
              alt="product"
              className="object-cover w-full h-full"
            />
          </div>
          <div
            tabIndex={0}
            className="flex overflow-hidden w-full md:w-1/4 md:h-full h-1/4 focus:h-3/4 grow rounded-[20px] bg-black md:focus:h-full hover:rounded-[250px] transition-all md:transition-[border-radius] duration-300 "
          >
            <FadeImage
              src={jacket}
              alt="product"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Div 3 content */}

        <div className=" flex flex-col h-[calc(100vh-100px)] p-2 gap-3 ">
          <div className="flex justify-center items-center w-full gap-2">
            <button
              onClick={() => handleScroll(mensRef)}
              className="p-3 rounded-4xl border-2 border-black w-30 text-center"
            >
              Mens
            </button>
            <button
              onClick={() => handleScroll(womensRef)}
              className="p-3 rounded-4xl border-2 border-black w-30 text-center"
            >
              Womens
            </button>
          </div>
          <div className="flex flex-col h-[calc(100vh-100px)] grow md:flex-row gap-3 overflow-x-auto">
            <div
              ref={mensRef}
              className="w-full h-2/5 grow md:h-full shrink-0 rounded-2xl  border flex overflow-hidden relative"
            >
              <FadeImage
                src={mens}
                alt="Mens Category"
                className="object-center md:object-cover "
              />
              <div className="top-1/2 left-9/10 -translate-y-1/2 -translate-x-9/10 z-20 text-black absolute  p-2 w-1/3 h-8/10 flex flex-col justify-center items-center gap-8">
                <p className="text-2xl md:text-4xl text-white font-bold">
                  Trending Men's Fashion
                </p>
                <button className="p-3 rounded-4xl border-2 border-black bg-white text-black w-30 text-center">
                  Visit
                </button>
              </div>
            </div>
            <div
              ref={womensRef}
              className="w-full h-2/5 grow md:h-full shrink-0 rounded-2xl bg-yellow-300 border flex overflow-hidden relative"
            >
              <FadeImage
                src={womens}
                alt="Womens Category"
                className="object-center "
              />
              <div className="top-1/2 -translate-y-1/2 left-1/10 -translate-x-1/10  z-20 text-black absolute  p-2 w-1/3 h-8/10 flex flex-col justify-center items-center gap-8">
                <p className="text-2xl md:text-4xl text-white font-bold">
                  Trending Women's Fashion
                </p>
                <button className="p-3 rounded-4xl border-2 border-black bg-white text-black w-30 text-center">
                  Visit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Div 4 content */}

        <div className="flex flex-col md:flex-row min-h-[calc(100vh-100px)] md:h-[calc(100vh-100px)] p-2 bg-gray-100">
          <div className="w-full md:w-1/3 flex flex-col justify-center items-center text-center p-8">
            <h2 className="text-5xl font-bold text-gray-800 mb-4">
              Best Sellers
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Discover our most popular products, loved by customers worldwide.
            </p>
            <Link href={"/shop"}>
              <button className="p-3 px-8 rounded-full bg-orange-400 hover:bg-black text-white font-bold transition-colors">
                SHOP ALL
              </button>
            </Link>
          </div>
          <div className="w-full md:w-2/3 p-4 grid grid-cols-2 md:grid-cols-4 grid-rows-4 gap-4">
            {/* Main Image */}
            <div className="col-span-3 row-span-4 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
              <FadeImage
                src={sneaker2}
                alt="Best seller 1"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Side Images */}
            <div className="col-span-1 row-span-2 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
              <FadeImage
                src={iphone}
                alt="Best seller 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-1 row-span-2 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
              <FadeImage
                src={Bag}
                alt="Best seller 3"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
