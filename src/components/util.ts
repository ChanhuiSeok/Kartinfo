export function findItems(
  items: Array<any>,
  target: string,
  unknownMsg: string
) {
  for (let i in items) {
    if (items[i].id === target) return items[i].name;
  }
  return unknownMsg;
}
export function makeElapsedMin(time: string): number {
  if (time === "") return 0;
  const elapsedSec = parseInt(time) / 1000;
  const elapsedMin = elapsedSec / 60;
  return Math.floor(elapsedMin);
}
export function makeTimeSec(time: string, elapsedMin: number): number {
  if (time === "") return 0;
  const result = parseInt(time) / 1000 - elapsedMin * 60;
  return Math.floor(result);
}
export function makeTimeMSec(time: string, elapsedMin: number): number {
  if (time === "") return 0;
  const result = (parseInt(time) - elapsedMin * 60 * 1000) % 1000;
  return Math.floor(result);
}
