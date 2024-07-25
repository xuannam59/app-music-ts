// Aplayer
const aplayer = document.querySelector("#aplayer");
if (aplayer) {
  let dataSong = aplayer.getAttribute("data-song");
  dataSong = JSON.parse(dataSong);

  let dataSinger = aplayer.getAttribute("data-singer");
  dataSinger = JSON.parse(dataSinger);

  const ap = new APlayer({
    container: document.getElementById('aplayer'),
    lrcType: 1,
    audio: [{
      name: dataSong.title,
      artist: dataSinger.fullName,
      url: dataSong.audio,
      cover: dataSong.avatar,
      lrc: dataSong.lyrics
    }],
    autoplay: true,
    volume: 0.5
  });

  const avatarSong = document.querySelector(".singer-detail .inner-avatar");

  ap.on('play', function () {
    avatarSong.style.animationPlayState = "running";
  });

  ap.on('pause', function () {
    avatarSong.style.animationPlayState = "paused";
  });

  ap.on('ended', function () {
    const link = `/songs/listen/${dataSong._id}`;
    const option = {
      method: "PATCH"
    }
    fetch(link, option)
      .then(res => res.json())
      .then(data => {
        if (data.code == 200) {
          const innerListen = document.querySelector(".singer-detail .inner-actions .inner-listen .inner-number");
          innerListen.innerHTML = data.listen;
        }
      });
  })
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

// Suggest search
const inputSreach = document.querySelector(".box-search input");
if (inputSreach) {
  const boxSuggest = document.querySelector(".inner-suggest");
  const list = boxSuggest.querySelector(".inner-list");
  inputSreach.addEventListener("keyup", () => {
    const value = inputSreach.value;


    const link = `/search/suggest?keyword=${value}`;
    fetch(link)
      .then(res => res.json())
      .then(data => {
        if (data.songs.length > 0) {
          boxSuggest.classList.add("show");
          const html = data.songs.map(song => {
            return `
            <a class="inner-item" href="/songs/detail/${song.slug}">
              <div class="inner-image"><img src="${song.avatar}"/></div>
              <div class="inner-info">
                  <div class="inner-title">${song.title}</div>
                  <div class="inner-singer"><i class="fa-solid fa-microphone-lines"></i> ${song.singer.fullName}</div>
              </div>
            </a>
            `
          }).join("");
          list.innerHTML = html;
        } else {
          boxSuggest.classList.remove("show");
        }
      });
  })
}



