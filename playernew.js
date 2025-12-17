// =================== DOM ELEMENTS ===================


const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const back10Btn = document.getElementById("backward-btn");
const forward10Btn = document.getElementById("forward-btn");
const shuffleBtn = document.getElementById("shuffle-btn");
const repeatBtn = document.getElementById("repeat-btn");
const repeatIcon = document.getElementById("repeat-icon");
const shuffleIcon = document.getElementById("shuffle-icon");

const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const seek = document.getElementById("seek");
const volumeSlider = document.getElementById("volume");
const rateSlider = document.getElementById("rate-slider");
const currentRateEl = document.getElementById("current-rate");

const coverImg = document.getElementById("cover");
const trackTitle = document.getElementById("track-title");
const trackArtist = document.getElementById("track-artist");
const playerRoot = document.querySelector(".player");
const trackInfo = document.querySelector(".track-info");
const coverInner = document.querySelector(".cover-inner");
const playlistEl = document.getElementById("playlist");
const titleWrap = document.querySelector(".track-title-wrap");

const canvas = document.getElementById("waveform");
const ctx = canvas.getContext("2d");

// ... (Các const cũ giữ nguyên)

// === QUEUE ELEMENTS ===
const tabLyricsBtn = document.getElementById("tab-lyrics-btn");
const tabQueueBtn = document.getElementById("tab-queue-btn");
const contentLyrics = document.getElementById("tab-content-lyrics");
const contentQueue = document.getElementById("tab-content-queue");
const queueListEl = document.getElementById("queue-list");
const queueCountEl = document.getElementById("queue-count");
const queueEmptyMsg = document.querySelector(".queue-empty-msg");

let queue = []; // Mảng chứa danh sách chờ

// =================== PLAYLIST ===================
// const tracks = [

//  {title: "2 4", artist: "titie", src: "music/242.mp3", cover: "pics/dnha9.jpg"},
// ]

