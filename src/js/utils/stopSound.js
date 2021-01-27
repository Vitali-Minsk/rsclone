export default function stopSound(audio) {
  const sound = audio;
  sound.pause();
  sound.loop = false;
}
