export function formatMinutesAndSeconds(seconds) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60)
    .toString()
    .padStart(2, "0")}`;
}
