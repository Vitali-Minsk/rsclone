export default function playSound(sound, isLoop) {
  const audio = sound;
  audio.pause();
  audio.currentTime = 0;
  audio.play();
  if (isLoop) audio.loop = true;
}