// =================== DANH SÁCH 3 PLAYLIST ===================
// Bạn copy danh sách bài cũ vào mảng tracks của "Danh Sách 1"
// Các danh sách 2 và 3 để trống hoặc thêm bài mẫu
const allPlaylists = [
  {
    name: "R&B",
    tracks: [
      { title: "Đừng Để Nước Mắt Rơi", artist: "VSTRA", src: "music/nuocmat.mp3", cover: "pics/yuyu/yuyu13.jpg",
        lyrics: "lyrics/nuocmat.json", // <--- ĐẢM BẢO ĐƯỜNG DẪN NÀY ĐÚNG
        fontSet: "vi"
      },
      { title: "Vườn Sao Băng", artist: "puppy", src: "vuonsaobang.mp3", cover: "pics/yuyu3.jpg",
         lyrics: "lyrics/vuonsaobang.json", 
         fontSet: "vi"
       },
      { title: "Wrong Times", artist: "puppy", src: "wrongtimes.mp3", cover: "pics/dnha16.jpg" ,
        lyrics: "lyrics/wrongtimes.json",
        fontSet: "jp"
      },
      { title: "Nếu Lúc Đó", artist: "tlinh", src: "neulucdo.mp3", cover: "pics/yuyu5.jpg",
        lyrics: "lyrics/neulucdo.json"
       },
      { title: "In The Rain", artist: "XG", src: "in-the-rain.mp3", cover: "pics/yuyu6.jpg" },
      
      { title: "Love My Friend", artist: "Shayda", src: "lovemyfriend.mp3", cover: "pics/yuyu8.jpg" },
     
     
      { title: "Anh Iu", artist: "Saabirose", src: "anh-iu.mp3", cover: "pics/dnha4.jpg" },
      
      {title: "Where You Are", artist: "NINGNING", src: "music/ningning.mp3", cover: "pics/yuki/yuki12.jpg"},
      { title: "Call Me On My Phone 2", artist: "puppy", src: "music/callme22.mp3", cover: "pics/dnha20.jpg" },
      { title: "Stairway To Heaven", artist: "puppy", src: "music/stairwaytoheaven.mp3", cover: "pics/dnha17.jpg"},
      {title: "Làm lành chữa tình", artist: "tlinh", src: "music/lamlanh.mp3", cover: "pics/dnha18.jpg"},
      
      
       
      
      {title: "Ngẩn Nger", artist: "puppy", src: "music/ngannger.mp3", cover: "pics/dnha1.jpg",
        lyrics: "lyrics/ngannger.json"
      },
     
     
      {title: "Lệ Lưu Ly", artist: "Vũ Tiên", src: "music/leluuly.mp3", cover: "pics/dnha33.jpg"},
      
      
       {title: "FEVER", artist: "tlinh", src: "music/fever.mp3", cover: "pics/yuki/yuki8.jpg",
          lyrics: "lyrics/fever.json"
       },
       {title: "TOXIC", artist: "MEOVV", src: "music/toxic.mp3", cover: "pics/yuki/yuki20.jpg"},
       {title: "Love Language", artist: "VIVIZ UMJI", src: "music/lovelanguage.mp3", cover: "pics/dnha/dnha75.jpg"},
          {title: "NVMD", artist: "Denise Julia", src: "music/nvmd.mp3", cover: "pics/dnha/dnha79.jpg"}
      
      
    ]
  },
  {
    name: "Dreamy Vibes",
    tracks: [
       // Bạn tự thêm bài hát cho Playlist 2 vào đây sau
       {title: "Trời Giấu Trời Mang Đi", artist: "AMEE", src: "music/troigiautroimangdi.mp3", cover: "pics/yuyu9.jpg",
          lyrics:"lyrics/troigiau.json"
       },
       {title: "Hai Mươi Hai", artist: "AMEE", src: "music/haihai.mp3", cover: "pics/yuyu11.jpg",
          lyrics: "lyrics/haihai.json"
       },
        {title: "Miền Mộng Mị", artist: "AMEE", src: "music/mienmongmi.mp3", cover: "pics/dnha/dnha75.jpg",
           lyrics: "lyrics/mienmongmi.json"
        },
           {title: "Yêu thì Yêu không Yêu thì Yêu", artist: "AMEE", src: "music/iuthiiu.mp3", cover: "pics/dnha35.jpg"},
      
        {title: "Vì", artist: "marzuz", src: "music/vi.mp3", cover: "pics/dnha38.jpg"},
       {title: "Giấc Mơ", artist: "Catchellers", src: "music/giacmo.mp3", cover: "pics/dnha14.jpg"},
       {title: "Trong Mắt Đều Là Anh", artist: "Tiểu Lam Bối Tâm", src: "music/trongmat.mp3", cover: "pics/dnha35.jpg"},
       { title: "Thật Quá Đáng Để Yêu", artist: "AMEE", src: "music/quadang.mp3", cover: "pics/dnha22.jpg",
          lyrics: "lyrics/quadang.json"
       },
        { title: "Day By Day", artist: "JOY", src: "day-by-day.mp3", cover: "pics/yuyu2.jpg" },
        
        {title: "Laizi", artist: "Ye Qionglin", src: "music/laizi.mp3", cover: "pics/dnha35.jpg"},
        {title: "Ocean", artist: "NMIXX", src: "music/ocean.mp3", cover: "pics/yuyu/yuyu19.jpg"},
       {title: "Ash", artist: "Le Sserafim", src: "music/ash.mp3", cover: "pics/yuyu/yuyu16.jpg"},
        {title: "R.E.M", artist: "KISSOFLIFE", src: "music/rem.mp3", cover: "pics/dnha/dnha54.jpg"},
       {title: "Và Thế Giới đã Mất đi Một Người Cô Đơn", artist: "marzuz", src: "music/vathegioi.mp3", cover: "pics/dnha/dnha59.jpg"},
          {title: "Picture of You", artist: "Sara kays", src: "music/picture.mp3", cover: "pics/dnha/dnha55.jpg"}
      

    ]
  },
  {
    name: "Tsuyoku ni naru",
    tracks: [
        { title: "做自己的月亮",  artist: "小蓝背心",  src: "tieulamboitam.mp3",  cover: "pics/dnha2.jpg" },
        { title: "Thuốc Tê", artist: "Siren", src: "thuoc-te.mp3", cover: "pics/yuyu.jpg" },
        { title: "Chasing Lightning", artist: "Le Sserafim", src: "chasing-lightning.mp3", cover: "pics/dnha8.jpg" },
         {title: "Lucid Dream", artist: "aespa", src: "music/luciddream.mp3", cover: "pics/dnha24.jpg"},
        { title: "Lovesick Girls", artist: "BlackPink", src: "lovesick-girls.mp3", cover: "pics/yuyu7.jpg" },
         {title: "Batter up", artist: "BABYMONSTER", src: "music/batterup.mp3", cover: "pics/yuki/yuki19.jpg"},
       {title: "I'll Make You Cry", artist: "aespa", src: "music/imakeyoucry.mp3", cover: "pics/yuki/yuki3.jpg"},
       {title: "DAHLIA", artist: "G(I)-DLE", src: "music/dahlia.mp3", cover: "pics/yuyu/yuyu15.jpg"},
       {title: "As If It's Your Last", artist: "BLACKPINK", src: "music/asif.mp3", cover: "pics/dnha/dnha62.jpg"},
       
    ]
  },

  // === THÊM PLAYLIST 4 VÀO ĐÂY ===
  {
    name: "Deep Deep Suy Suy",
    tracks: [
        { title: "3107-3", artist: "Umie", src: "31073.mp3", cover: "pics/dnha3.jpg"},
         { title: "Think about You", artist: "Kay Chau Anh", src: "music/think.mp3", cover: "pics/dnha10.jpg"},
        {title: "2 4", artist: "titie", src: "music/242.mp3", cover: "pics/dnha9.jpg"},
        {title: "ItteKimasu", artist: "Soala", src: "music/kimasu.mp3", cover: "pics/dnha28.jpg"},
        {title: "Bỏ Thuốc Vì Em Nhé", artist: "Kay Chau Anh", src: "music/bo-thuoc.mp3", cover: "pics/dnha13.jpg"},
         { title: "On Rainy Days", artist: "HEIZE", src: "on-rainy-days.mp3", cover: "pics/dnha7.jpg" },
          {title: "Ex's Hate Me 2", artist: "AMEE", src: "music/exhateme.mp3", cover: "pics/dnha29.jpg",
            lyrics: "lyrics/exhateme2.json"
          },
          {title: "IIWAKE", artist: "Soala", src: "music/iiwake.mp3", cover: "pics/dnha36.jpg"},
           {title: "10 Ngàn Năm", artist: "???", src: "music/muoingannam.mp3", cover: "pics/dnha3.jpg"},
         {title: "Ippodou", artist: "Soala", src: "music/ippodou.mp3", cover: "pics/dnha26.jpg"},
          {title: "Text 07", artist: "titie", src: "music/text07.mp3", cover: "pics/dnha22.jpg"},
         {title: "Hết Iu", artist: "UMIE", src: "music/hetiu.mp3", cover: "pics/dnha/dnha49.jpg"},
          {title: "Call It The end", artist: "ROSE", src: "music/callit.mp3", cover: "pics/dnha/dnha44.jpg"},
        
      
    ]
  }, // <--- Dấu phẩy kết thúc playlist 4

  // === THÊM PLAYLIST 5 VÀO ĐÂY ===
  {
    name: "Peaceful Piano",
    tracks: [
        {title: "Sorezore", artist: "......", src: "music/sorezore.mp3", cover: "pics/yuyu10.jpg"},
         {title: "MemoryB", artist: "$$$$", src: "music/memoryB.mp3", cover: "pics/yuyu7.jpg"},
          {title: "Stay IN Memories", artist: "DUGGY", src: "music/stayinmemories.mp3", cover: "pics/yuyu2.jpg"},
        {title: "A Town with an Ocean View", artist: "Ghibli", src: "music/oceantown.mp3", cover: "pics/dnha/dnha43.jpg"},
         {title: "Melody of The Night", artist: "Shi Jin", src: "music/melody.mp3", cover: "pics/dnha/dnha52.jpg"},
         {title: "Recollection", artist: "October", src: "music/recollection.mp3", cover: "pics/dnha/dnha71.jpg"}
      
    ]
  },// <--- KHÔNG cần dấu phẩy ở cuối nếu đây là phần tử cuối cùng

  {
    name: "abcxyz",
    tracks: []
  }
];

