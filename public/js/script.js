// Aplayer
const aplayer = document.querySelector("#aplayer");
if (aplayer) {
  let dataSong = aplayer.getAttribute("data-song");
  dataSong = JSON.parse(dataSong);

  let dataSinger = aplayer.getAttribute("data-singer");
  dataSinger = JSON.parse(dataSinger);

  const ap = new APlayer({
    container: document.getElementById('aplayer'),
    audio: [{
      name: dataSong.title,
      artist: dataSinger.fullName,
      url: dataSong.audio,
      cover: dataSong.avatar
    }],
    autoplay: true,
    volume: 0.5
  });

  const avaterSong = document.querySelector(".singer-detail .inner-avatar");

  ap.on('play', function () {
    avaterSong.style.animationPlayState = "running";
  });

  ap.on('pause', function () {
    avaterSong.style.animationPlayState = "paused";
  });
}

// Press like button
const buttonLike = document.querySelector("[button-like]");
if (buttonLike) {
  buttonLike.addEventListener("click", () => {
    const songId = buttonLike.getAttribute("button-like");
    const typeLike = buttonLike.classList.contains("active") ? "dislike" : "like";

    const link = `/songs/detail/like/${typeLike}/${songId}`
    const option = {
      method: "PATCH"
    }

    fetch(link, option)
      .then(res => res.json())
      .then(data => {
        if (data.code == 200) {
          buttonLike.classList.toggle("active");
          const span = buttonLike.querySelector("span");
          span.innerHTML = `${data.like} thích`
        }
      });
  })
}

// Press favorit button
const listButtonFavorit = document.querySelectorAll("[button-favorite]");
if (listButtonFavorit.length > 0) {
  listButtonFavorit.forEach(buttonFavorit => {
    buttonFavorit.addEventListener("click", () => {
      const songId = buttonFavorit.getAttribute("button-favorite");
      const typeFavorite = buttonFavorit.classList.contains("active") ? "unFavorite" : "favorite";

      const link = `/songs/detail/favorite/${typeFavorite}/${songId}`;
      const option = {
        method: "PATCH"
      }

      fetch(link, option)
        .then(res => res.json())
        .then(data => {
          if (data.code == 200) {
            buttonFavorit.classList.toggle("active");
          }
        });
    });
  })
}



