/**
 * 根据最小值和最大值得到该范围内的随机数（无法取到最大值）
 * @param min
 * @param max
 * @returns
 */
export function getRandom(min: number, max: number) {
  const desc = max - min;
  return Math.floor(Math.random() * desc + min);
}