// Khởi tạo biến theo dõi Playlist hiện tại
let currentPlaylistIndex = 0; // Bắt đầu ở playlist 1 (index 0)
let tracks = allPlaylists[currentPlaylistIndex].tracks; // Gán tracks hiện tại

// DOM Elements mới cho Navigation
const prevPlaylistBtn = document.getElementById("prev-playlist-btn");
const nextPlaylistBtn = document.getElementById("next-playlist-btn");
const playlistTitleEl = document.getElementById("playlist-header-title");

// Cập nhật tên Playlist ban đầu
playlistTitleEl.textContent = allPlaylists[currentPlaylistIndex].name;


let currentIndex = 0;
let isSeeking = false;
let isShuffle = false;
let repeatMode = "off"; // off | all | one

// =================== WEB AUDIO API ===================
let audioCtx = null;
let analyser = null;
let dataArray = null;
let sourceNode = null;

function initAudioContext() {
  if (audioCtx) return;

  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 1024;

  const bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);

  sourceNode = audioCtx.createMediaElementSource(audio);
  sourceNode.connect(analyser);
  analyser.connect(audioCtx.destination);
}

// =================== CANVAS SIZE ===================
function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * window.devicePixelRatio;
  canvas.height = rect.height * window.devicePixelRatio;
  ctx.setTransform(
    window.devicePixelRatio,
    0,
    0,
    window.devicePixelRatio,
    0,
    0
  );
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// =================== PLAYLIST RENDER ===================
function renderPlaylist() {
  playlistEl.innerHTML = "";
  tracks.forEach((track, idx) => {
    const li = document.createElement("li");
    li.className = "playlist-item";
    if (idx === currentIndex) li.classList.add("active");

    // Click vào vùng li (trừ nút add) để phát nhạc
    li.innerHTML = `
      <div class="playlist-info" style="pointer-events: none;">
        <span class="playlist-title">${track.title}</span>
        <span class="playlist-artist">${track.artist}</span>
      </div>
      <button class="btn-add-queue" title="Thêm vào chờ">
        <i class="fa-solid fa-plus"></i> </button>
    `;

    // Logic click
    li.addEventListener("click", (e) => {
      // Nếu click vào nút Add Queue
      if (e.target.closest(".btn-add-queue")) {
        const btn = e.target.closest(".btn-add-queue");
        addToQueue(track, btn); // Gọi hàm thêm vào queue
        return;
      }
      
      // Nếu click vào bài hát -> Phát ngay
      currentIndex = idx;
      loadTrack(currentIndex, true);
      updatePlaylistActive();
    });

    playlistEl.appendChild(li);
  });
}

function updatePlaylistActive() {
  const items = playlistEl.querySelectorAll(".playlist-item");
  items.forEach((item, idx) => {
    item.classList.toggle("active", idx === currentIndex);
  });
}

// =================== LOAD TRACK ===================
let titleScrollX = 0;
let titleScrollDirection = 1;

function loadTrack(index, autoPlay = false) {
  currentIndex = index;
  const track = tracks[index];
  if (!track) return;

  trackInfo.classList.add("switching");
  coverInner.classList.add("switching");

  trackTitle.classList.remove("scrolling");
  trackTitle.style.transform = "translateX(0)";
  titleScrollX = 0;
  titleScrollDirection = 1;

  setTimeout(() => {
    audio.src = track.src;
    coverImg.src = track.cover;
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;

    // === LOGIC MỚI: CẬP NHẬT BỘ FONT ===
    
    // 1. Xóa các class font-set cũ
    lyricsContainer.classList.remove("font-set-vi", "font-set-kr", "font-set-jp", "font-set-en");
    
    // 2. Lấy fontSet từ dữ liệu bài hát (mặc định là "vi" nếu không có)
    const currentFontSet = track.fontSet || "vi";
    
    // 3. Thêm class font-set tương ứng vào container
    lyricsContainer.classList.add(`font-set-${currentFontSet}`);

    fetchLyrics(track.lyrics);

    trackInfo.classList.remove("switching");
    coverInner.classList.remove("switching");

    if (autoPlay) {
      initAudioContext();
      if (audioCtx.state === "suspended") audioCtx.resume();
      audio.play();
      setPlayingUI(true);
    } else {
      setPlayingUI(false);
    }
  }, 220);

  updatePlaylistActive();
}

// =================== UI PLAYING STATE ===================
let isDiscPlaying = false;

function setPlayingUI(isPlaying) {
  if (isPlaying) {
    playerRoot.classList.add("playing");
    playBtn.innerHTML = "&#10074;&#10074;";
    isDiscPlaying = true;
    trackTitle.classList.add("scrolling");
  } else {
    playerRoot.classList.remove("playing");
    playBtn.innerHTML = "&#9654;";
    isDiscPlaying = false;
    trackTitle.classList.remove("scrolling");
    trackTitle.style.transform = "translateX(0)";
  }
}

// Khởi tạo
loadTrack(currentIndex, false);
renderPlaylist();

// =================== PLAY / PAUSE ===================
playBtn.addEventListener("click", () => {
  pulseElement(playBtn);

  if (audio.paused) {
    initAudioContext();
    if (audioCtx.state === "suspended") audioCtx.resume();
    audio.play();
    setPlayingUI(true);
  } else {
    audio.pause();
    setPlayingUI(false);
  }
});

audio.addEventListener("pause", () => {
  setPlayingUI(false);
});

audio.addEventListener("play", () => {
  setPlayingUI(true);
});

audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

// =================== SHUFFLE / REPEAT ===================
shuffleBtn.addEventListener("click", () => {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle("active", isShuffle);
});

