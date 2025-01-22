// サウンド設定
const sounds = [
  {
    src: "./assets/song/AzureNight.mp3",
    volume: 0.2,
  },
  {
    src: "./assets/song/ElectricDreams.mp3",
    volume: 0,
  },
];

const initVol = sounds[0].volume;

// Howlインスタンスを作成
const howls = sounds.map(
  (sound) =>
    new Howl({
      src: sound.src,
      loop: true,
      volume: sound.volume,
    })
);

// スクロールイベントリスナー
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollY / height;

  howls.forEach((howl, index) => {
    howl.volume(initVol * (index === 0 ? 1 - ratio : ratio));
  });
});

// オーディオ再生
let audioContext;
const playAudio = () => {
  if (!audioContext) {
    audioContext = new AudioContext();
    howls.forEach((howl) => howl.play());
  }
};

// ボタンクリックイベント
const playButton = document.getElementById("playButton");
playButton.addEventListener("click", playAudio);

// レイヤーのフェードアウト
const closeBtn = document.querySelector(".close-btn");
const layer = document.querySelector(".layer");

const fadeOutLayer = () => {
  layer.style.opacity = 0;
  layer.style.transition = "opacity 0.5s ease-in-out";
  setTimeout(() => {
    layer.style.display = "none";
  }, 500);
};

closeBtn.addEventListener("click", fadeOutLayer);
