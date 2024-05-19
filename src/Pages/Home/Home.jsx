import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import LibraryIllustration from "../../Assets/Images/bookbackgrd.jpg";
import jwt_decode from "jwt-decode";
import Navbar from "../Navbar/Navbar.jsx";
import {
  GenreCard,
  NewArrivals,
  Footer,
  useWishlist,
  useCart,
} from "../../index.js";
import { useProductAvailable } from "../../Context/product-context";
import { useGenre } from "../../Context/genre-context";
import "./Home.css";

function Home() {
  const { dispatchProductFilterOptions } = useProductAvailable();
  const { dispatchUserWishlist } = useWishlist();
  const { dispatchUserCart } = useCart();
  const {
    setFictionCategoryCheckbox,
    setThrillerCategoryCheckbox,
    setTechCategoryCheckbox,
    setPhilosophyCategoryCheckbox,
    setRomanceCategoryCheckbox,
    setMangaCategoryCheckbox,
  } = useGenre();

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = jwt_decode(token);
      if (!user) {
        localStorage.removeItem("token");
      } else {
        (async function getUpdatedWishlistAndCart() {
          let updatedUserInfo = await axios.get(
            "https://bookztron-server.vercel.app/api/user",
            {
              headers: {
                "x-access-token": localStorage.getItem("token"),
              },
            }
          );

          if (updatedUserInfo.data.status === "ok") {
            dispatchUserWishlist({
              type: "UPDATE_USER_WISHLIST",
              payload: updatedUserInfo.data.user.wishlist,
            });
            dispatchUserCart({
              type: "UPDATE_USER_CART",
              payload: updatedUserInfo.data.user.cart,
            });
          }
        })();
      }
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="home-component-container">
        <div className="home-page-img-container">
          <img
            className="home-page-background-img"
            src={LibraryIllustration}
            alt="Library Illustration"
          />
        </div>

        <div className="about-us-container">
          <h2 className="homepage-headings">About Us</h2>
          <p className="about-us-text">
            Welcome to Bookztron, your go-to online bookstore. We are dedicated
            to providing a vast collection of books across various genres to
            cater to all kinds of readers. Whether you're looking for the latest
            bestsellers, classic literature, or educational resources, we have
            it all. Our mission is to foster a love for reading by making books
            accessible and affordable for everyone. Explore our curated
            collections and find your next great read!
          </p>
        </div>

        <h1 className="homepage-headings">Genres</h1>
        <p className="homepage-subtext">
          Discover books from a variety of genres. Whether you’re into thrilling
          mysteries, romantic tales, tech guides, philosophical reads, or the
          latest manga, we have something for everyone.
        </p>
        <div className="genre-cards-container">
          <Link to={"/shop"}>
            <GenreCard genretype="Fiction" />
          </Link>
          <Link to={"/shop"}>
            <GenreCard genretype="Thriller" />
          </Link>
          <Link to={"/shop"}>
            <GenreCard genretype="Tech" />
          </Link>
          <Link to={"/shop"}>
            <GenreCard genretype="Philosophy" />
          </Link>
          <Link to={"/shop"}>
            <GenreCard genretype="Romance" />
          </Link>
          <Link to={"/shop"} state={{ navigate: true }}>
            <GenreCard genretype="Manga" />
          </Link>
        </div>

        <Link to={"/shop"}>
          <button
            onClick={() => {
              setFictionCategoryCheckbox(true);
              setThrillerCategoryCheckbox(true);
              setTechCategoryCheckbox(true);
              setPhilosophyCategoryCheckbox(true);
              setRomanceCategoryCheckbox(true);
              setMangaCategoryCheckbox(true);
              dispatchProductFilterOptions({ type: "RESET_DEFAULT_FILTERS" });
            }}
            className="solid-secondary-btn homepage-explore-all-btn"
          >
            Explore All
          </button>
        </Link>

        <h1 className="homepage-headings">New Arrivals</h1>
        <p className="homepage-subtext">
          Stay updated with the latest additions to our collection. From hot new
          releases to hidden gems, explore the books that everyone is talking
          about.
        </p>
        <div className="new-arrivals-container">
          <NewArrivals />
        </div>

        <div className="new-arrivals-extra">
          <h1 className="homepage-headings">More New Arrivals</h1>
          <div className="new-arrivals-container">
            {/* Add your additional new arrivals here */}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export { Home };
