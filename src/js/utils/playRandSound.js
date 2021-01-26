export default function playRandSound(arr) {
  const audio = arr[Math.floor(Math.random() * arr.length)];
  audio.pause();
  audio.currentTime = 0;
  audio.play();
}
