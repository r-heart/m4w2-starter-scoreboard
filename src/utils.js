export function formatMinutesAndSeconds(seconds) {
  const totalMinutes = Math.floor(seconds / 60);
  const minutes = totalMinutes < 1 ? `0${totalMinutes}` : `${totalMinutes}`;
  const remainingSeconds = seconds % 60;
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

  return `${minutes}:${formattedSeconds}`.toString();
}