repeatBtn.addEventListener("click", () => {
  if (repeatMode === "off") repeatMode = "all";
  else if (repeatMode === "all") repeatMode = "one";
  else repeatMode = "off";

  updateRepeatIcon();
});

function updateRepeatIcon() {
  repeatBtn.classList.remove("active");
  if (repeatMode === "off") {
    repeatIcon.src = "gooey-balls.svg";
  } else if (repeatMode === "all") {
    repeatIcon.src = "wind-toy.svg";
    repeatBtn.classList.add("active");
  } else if (repeatMode === "one") {
    repeatIcon.src = "12-dots.svg";
    repeatBtn.classList.add("active");
  }
}
updateRepeatIcon();

function getRandomIndex() {
  if (tracks.length <= 1) return currentIndex;
  let idx;
  do {
    idx = Math.floor(Math.random() * tracks.length);
  } while (idx === currentIndex);
  return idx;
}

function getNextIndexButton() {
  if (isShuffle) return getRandomIndex();
  return (currentIndex + 1) % tracks.length;
}

function getPrevIndexButton() {
  if (isShuffle) return getRandomIndex();
  return (currentIndex - 1 + tracks.length) % tracks.length;
}

// =================== PREV / NEXT ===================
prevBtn.addEventListener("click", () => {
  pulseElement(prevBtn);
  const idx = getPrevIndexButton();
  loadTrack(idx, true);
});


// nextBtn.addEventListener("click", () => {
//   pulseElement(nextBtn);
//   // Ưu tiên Queue
//   if (queue.length > 0) {
//       playNextSong(); 
//   } else {
//       const idx = getNextIndexButton();
//       loadTrack(idx, true);
//   }
// });
// // Khi hết bài
// audio.addEventListener("ended", () => {
//   if (repeatMode === "one") {
//     audio.currentTime = 0;
//     audio.play();
//     return;
//   }

//   // Ưu tiên Queue trước khi Shuffle hay Playlist
//   if (queue.length > 0) {
//       playNextSong();
//       return;
//   }

//   // Nếu không có queue thì chạy logic cũ
//   if (isShuffle) {
//     const idx = getRandomIndex();
//     loadTrack(idx, true);
//     return;
//   }

//   const nextIndex = currentIndex + 1;
//   if (nextIndex < tracks.length) {
//     loadTrack(nextIndex, true);
//   } else {
//      if (repeatMode === "all") {
//        loadTrack(0, true);
//      } else {
//        setPlayingUI(false);
//        audio.pause();
//        audio.currentTime = 0;
//      }
//   }
// });

// =================== -10s / +10s ===================
back10Btn.addEventListener("click", () => {
  pulseElement(back10Btn);
  if (!audio.duration) return;
  audio.currentTime = Math.max(0, audio.currentTime - 5);
});

forward10Btn.addEventListener("click", () => {
  pulseElement(forward10Btn);
  if (!audio.duration) return;
  audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
});

