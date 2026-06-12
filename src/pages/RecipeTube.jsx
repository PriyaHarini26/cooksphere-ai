import "./RecipeTube.css";

function RecipeTube() {
  const videos = [
    {
      title: "Chicken Biryani Recipe",
      image:
        "https://img.youtube.com/vi/95BCU1n268w/maxresdefault.jpg",
      link: "https://www.youtube.com/watch?v=95BCU1n268w",
    },
    {
      title: "Homemade Pizza",
      image:
        "https://img.youtube.com/vi/sv3TXMSv6Lw/maxresdefault.jpg",
      link: "https://www.youtube.com/watch?v=sv3TXMSv6Lw",
    },
    {
      title: "Creamy Pasta",
      image:
        "https://img.youtube.com/vi/ZJy1ajvMU1k/maxresdefault.jpg",
      link: "https://www.youtube.com/watch?v=ZJy1ajvMU1k",
    },
  ];

  return (
    <div className="recipe-tube">

      <h1>🎥 RecipeTube</h1>

      <p>Watch cooking tutorials from around the world</p>

      <div className="video-grid">

        {videos.map((video, index) => (
          <div
            className="video-card"
            key={index}
            onClick={() => window.open(video.link)}
          >

            <img src={video.image} alt={video.title} />

            <div className="video-info">
              <h3>{video.title}</h3>
              <button>▶ Watch Now</button>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default RecipeTube;