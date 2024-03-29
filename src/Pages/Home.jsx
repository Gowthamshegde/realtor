import { useEffect, useState } from "react";
import Slider from "../components/Slider";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../fireBase";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import Bot from "./Bot";
function Home() {
  const [chatClick, setChatClick] = useState(false);
  // oofers
  const [offerListings, setOfferListing] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        console.log(listings);
        setOfferListing(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);
  // placess for rent
  const [rentListings, setRentListing] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          where("type", "==", "rent"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        console.log(listings);
        setRentListing(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);
  // placess for sale
  const [saleListings, setSaleListing] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          where("type", "==", "sale"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        console.log(listings);
        setSaleListing(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);

  function onchatClick() {
    setChatClick(!chatClick);
  }
  return (
    <div>
      <Slider clicked={chatClick} />
      <div className="max-w-6xl mx-auto space-y-6 ">
        {offerListings && offerListings.length > 0 && (
          <div className="m-2 mb-6 relative">
            <h2 className="text-2xl px-3 mt-6 font-semibold ">Recent Offers</h2>
            <Link to="/offers">
              <p className=" px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more Offers
              </p>
            </Link>
            <ul
              className={`sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${
                chatClick && "opacity-20"
              }`}
            >
              {offerListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
            <div
              className={`absolute -right-60  z-50 ${
                !chatClick && "bottom-28"
              } ${chatClick && "w-96  -bottom-10"}`}
            >
              <div>
                <img
                  className={`w-32 hover:scale-110 duration-200 transition overflow-hidden hover:cursor-pointer rounded-2xl shadow-xl ${
                    chatClick && "w-16"
                  }`}
                  src="data:image/png;base64,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"
                  alt=""
                  onClick={onchatClick}
                />
              </div>
              {chatClick && (
                <div className=" z-50 py-4 ">
                  <Bot />
                </div>
              )}
            </div>
          </div>
        )}

        {/* rent */}
        {rentListings && rentListings.length > 0 && (
          <div className={`m-2 mb-6 ${chatClick && "opacity-20"}`}>
            <h2 className="text-2xl px-3 mt-6 font-semibold ">
              Placess for rent
            </h2>
            <Link to="/category/rent">
              <p className=" px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more Places for rent
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {rentListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
        {/* sale */}
        {saleListings && saleListings.length > 0 && (
          <div className={`m-2 mb-6 ${chatClick && "opacity-20"}`}>
            <h2 className="text-2xl px-3 mt-6 font-semibold ">
              Placess for sale
            </h2>
            <Link to="/category/sale">
              <p className=" px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more Places for sale
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {saleListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
