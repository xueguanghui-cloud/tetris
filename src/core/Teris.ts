import { SquareGroup } from "./SquareGroup";
import { Point, Shape } from "./types";
import { getRandom } from "./utils";

export const TShape: Shape = [
  { x: -1, y: -0 },
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
];

export const LShape: Shape = [
  { x: -2, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: -1 },
];

export const LReverseShape: Shape = [
  { x: 2, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: -1 },
];

export const SShape: Shape = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 1 },
];

export const SReverseShape: Shape = [
  { x: 0, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
];

export const OShape: Shape = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 0, y: 1 },
];

export const LineShape: Shape = [
  { x: -1, y: 0 },
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
];

export const IShape: Shape = [
  { x: 0, y: -1 },
  { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: 2 },
];

export const shapes: Shape[] = [
  TShape,
  LShape,
  LReverseShape,
  SShape,
  SReverseShape,
  OShape,
  LineShape,
  IShape,
];

export const colors: string[] = ["red", "green", "#f0f", "#ff0", "#00f"];

/**
 * 随机产生一个俄罗斯方块（颜色，形状随机）
 * @param centerPoint 中心点坐标
 */
export function createTeris(centerPoint: Point): SquareGroup {
  let index = getRandom(0, shapes.length);
  const shape = shapes[index];
  index = getRandom(0, colors.length);
  console.log(index);
  const color = colors[index];

  return new SquareGroup(shape, centerPoint, color);
}
