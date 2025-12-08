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

// =================== PLAYLIST ===================
const tracks = [
  { title: "Thuốc Tê", artist: "Siren", src: "thuoc-te.mp3", cover: "pics/yuyu.jpg" },
  { title: "Day By Day", artist: "JOY", src: "day-by-day.mp3", cover: "pics/yuyu2.jpg" },
  { title: "Vườn Sao Băng", artist: "puppy", src: "vuonsaobang.mp3", cover: "pics/yuyu3.jpg" },
  { title: "The Way I Still Love You", artist: "Hattie", src: "The-Way.mp3", cover: "pics/yuyu4.jpg" },
  { title: "Nếu Lúc Đó", artist: "tlinh", src: "neulucdo.mp3", cover: "pics/yuyu5.jpg" },
  { title: "In The Rain", artist: "XG", src: "in-the-rain.mp3", cover: "pics/yuyu6.jpg" },
  { title: "Lovesick Girls", artist: "BlackPink", src: "lovesick-girls.mp3", cover: "pics/yuyu7.jpg" },
  { title: "Love My Friend", artist: "Shayda", src: "lovemyfriend.mp3", cover: "pics/yuyu8.jpg" },

  // 8 bài mới – ĐỔI LẠI THEO FILE CỦA BẠN
  { title: "做自己的月亮",  artist: "小蓝背心",  src: "tieulamboitam.mp3",  cover: "pics/dnha2.jpg" },
  { title: "3107-3", artist: "Umie", src: "31073.mp3", cover: "pics/dnha3.jpg"},
  { title: "Anh Iu", artist: "Saabirose", src: "anh-iu.mp3", cover: "pics/dnha4.jpg" },
  { title: "Lucid Dream", artist: "Aespa", src: "lucid-dream.mp3", cover: "pics/dnha6.jpg" },
  { title: "On Rainy Days", artist: "HEIZE", src: "on-rainy-days.mp3", cover: "pics/dnha7.jpg" },
  { title: "Chasing Lightning", artist: "Le Sserafim", src: "chasing-lightning.mp3", cover: "pics/dnha8.jpg" },
  { title: "Wrong Times", artist: "puppy", src: "wrongtimes.mp3", cover: "pics/dnha16.jpg" },
  { title: "Call Me On My Phone 2", artist: "puppy", src: "callme2.mp3", cover: "pics/dnha20.jpg" },

  { title: "Stairrway To Heaven", artist: "puppy", src: "music/stairwaytoheaven.mp3", cover: "pics/dnha17.jpg"},
  {title: "Làm lành chữa tình", artist: "tlinh", src: "music/lamlanh.mp3", cover: "pics/dnha18.jpg"},
  {title: "Bỏ Thuốc Vì Em Nhé", artist: "Kay Chau Anh", src: "music/bo-thuoc.mp3", cover: "pics/dnha13.jpg"},
  {title: "Giấc Mơ", artist: "Catchellers", src: "music/giacmo.mp3", cover: "pics/dnha14.jpg"},
      
   {title: "Miền Mộng Mị", artist: "AMEE", src: "music/mienmongmi.mp3", cover: "pics/yuyu10.jpg"},
   {title: "Hai Mươi Hai", artist: "AMEE", src: "music/haihai.mp3", cover: "pics/yuyu11.jpg"},
     {title: "Trời Giấu Trời Mang Đi", artist: "AMEE", src: "music/troigiautroimangdi.mp3", cover: "pics/yuyu9.jpg"},
     { title: "Thật Quá Đáng Để Yêu", artist: "AMEE", src: "music/quadang.mp3", cover: "pics/dnha22.jpg"},
 {title: "Ngẩn Nger", artist: "puppy", src: "music/ngannger.mp3", cover: "pics/dnha1.jpg"},
]
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

    li.innerHTML = `
      <span class="playlist-title">${track.title}</span>
      <span class="playlist-artist">${track.artist}</span>
    `;

    li.addEventListener("click", () => {
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

nextBtn.addEventListener("click", () => {
  pulseElement(nextBtn);
  const idx = getNextIndexButton();
  loadTrack(idx, true);
});

// Khi hết bài
audio.addEventListener("ended", () => {
  if (repeatMode === "one") {
    loadTrack(currentIndex, true);
    return;
  }

  if (isShuffle) {
    const idx = getRandomIndex();
    loadTrack(idx, true);
    return;
  }

  const nextIndex = currentIndex + 1;

  if (nextIndex < tracks.length) {
    loadTrack(nextIndex, true);
  } else {
    if (repeatMode === "all") {
      loadTrack(0, true);
    } else {
      setPlayingUI(false);
      audio.pause();
      audio.currentTime = 0;
    }
  }
});

// =================== -10s / +10s ===================
back10Btn.addEventListener("click", () => {
  pulseElement(back10Btn);
  if (!audio.duration) return;
  audio.currentTime = Math.max(0, audio.currentTime - 10);
});

forward10Btn.addEventListener("click", () => {
  pulseElement(forward10Btn);
  if (!audio.duration) return;
  audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
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



