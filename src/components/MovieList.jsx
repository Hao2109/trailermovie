import { useState } from "react";
import PropTypes from "prop-types";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Modal from 'react-modal';
import YouTube from "react-youtube";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 10,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 7,
  },
  tablet: {
    breakpoint: { max: 1200, min: 600 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 2,
  }
};

const opts = {
  height: '390',
  width: '640',
  playerVars: {
    autoplay: 1,
  },
};

const MovieList = ({ title, data }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [videoId, setVideoId] = useState('');

  const handleTrailer = async (id) => {
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        },
      };
      const response = await fetch(url, options);
      const movieData = await response.json();
      const trailer = movieData.results.find(vid => vid.type === "Trailer");
      if (trailer) {
        setVideoId(trailer.key);
        setModalIsOpen(true);
      }
      setModalIsOpen(true)
    } catch (error) { 
      setModalIsOpen(false)
      console.error(error);
    }
  };

  return (
    <div className="text-white p-10 mb-10">
      <h2 className="uppercase text-xl">{title}</h2>
      <Carousel responsive={responsive} className="flex items-center space-x-4">
        {data.length > 0 && data.map((item) => (
          <div
            key={item.id}
            className="w-[200px] h-[300px] relative group0"
            onClick={() => handleTrailer(item.id)}
          >
            <div className="group-hover:scale-105 transition-transform duration-500 ease-in-out w-full h-full cursor-pointer">
              <div className="absolute top-0 left-0 w-full h-full bg-black/40" />
              <img src={`${import.meta.env.VITE_IMG_URL}${item.poster_path}`} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-4 left-2">
                <p className="uppercase text-lg">{item.title || item.name || item.original_name}</p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Movie Trailer"
        style={{
          overlay: {
            position:"fixed",
            zIndex: 9999,
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <YouTube videoId={videoId} opts={opts} />
      </Modal>
    </div>
  );
};

MovieList.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array
};

export default MovieList;
