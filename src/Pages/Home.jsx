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
function Home() {
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
  return (
    <div>
      <Slider />
      <div className="max-w-6xl mx-auto space-y-6">
        {offerListings && offerListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="text-2xl px-3 mt-6 font-semibold ">Recent Offers</h2>
            <Link to="/offers">
              <p className=" px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more Offers
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {offerListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}

        {/* rent */}
        {rentListings && rentListings.length > 0 && (
          <div className="m-2 mb-6">
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
          <div className="m-2 mb-6">
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
