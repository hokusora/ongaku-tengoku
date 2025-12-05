
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

const coverImg = document.getElementById("cover");
const trackTitle = document.getElementById("track-title");
const trackArtist = document.getElementById("track-artist");
const playerRoot = document.querySelector(".player");
const trackInfo = document.querySelector(".track-info");
const coverInner = document.querySelector(".cover-inner");
const playlistEl = document.getElementById("playlist");

const canvas = document.getElementById("waveform");
const ctx = canvas.getContext("2d");

// =================== PLAYLIST (8 bài) ===================
const tracks = [
  {
    title: "Thuốc Tê",
    artist: "Siren",
    src: "thuoc-te.mp3",
    cover: "yuyu.jpg",
  },
  {
    title: "Day By Day",
    artist: "JOY",
    src: "day-by-day.mp3",
    cover: "yuyu2.jpg",
  },
  {
    title: "Wang Liao",
    artist: "YuYu",
    src: "wang-liao.mp3",
    cover: "yuyu3.jpg",
  },
  {
    title: "The Way I Still Love You",
    artist: "Hattie",
    src: "The-Way.mp3",
    cover: "yuyu4.jpg",
  },
  {
    title: "TaBun",
    artist: "YOASOBI",
    src: "tabun.mp3",
    cover: "yuyu5.jpg",
  },
  {
    title: "In The Rain",
    artist: "XG",
    src: "in-the-rain.mp3",
    cover: "yuyu6.jpg",
  },
  {
    title: "Lovesick Girls",
    artist: "BlackPink",
    src: "lovesick-girls.mp3",
    cover: "yuyu7.jpg",
  },
  {
    title: "Love My Friend",
    artist: "Shayda",
    src: "lovemyfriend.mp3",
    cover: "yuyu8.jpg",
  },
];

let currentIndex = 0;
let isSeeking = false;
let isShuffle = false;
let repeatMode = "off"; // off | all | one

// =================== WEB AUDIO API (ANALYSER) ===================
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
function loadTrack(index, autoPlay = false) {
  currentIndex = index;
  const track = tracks[index];
  if (!track) return;

  trackInfo.classList.add("switching");
  coverInner.classList.add("switching");

  // reset title scroll to đầu
  trackTitle.classList.remove("scrolling");
  trackTitle.style.transform = "translateX(0)";

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
    // bật scroll title
    trackTitle.classList.add("scrolling");
  } else {
    playerRoot.classList.remove("playing");
    playBtn.innerHTML = "&#9654;";
    isDiscPlaying = false;
    // reset title về vị trí ban đầu
    trackTitle.classList.remove("scrolling");
    trackTitle.style.transform = "translateX(0)";
  }
}

// khởi tạo
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
  // cycle: off -> all -> one -> off
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

// cho nút Prev/Next thì cứ vòng tròn để dễ dùng
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

// khi hết bài
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
      // repeat off: dừng
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

// thanh thời gian: màu đã phát / chưa phát
function updateSeekGradient() {
  const value = seek.value; // 0-100
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
  const value = volumeSlider.value; // 0-100
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

// =================== GLOBAL BUBBLE (CLICK BẤT CỨ ĐÂU) ===================
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

// =================== ĐĨA XOAY BẰNG JS (GIỮ GÓC KHI PAUSE) ===================
let discAngle = 0;
let lastTime = null;

function discLoop(timestamp) {
  if (!lastTime) lastTime = timestamp;
  const delta = timestamp - lastTime;
  lastTime = timestamp;

  if (isDiscPlaying) {
    const speed = 360 / 9000; // 1 vòng ~ 9s
    discAngle += speed * delta;
    coverImg.style.transform = `rotate(${discAngle}deg)`;
  }

  requestAnimationFrame(discLoop);
}
requestAnimationFrame(discLoop);

// =================== LIQUID WAVEFORM (AUDIO-REACTIVE) ===================
let t = 0;

function drawLiquidWave() {
  const w = canvas.width / window.devicePixelRatio;
  const h = canvas.height / window.devicePixelRatio;
  ctx.clearRect(0, 0, w, h);

  // nền nhẹ
  ctx.fillStyle = "rgba(255, 255, 255, 0.16)";
  ctx.fillRect(0, 0, w, h);

  const cy = h / 2;

  // gradient đổi nhẹ theo thời gian
  const grad = ctx.createLinearGradient(0, 0, w, h);
  const shift = (Math.sin(t * 0.01) + 1) / 2;
  grad.addColorStop(0, `rgba(255, 160, 210, ${0.6 + 0.3 * shift})`);
  grad.addColorStop(0.5, `rgba(255, 191, 168, ${0.6 + 0.3 * (1 - shift)})`);
  grad.addColorStop(1, "rgba(255, 222, 210, 0.95)");

  ctx.lineWidth = 2.6;
  ctx.strokeStyle = grad;

  // lấy audio level
  let ampFactor = 0.3;
  if (analyser && !audio.paused && !audio.ended) {
    analyser.getByteFrequencyData(dataArray);
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
    const avg = sum / dataArray.length; // 0–255
    ampFactor = 0.25 + (avg / 255) * 0.9;
  }

  const baseAmp = (h / 3) * ampFactor;
  const segments = 150;

  // đường chính
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

  // blob fill dưới
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


// ========== ANIMATION CHO SECTION MEMORIES KHI SCROLL LÊN/XUỐNG ==========

function initMemoriesObserver() {
  const cards = document.querySelectorAll(".memory-card");
  if (!cards.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // THẤY TRONG VIEWPORT → HIỆN
          entry.target.classList.add("in-view");
        } else {
          // RA KHỎI VIEWPORT → ẨN
          entry.target.classList.remove("in-view");
        }
      });
    },
    {
      threshold: 0.25, // card xuất hiện ~25% là bắt đầu hiện
    }
  );

  cards.forEach((card) => observer.observe(card));
}

initMemoriesObserver();


drawLiquidWave();
