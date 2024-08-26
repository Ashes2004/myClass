import StudentLayout from "../Student/studentLayout";
import SearchBar from "./SearchBar";
import Image from "next/image";
import Link from "next/link";
import { sampleProfile } from "@/public/Images";
import {
  events,
  featuredBooks,
  savedBooks,
  subjectBooks,
} from "@/app/constants/books";
import { book, budget, rightArrow } from "@/public/Icons";

const DigitalLibrary = () => {
  return (
    <StudentLayout>
      <div className="bg-cream text-black flex flex-col p-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between md:items-center rounded-md">
          <h1 className="text-xl md:text-3xl font-bold">
            Welcome to the Digital Library 📚
          </h1>
          <div className="flex sm:flex-row justify-start gap-3 md:justify-center items-center mt-3 mb-3 md:mb-0">
            <SearchBar />
            <div className="bg-white rounded-full">
              <Image
                src={sampleProfile}
                alt="profile"
                width={42}
                height={42}
                className="object-cover cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col md:grid grid-cols-1 lg:grid-cols-6 gap-6">
          {/* Left Section */}
          <div className="col-span-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-lg md:text-xl">
                Subject Textbooks
              </h3>
              <Link
                href="#"
                className="hover:underline decoration-solid underline-offset-4 cursor-pointer hover:text-green-custom duration-200"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-2 mb-6">
              {subjectBooks.map((item) => {
                const backgroundImageStyle = {
                  backgroundImage: `url(${item.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                };

                return (
                  <Link
                    href={`${item.link}`}
                    key={item.id}
                    className="relative bg-white text-white p-4 shadow-xl rounded-xl hover:scale-105 duration-300"
                    style={backgroundImageStyle}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-slate-600/40 to-black rounded-xl"></div>
                    <div className="relative p-4 h-full">
                      <h2 className="text-lg font-bold">{item.title}</h2>
                      <p className="text-sm">Author: {item.author}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white shadow-xl rounded-lg p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-300 rounded-full p-3">
                    <Image
                      src={book}
                      alt="book"
                      width={24}
                      height={24}
                      className="object-cover"
                    />
                  </div>
                  <h2 className="font-bold text-lg md:text-xl">
                    Request a Book
                  </h2>
                </div>
                <p className="font-semibold text-sm md:text-base mb-1">
                  Looking for a particular book? We got you!!
                </p>
                <div className="flex justify-between items-center">
                  <p>Request the school's librarian for the book!</p>
                  <Link
                    href="/"
                    className="bg-green-300 hover:bg-green-600 duration-200 p-4 rounded-xl"
                  >
                    <h2 className="font-semibold text-center">
                      Send a Request
                    </h2>
                  </Link>
                </div>
              </div>

              <div className="bg-white shadow-xl rounded-lg p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-300 rounded-full p-3">
                    <Image
                      src={budget}
                      alt="price"
                      width={24}
                      height={24}
                      className="object-cover"
                    />
                  </div>
                  <h2 className="font-bold text-lg md:text-xl">Buy a Book</h2>
                </div>
                <p className="font-semibold text-sm md:text-base mb-1">
                  Want to Buy a Book? We got you!!
                </p>
                <div className="flex justify-between items-center">
                  <p>Place your order for the book here!</p>
                  <Link
                    href="/"
                    className="bg-blue-300 hover:bg-blue-600 duration-200 p-4 rounded-xl"
                  >
                    <h2 className="font-semibold text-center">Place Order</h2>
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center my-3">
              <h3 className="font-bold text-lg md:text-xl">Featured Books</h3>
              <Link
                href="#"
                className="hover:underline hover:text-green-custom duration-200 decoration-solid underline-offset-4 cursor-pointer"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredBooks.map((item, index) => {
                if (index < 5) {
                  const backgroundImageStyle = {
                    backgroundImage: `url(${item.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  };
                  return (
                    <Link
                      href={`${item.link}`}
                      key={item.id}
                      className="relative bg-white text-white p-4 shadow-xl rounded-xl hover:scale-105 duration-300"
                      style={backgroundImageStyle}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-slate-600/40 to-black rounded-xl"></div>
                      <div className="relative p-4 h-full">
                        <h2 className="text-lg font-bold">{item.title}</h2>
                        <p className="text-sm">Author: {item.author}</p>
                      </div>
                    </Link>
                  );
                } else null;
              })}
            </div>
          </div>

          {/* Right Section */}
          <div className="col-span-2 pt-3">
            <div className="flex flex-col gap-2">
              <div className="hidden md:block bg-white shadow-xl rounded-xl p-4">
                <h2 className="font-bold text-2xl mb-2">Quote of the Day:</h2>
                <h2 className="text-xl font-serif">
                  "One glance at a book and you hear the voice of another
                  person, perhaps someone dead for 1,000 years. To read is to
                  voyage through time." ~ Carl Sagan
                </h2>
              </div>
              <div className="bg-white shadow-xl rounded-xl p-4 mt-2">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-lg md:text-xl">
                    Your Saved Books
                  </h3>
                  <Link
                    href="#"
                    className="hover:underline decoration-solid underline-offset-4 cursor-pointer hover:text-green-custom duration-200"
                  >
                    View All
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {savedBooks.map((item, index) => {
                    if (index < 3) {
                      const backgroundImageStyle = {
                        backgroundImage: `url(${item.img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      };
                      return (
                        <Link
                          href={`${item.link}`}
                          key={item.id}
                          className="relative bg-white text-white p-4 shadow-xl rounded-xl hover:scale-105 duration-300"
                          style={backgroundImageStyle}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-slate-600/40 to-black rounded-xl"></div>
                          <div className="relative p-4 h-full">
                            <h2 className="text-lg font-bold">{item.title}</h2>
                            <p className="text-sm">Author: {item.author}</p>
                          </div>
                        </Link>
                      );
                    } else null;
                  })}
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <h3 className="font-bold text-lg md:text-xl">
                  Upcoming Events
                </h3>
                <Link
                  href="#"
                  className="hover:underline hover:text-green-custom duration-200 decoration-solid underline-offset-4 cursor-pointer"
                >
                  Check
                </Link>
              </div>
              <div className=" flex flex-col gap-2 mt-2">
                {events.map(
                  (item, index) =>
                    index < 3 && (
                      <div
                        key={item.id}
                        className="bg-white shadow-xl flex justify-between items-center p-3 py-4 rounded-lg"
                      >
                        <div className="flex gap-2 items-center">
                          <div className={`${item.bg} rounded-full p-3`}>
                            <Image
                              src={item.icon}
                              alt={item.event}
                              width={24}
                              height={24}
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-col">
                            <h2 className="font-bold">{item.event}</h2>
                            <p className="font-semibold">Date: {item.date}</p>
                          </div>
                        </div>
                        <div className="bg-gray-300 hover:bg-gray-600 duration-300 rounded-2xl p-3">
                          <Image
                            src={rightArrow}
                            alt="arrow"
                            width={24}
                            height={24}
                            className="object-cover cursor-pointer"
                          />
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default DigitalLibrary;