// =================== TIME + SEEK ===================
audio.addEventListener("timeupdate", () => {
  if (!isSeeking) {
    const progress = (audio.currentTime / audio.duration) * 100 || 0;
    seek.value = progress;
    updateSeekGradient();
  }
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

seek.addEventListener("input", () => {
  isSeeking = true;
  updateSeekGradient();
});

seek.addEventListener("change", () => {
  const pct = seek.value / 100;
  if (audio.duration) {
    audio.currentTime = audio.duration * pct;
  }
  isSeeking = false;
});

function formatTime(sec) {
  if (!sec || isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function updateSeekGradient() {
  const value = seek.value;
  const playedColor = "#ff9ecd";
  const remainColor = "#ffe0f0";
  seek.style.background = `linear-gradient(90deg, ${playedColor} ${value}%, ${remainColor} ${value}%)`;
}
updateSeekGradient();

// =================== VOLUME SLIDER ===================
audio.volume = volumeSlider.value / 100;

volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value / 100;
  updateVolumeGradient();
});

function updateVolumeGradient() {
  const value = volumeSlider.value;
  const played = "#b4f3cf";
  const remain = "#e4fff3";
  volumeSlider.style.background = `linear-gradient(90deg, ${played} ${value}%, ${remain} ${value}%)`;
}
updateVolumeGradient();

// =================== CLICK PULSE ===================
function pulseElement(el) {
  el.style.transform = "translateY(1px) scale(0.92)";
  el.style.filter = "brightness(1.08)";
  setTimeout(() => {
    el.style.transform = "";
    el.style.filter = "";
  }, 150);
}

// =================== GLOBAL BUBBLE ===================
function createGlobalBubble(e) {
  const bubble = document.createElement("span");
  bubble.className = "click-bubble";
  bubble.style.left = `${e.clientX}px`;
  bubble.style.top = `${e.clientY}px`;
  document.body.appendChild(bubble);
  setTimeout(() => bubble.remove(), 900);
}

document.addEventListener("click", (e) => {
  if (e.button !== 0) return;
  createGlobalBubble(e);
});

// =================== ĐĨA XOAY + TITLE SCROLL ===================
// =================== ĐĨA XOAY + TITLE SCROLL ===================
let discAngle = 0;
let lastTime = null;
const scrollSpeedPxPerSec = 40;

function discLoop(timestamp) {
  if (!lastTime) lastTime = timestamp;
  const delta = timestamp - lastTime;
  lastTime = timestamp;

  if (isDiscPlaying) {
    // quay đĩa
    const speed = 360 / 9000;
    discAngle += speed * delta;
    coverImg.style.transform = `rotate(${discAngle}deg)`;

    // scroll title ping-pong
    if (titleWrap) {
      const titleWidth = trackTitle.offsetWidth;
      const wrapWidth = titleWrap.offsetWidth;

      // khoảng chạy tối đa
      let maxScroll = titleWidth - wrapWidth;

      // ÉP KHOẢNG CHẠY TỐI THIỂU để luôn có hiệu ứng
      const MIN_SCROLL = 20;
      if (maxScroll < MIN_SCROLL) {
        maxScroll = MIN_SCROLL;
      }

      const distance = scrollSpeedPxPerSec * (delta / 1000);
      titleScrollX += distance * titleScrollDirection;

      // ping-pong hai đầu
      if (titleScrollX > maxScroll) {
        titleScrollX = maxScroll;
        titleScrollDirection = -1;
      } else if (titleScrollX < 0) {
        titleScrollX = 0;
        titleScrollDirection = 1;
      }

      trackTitle.style.transform = `translateX(-${titleScrollX}px)`;
    }
  }

  // nếu cần dùng audioCtx thêm thì xử lý ở đây
  requestAnimationFrame(discLoop);
}
requestAnimationFrame(discLoop);



// =================== LIQUID WAVEFORM ===================
let t = 0;

function drawLiquidWave() {
  const w = canvas.width / window.devicePixelRatio;
  const h = canvas.height / window.devicePixelRatio;
  ctx.clearRect(0, 0, w, h);

  ctx.fillStyle = "rgba(255, 255, 255, 0.16)";
  ctx.fillRect(0, 0, w, h);

  const cy = h / 2;
  const grad = ctx.createLinearGradient(0, 0, w, h);
  const shift = (Math.sin(t * 0.01) + 1) / 2;
  grad.addColorStop(0, `rgba(255, 160, 210, ${0.6 + 0.3 * shift})`);
  grad.addColorStop(0.5, `rgba(255, 191, 168, ${0.6 + 0.3 * (1 - shift)})`);
  grad.addColorStop(1, "rgba(255, 222, 210, 0.95)");

  ctx.lineWidth = 2.6;
  ctx.strokeStyle = grad;

  let ampFactor = 0.3;
  if (analyser && !audio.paused && !audio.ended) {
    analyser.getByteFrequencyData(dataArray);
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
    const avg = sum / dataArray.length;
    ampFactor = 0.25 + (avg / 255) * 0.9;
  }

  const baseAmp = (h / 3) * ampFactor;
  const segments = 150;

  ctx.beginPath();
  for (let i = 0; i <= segments; i++) {
    const x = (w / segments) * i;
    const progress = i / segments;
    const offset = t * 0.045;

    const sin1 = Math.sin(progress * 6 * Math.PI + offset);
    const sin2 = Math.sin(progress * 13 * Math.PI - offset * 1.4);
    const sin3 = Math.sin(progress * 3 * Math.PI + offset * 0.5);
    const envelope = Math.sin(progress * Math.PI);

    const y =
      cy +
      (sin1 * 0.55 + sin2 * 0.3 + sin3 * 0.15) * baseAmp * envelope;

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  ctx.beginPath();
  for (let i = 0; i <= segments; i++) {
    const x = (w / segments) * i;
    const progress = i / segments;
    const offset = t * 0.03;

    const sinB = Math.sin(progress * 4 * Math.PI + offset * 0.9);
    const envelope = Math.sin(progress * Math.PI);

    const y =
      cy +
      baseAmp * 0.4 * envelope +
      sinB * (baseAmp * 0.2) * envelope;

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.closePath();

  const fillGrad = ctx.createLinearGradient(0, cy, 0, h);
  fillGrad.addColorStop(0, "rgba(255, 176, 204, 0.6)");
  fillGrad.addColorStop(1, "rgba(255, 222, 210, 0)");
  ctx.fillStyle = fillGrad;
  ctx.fill();

  t += 1;
  requestAnimationFrame(drawLiquidWave);
}

// ========== MEMORIES SCROLL ==========

function initMemoriesObserver() {
  const cards = document.querySelectorAll(".memory-card");
  if (!cards.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        } else {
          entry.target.classList.remove("in-view");
        }
      });
    },
    { threshold: 0.25 }
  );

  cards.forEach((card) => observer.observe(card));
}

function setupMemoryStagger() {
  const cards = document.querySelectorAll(".memory-card");
  if (!cards.length) return;

  cards.forEach((card, index) => {
    const delay = index * 0.08;
    card.style.setProperty("--stagger", `${delay}s`);
  });
}
setupMemoryStagger();
initMemoriesObserver();

// =================== PLAYBACK RATE SLIDER (ĐÃ ĐÓNG NGOẶC ĐÚNG) ===================

function updateRateGradient(value) {
  const minVal = 75;
  const maxVal = 125;
  const percent = ((value - minVal) / (maxVal - minVal)) * 100;

  const colorSlow = "#f4c8f0";
  const colorFast = "#f4c8f0";

  if (value <= 100) {
    // chậm hơn 1.0x
    rateSlider.style.background = `linear-gradient(90deg, ${colorSlow} 0%, ${colorSlow} ${percent}%, #daefff ${percent}%)`;
  } else {
    // nhanh hơn 1.0x
    rateSlider.style.background = `linear-gradient(90deg, #e4fff3 0%, #daefff ${percent}%, ${colorFast} ${percent}%, ${colorFast} 100%)`;
  }
}

function initRate() {
  const initialValue = 100;
  audio.playbackRate = initialValue / 100;
  rateSlider.value = initialValue;
  currentRateEl.textContent = `${(initialValue / 100).toFixed(2)}x`;
  updateRateGradient(initialValue);
}

rateSlider.addEventListener("input", () => {
  const value = Number(rateSlider.value);
  const rate = value / 100;

  audio.playbackRate = rate;
  currentRateEl.textContent = `${rate.toFixed(2)}x`;
  updateRateGradient(value);

  if (!audio.paused && audioCtx && audioCtx.state === "running") {
    // không bắt buộc làm gì thêm ở đây
  }
});

initRate();

// Gọi waveform loop
drawLiquidWave();


// =================== LOGIC CHO WELCOME POP-UP (ĐÃ CẬP NHẬT) ===================
const welcomeModal = document.getElementById("welcome-modal");
const closeWelcomeModalBtn = document.getElementById("close-welcome-modal");
const linkWelcomeModalBtn = document.getElementById("link-welcome-modal"); // Nút "Đéo"

function showWelcomeModal() {
  // Chỉ hiện modal nếu người dùng chưa từng đóng nó (sử dụng localStorage)
  //const isModalClosed = localStorage.getItem('welcomeModalClosed');
  //if (!isModalClosed) {
   welcomeModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Ngăn cuộn trang nền
  //}
}

