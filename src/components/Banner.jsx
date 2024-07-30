
import IconRatingHalf from "../assets/rating.png";
import IconRating from "../assets/starfull.png"
import ImgTemp from "../assets/poster.png"
import IconPlay from "../assets/play-button.png"
const Banner = () => {
  return (
    <div className="w-full h-[600px] bg-banner bg-no-repeat bg-cover bg-center relative">
      <div className="absolute w-full h-full top-0 left-0 bg-black opacity-30"/>
      <div className="w-full h-full flex items-center justify-center space-x-[30px] p-4 relative z-20">
        <div className="flex flex-col space-y-5 items-baseline w-[50%]">
          <p className="text-white bg-gradient-to-r from-red-600 to-red-200 text-lg py-2 px-3  ">TV Shows</p>
          <div className="flex flex-col space-y-4"></div>
          <h2 className="text-white text-[40px] font-bold">Pearl Movie</h2>
          <div className="flex items-center space-x-3">
            <img src={IconRating} alt="rating" className="w-8 h-8"/>
            <img src={IconRating} alt="rating" className="w-8 h-8"/>
            <img src={IconRating} alt="rating" className="w-8 h-8"/>
            <img src={IconRating} alt="rating" className="w-8 h-8"/>
            <img src={IconRatingHalf} alt="rating" className="w-8 h-8"/>

          </div>
          <p className="text-white">
          A prequel to X (2022) and the second installment in the X film series, it serves as an origin story for the title villain, whose fervent aspiration to become a movie star led to her committing violent acts on her family of Texas homestead in 1918.
          </p>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-white bg-black font-bold text-sm">Chi tiết</button>
            <button className="p-2 text-white bg-red-500 font-bold text-sm">Xem phim</button>
          </div>

        </div>
        <div className="w-[50%] flex items-center justify-center">
          <div className="w-[300px] h-[400px] relative group cursor-pointer">
            <img src={ImgTemp} alt="temp" className="w-full h-full object-cover" />
            <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-100 ease-in-out">
              <img src={IconPlay} alt="" />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
