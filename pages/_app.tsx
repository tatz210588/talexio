import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import * as globeLoaderData from "../assets/globe.json";
import * as successLoaderData from "../assets/success.json";
import { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

const globeLoader = {
  loop: true,
  autoplay: true,
  animationData: globeLoaderData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const successLoader = {
  loop: true,
  autoplay: true,
  animationData: successLoaderData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const SurveyPOC = ({ Component, pageProps }: AppProps) => {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const [loaderSize, setLoaderSize] = useState(320);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
      setTimeout(() => {
        setCompleted(true);
      }, 1000);
    }, 4000);
  }, []);

  return (
    <>
      {!completed ? (
        <div className="loading-container container">
          {!loading ? (
            <Lottie
              options={globeLoader}
              height={loaderSize}
              width={loaderSize}
            />
          ) : (
            <Lottie
              options={successLoader}
              height={loaderSize}
              width={loaderSize}
            />
          )}
        </div>
      ) : (
        <>
          <Header />
          <Toaster position="top-center" reverseOrder={false} />
          <Component {...pageProps} />
          <Footer />
        </>
      )}
    </>
  );
};

export default SurveyPOC;