function closeWelcomeModal() {
  welcomeModal.classList.remove('active');
  document.body.style.overflow = ''; // Cho phép cuộn trang lại
  // Lưu trạng thái đã đóng vào localStorage để không hiện lại
  //localStorage.setItem('welcomeModalClosed', 'true');
}

function handleLinkRedirect() {
    // Chuyển hướng đến liên kết Instagram
    window.location.href = 'https://www.instagram.com/_dnha.qwpi_/';
    // Không cần đóng modal hoặc lưu localStorage vì người dùng đã chuyển trang
}

// Gắn sự kiện cho nút "Uki"
closeWelcomeModalBtn?.addEventListener('click', closeWelcomeModal);

// Gắn sự kiện cho nút "Đéo"
linkWelcomeModalBtn?.addEventListener('click', handleLinkRedirect);

// Hiển thị modal khi trang tải xong
document.addEventListener('DOMContentLoaded', showWelcomeModal);

// Tùy chọn: Thêm chức năng đóng khi click ra ngoài modal
welcomeModal?.addEventListener('click', (e) => {
    if (e.target === welcomeModal) {
        closeWelcomeModal();
    }
});

// =================== LOGIC CHUYỂN ĐỔI PLAYLIST ===================

function switchPlaylist(direction) {
  // 1. Thêm class để tạo hiệu ứng biến mất (Fade Out)
  playlistEl.classList.add("switching");
  playlistTitleEl.classList.add("switching");

  // 2. Đợi 300ms (bằng thời gian animation CSS) rồi mới đổi dữ liệu
  setTimeout(() => {
    // Tính toán index playlist mới
    if (direction === "next") {
      currentPlaylistIndex++;
      if (currentPlaylistIndex >= allPlaylists.length) currentPlaylistIndex = 0;
    } else {
      currentPlaylistIndex--;
      if (currentPlaylistIndex < 0) currentPlaylistIndex = allPlaylists.length - 1;
    }

    // Cập nhật dữ liệu
    const newPlaylistObj = allPlaylists[currentPlaylistIndex];
    tracks = newPlaylistObj.tracks; // Cập nhật biến tracks toàn cục
    playlistTitleEl.textContent = newPlaylistObj.name; // Đổi tên playlist

    // Reset lại currentIndex về 0 để tránh lỗi nếu playlist mới ít bài hơn
    // (Lưu ý: Nhạc đang phát sẽ không dừng, nhưng playlist hiển thị sẽ đổi)
    // Nếu muốn đổi playlist là dừng nhạc cũ -> uncomment dòng dưới:
    // currentIndex = 0; loadTrack(currentIndex, false);

    // Render lại danh sách
    renderPlaylist();
    updatePlaylistActive(); // Highlight bài đang hát (nếu có trong list mới)

    // 3. Gỡ class để hiện lại (Fade In)
    playlistEl.classList.remove("switching");
    playlistTitleEl.classList.remove("switching");
    
  }, 300);
}

// Gắn sự kiện click cho 2 nút mũi tên mới
prevPlaylistBtn.addEventListener("click", () => {
  pulseElement(prevPlaylistBtn); // Hiệu ứng nhún nút
  switchPlaylist("prev");
});

nextPlaylistBtn.addEventListener("click", () => {
  pulseElement(nextPlaylistBtn); // Hiệu ứng nhún nút
  switchPlaylist("next");
});

  const backToTopBtn = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // =================== LYRICS LOGIC ===================

const lyricsContainer = document.getElementById('lyrics-content');
let currentLyrics = []; // Mảng chứa lời bài hát hiện tại

// Biến cờ: TRUE nếu người dùng đang cuộn thủ công, FALSE nếu đang tự động cuộn
let isUserScrolling = false; // <--- THÊM DÒNG NÀY

// Logic: Ngăn chặn auto-scroll khi người dùng đang cuộn
let scrollTimeout;

lyricsContainer.addEventListener('wheel', () => {
    isUserScrolling = true;
    clearTimeout(scrollTimeout);
    
    // Sau 1 giây không cuộn, bật lại auto-scroll
    scrollTimeout = setTimeout(() => {
        isUserScrolling = false;
    }, 1000); 
});

// Thêm cả sự kiện touchstart cho thiết bị di động
lyricsContainer.addEventListener('touchstart', () => {
    isUserScrolling = true;
    clearTimeout(scrollTimeout);
    
    scrollTimeout = setTimeout(() => {
        isUserScrolling = false;
    }, 1000); 
}, { passive: true });

// 1. Hàm tải lời bài hát từ file JSON
async function fetchLyrics(url) {
  // Reset giao diện trước khi tải
  lyricsContainer.innerHTML = '<p class="lyric-line">Đang tải lời...</p>';
  currentLyrics = [];

  if (!url) {
    lyricsContainer.innerHTML = '<p class="lyric-line">Chưa có lời bài hát này.</p>';
    return;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Lỗi tải file");
    const data = await response.json();
    currentLyrics = data;
    renderLyrics(data);
  } catch (error) {
    console.error(error);
    lyricsContainer.innerHTML = '<p class="lyric-line">Không thể tải lời bài hát.</p>';
  }
}

// 2. Hàm hiển thị lời lên màn hình (PHIÊN BẢN MỚI)
function renderLyrics(data) {
  lyricsContainer.innerHTML = ""; // Xóa nội dung cũ
  currentLyrics = data; 

  // Tạo khoảng trống đầu
  const spacerTop = document.createElement("div");
  spacerTop.style.height = "100px";
  lyricsContainer.appendChild(spacerTop);

  data.forEach((line, i) => { 
    const p = document.createElement("p");
    p.className = "lyric-line"; // Chỉ cần class gốc này là đủ
    p.textContent = line.text;
    p.dataset.time = line.time;
    p.dataset.index = i;
    
    // Sự kiện Click để tua nhạc
    p.addEventListener("click", () => {
      audio.currentTime = line.time;
      audio.play();
      setPlayingUI(true);
    });

    lyricsContainer.appendChild(p);
  }); 

  // Tạo khoảng trống cuối
  const spacerBottom = document.createElement("div");
  spacerBottom.style.height = "150px";
  lyricsContainer.appendChild(spacerBottom);
}

  
  

// 3. Hàm đồng bộ lời bài hát (Highlight & Scroll)
function syncLyrics() {
  if (!currentLyrics.length) return;

  const currentTime = audio.currentTime;
  
  // Tìm dòng lời hát hiện tại (Dòng có thời gian bắt đầu <= thời gian hiện tại)
  // Ta tìm dòng có thời gian lớn hơn currentTime, sau đó lùi lại 1 index
  let activeIndex = currentLyrics.findIndex(line => line.time > currentTime) - 1;

  // Xử lý trường hợp đang hát dòng cuối cùng (findIndex trả về -1)
  if (activeIndex === -2) { // Không tìm thấy dòng nào > currentTime => đang ở cuối bài
     activeIndex = currentLyrics.length - 1;
  }
  // Xử lý trường hợp chưa hát đến dòng đầu tiên
  if (activeIndex < 0) activeIndex = 0; 

  // Cập nhật UI
  const allLines = document.querySelectorAll(".lyric-line");
  
  // Xóa class active cũ
  const currentActive = document.querySelector(".lyric-line.active");
  if (currentActive) currentActive.classList.remove("active");

  
// Thêm class active mới
if (allLines[activeIndex]) {
    const activeLine = allLines[activeIndex];
    activeLine.classList.remove("prev-active"); // (Nếu bạn có dùng)
    activeLine.classList.add("active");

    // === PHẦN SỬA LỖI CUỘN TRANG (Thay thế scrollIntoView) ===
    
    // 1. Kiểm tra trạng thái người dùng
    if (isUserScrolling) {
        // Nếu người dùng đang cuộn thủ công, KHÔNG làm gì cả
        return; 
    }

    // 2. Tính toán vị trí cuộn mới cho KHUNG LYRICS (lyricsContainer)
    
    // Chiều cao của khung chứa lyrics
    const containerHeight = lyricsContainer.clientHeight; 
    // Vị trí của dòng đang hát (so với khung lyrics)
    const lineOffsetTop = activeLine.offsetTop; 
    // Chiều cao của dòng đang hát
    const lineHeight = activeLine.offsetHeight; 

    // Tính toán vị trí cuộn lý tưởng (căn giữa dòng đang hát)
    // Vị trí mới = (Vị trí dòng) - (Nửa chiều cao khung) + (Nửa chiều cao dòng)
    const newScrollTop = lineOffsetTop - (containerHeight / 2) + (lineHeight / 2);

    // 3. Thực hiện cuộn mượt cho KHUNG LYRICS
    lyricsContainer.scrollTo({
        top: newScrollTop,
        behavior: 'smooth' // Cuộn mượt chỉ trong khung lyrics
    });
    // =======================================================
}
}
// 4. Gắn sự kiện vào Audio
// Thêm syncLyrics vào sự kiện timeupdate đã có hoặc tạo mới
audio.addEventListener("timeupdate", syncLyrics);

// =================== QUEUE LOGIC & ANIMATION ===================

// 1. Chuyển Tab (Lyrics <-> Queue)
tabLyricsBtn.addEventListener("click", () => switchTab("lyrics"));
tabQueueBtn.addEventListener("click", () => switchTab("queue"));

function switchTab(tabName) {
  if (tabName === "lyrics") {
    tabLyricsBtn.classList.add("active");
    tabQueueBtn.classList.remove("active");
    contentLyrics.classList.add("active");
    contentQueue.classList.remove("active");
  } else {
    tabQueueBtn.classList.add("active");
    tabLyricsBtn.classList.remove("active");
    contentQueue.classList.add("active");
    contentLyrics.classList.remove("active");
  }
}

// 2. Thêm vào Queue (Kèm hiệu ứng bay)
function addToQueue(track, startElem) {
  // Logic: Thêm vào mảng
  queue.push(track);
  renderQueue();
  
  // Animation: Bay từ nút bấm -> Tab Queue
  if (startElem) {
    const startRect = startElem.getBoundingClientRect();
    const endRect = tabQueueBtn.getBoundingClientRect();
    
    const flyingDot = document.createElement("div");
    flyingDot.className = "flying-dot";
    
    // Vị trí bắt đầu
    flyingDot.style.left = `${startRect.left + 10}px`;
    flyingDot.style.top = `${startRect.top + 10}px`;
    
    document.body.appendChild(flyingDot);
    
    // Tính toán bay
    const deltaX = endRect.left - startRect.left + endRect.width / 2;
    const deltaY = endRect.top - startRect.top + endRect.height / 2;
    
    flyingDot.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${deltaX}px, ${deltaY}px) scale(0.5)`, opacity: 0 }
    ], {
      duration: 2000,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)', // Đổi easing cho mềm mại hơn
      fill: 'forwards'
    });
    
    setTimeout(() => flyingDot.remove(), 2100);
    
    // Rung nhẹ nút tab Queue để báo hiệu
    setTimeout(() => {
        tabQueueBtn.style.transform = "scale(1.2)";
        setTimeout(() => tabQueueBtn.style.transform = "", 200);
    }, 600);
  }
}

// 3. Render danh sách Queue
function renderQueue() {
  queueListEl.innerHTML = "";
  queueCountEl.textContent = `(${queue.length})`;
  
  if (queue.length === 0) {
    queueEmptyMsg.style.display = "block";
  } else {
    queueEmptyMsg.style.display = "none";
    
    queue.forEach((track, index) => {
      const li = document.createElement("li");
      li.className = "queue-item";
      li.innerHTML = `
        <div class="q-info">
          <span class="q-title">${track.title}</span>
          <span class="q-artist">${track.artist}</span>
        </div>
        <button class="q-remove" onclick="removeFromQueue(${index})">
          <i class="fa-solid fa-trash"></i>
        </button>
      `;
      queueListEl.appendChild(li);
    });
  }
}

// 4. Xóa khỏi Queue
window.removeFromQueue = function(index) {
  queue.splice(index, 1);
  renderQueue();
}

// 5. Override (Ghi đè) Logic nút Next và Ended
// Quan trọng: Sửa lại logic Next để ưu tiên Queue

const originalGetNextIndex = getNextIndexButton; // Lưu hàm cũ nếu cần

function playNextSong() {
  // Ưu tiên 1: Có bài trong queue
  if (queue.length > 0) {
    const nextTrack = queue.shift(); // Lấy bài đầu tiên ra
    renderQueue();
    loadTrackDirectly(nextTrack); // Hàm tự viết để load trực tiếp
  } else {
    // Ưu tiên 2: Không có queue -> Next bình thường
    const idx = (currentIndex + 1) % tracks.length;
    loadTrack(idx, true);
  }
}

// Hàm load bài hát trực tiếp (Không qua index playlist)
function loadTrackDirectly(track) {
  // Hiệu ứng chuyển
  trackInfo.classList.add("switching");
  coverInner.classList.add("switching");
  
  setTimeout(() => {
    audio.src = track.src;
    coverImg.src = track.cover;
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    
    // Font Lyrics logic
    const currentFontSet = track.fontSet || "vi";
    lyricsContainer.className = "lyrics-content"; // Reset class
    lyricsContainer.classList.add(`font-set-${currentFontSet}`);
    
    fetchLyrics(track.lyrics);

    trackInfo.classList.remove("switching");
    coverInner.classList.remove("switching");
    
    // Play
    initAudioContext();
    if (audioCtx.state === "suspended") audioCtx.resume();
    audio.play();
    setPlayingUI(true);
    
    // QUAN TRỌNG: Khi hát nhạc Queue, bỏ Active ở Playlist chính đi
    const items = playlistEl.querySelectorAll(".playlist-item");
    items.forEach(item => item.classList.remove("active"));
    
  }, 220);
}

// 6. Gán lại sự kiện cho nút Next và Audio Ended
// Lưu ý: Cần remove event listener cũ hoặc sửa trực tiếp ở code trên. 
// Cách an toàn nhất là bạn tìm đoạn code xử lý nextBtn và audio.ended ở trên và sửa lại như sau:

// --- TÌM ĐOẠN NÀY Ở TRÊN FILE VÀ SỬA ---

nextBtn.addEventListener("click", () => {
  pulseElement(nextBtn);
  playNextSong(); // <--- Đổi thành hàm mới
});

audio.addEventListener("ended", () => {
   if (repeatMode === "one") {
    loadTrack(currentIndex, true);
    return;
  }
  // Queue logic nằm trong playNextSong
  playNextSong(); 
});

// =================== LOGIC UPLOAD CÁ NHÂN (V2 - CÓ LƯU LIST) ===================
const customAudioInput = document.getElementById('custom-audio');
const customCoverInput = document.getElementById('custom-cover');
const uploadStatus = document.getElementById('upload-status');

// Biến lưu tạm ảnh cover (nếu người dùng chọn ảnh trước)
let tempCoverUrl = "pics/dnha1.jpg"; // Ảnh mặc định nếu chưa chọn

if (customAudioInput && customCoverInput) {

  // 1. Xử lý khi chọn NHẠC
  customAudioInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      const fileName = file.name.replace(/\.[^/.]+$/, ""); // Lấy tên file
      
      // --- TÌM PLAYLIST ĐỂ LƯU ---
      // Tìm playlist có tên "Playlist Của Tui ☁️" hoặc lấy playlist cuối cùng
      let targetIndex = allPlaylists.findIndex(p => p.name === "abcxyz");
      if (targetIndex === -1) targetIndex = allPlaylists.length - 1; // Fallback

      // Tạo đối tượng bài hát mới
      const newTrack = {
        title: fileName,
        artist: "watashi",
        src: fileUrl,
        cover: tempCoverUrl, // Dùng ảnh cover đang chọn
        fontSet: "vi"
      };

      // Đẩy bài hát vào danh sách
      allPlaylists[targetIndex].tracks.push(newTrack);

      // --- CẬP NHẬT GIAO DIỆN ---
      // 1. Chuyển playlist hiện tại sang playlist upload
      currentPlaylistIndex = targetIndex; 
      
      // 2. Cập nhật tên Playlist trên Header (nếu có)
      const headerTitle = document.getElementById('playlist-header-title');
      if(headerTitle) headerTitle.textContent = allPlaylists[currentPlaylistIndex].name;

      // 3. Gọi hàm render lại danh sách (để hiện bài mới)
      // Hàm này thường tên là loadPlaylist hoặc renderPlaylist trong code gốc của bạn
      if (typeof loadPlaylist === "function") {
        loadPlaylist(currentPlaylistIndex);
      } else {
         // Nếu không tìm thấy hàm, tự reload trang (hoặc báo lỗi nhẹ)
         console.log("Đã thêm vào list, vui lòng bấm Next Playlist để refresh");
      }

      // 4. Phát bài hát vừa thêm (là bài cuối cùng trong mảng)
      const newTrackIndex = allPlaylists[targetIndex].tracks.length - 1;
      
      // Gọi hàm loadTrack và playTrack (có sẵn trong player của bạn)
      if (typeof loadTrack === "function") loadTrack(newTrackIndex);
      if (typeof playTrack === "function") playTrack();
      else audio.play(); // Fallback

      // Thông báo
      uploadStatus.textContent = `Đã thêm "${fileName}" vào Playlist! 🎵`;
    }
  });

  // 2. Xử lý khi chọn ẢNH COVER
  customCoverInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      tempCoverUrl = URL.createObjectURL(file);
      
      // Cập nhật ngay ảnh trên đĩa xoay cho đẹp
      if(coverImg) coverImg.src = tempCoverUrl;
      
      // Nếu bài hát đang phát là bài upload, cập nhật luôn ảnh cho nó
      // (Logic này tùy chọn, giúp đồng bộ ngay lập tức)
      uploadStatus.textContent = "Đã lưu ảnh cover cho bài hát tiếp theo! ✨";
    }
  });
}