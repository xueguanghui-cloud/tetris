import { SquareGroup } from "./SquareGroup";
import { Point, Shape } from "./types";
import { getRandom } from "./utils";

export class TShape extends SquareGroup {
  constructor(_centerPoint: Point, _color: string) {
    const shape: Shape = [
      { x: -1, y: -0 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
    ];
    super(shape, _centerPoint, _color);
  }
}

export class LShape extends SquareGroup {
  constructor(_centerPoint: Point, _color: string) {
    const shape: Shape = [
      { x: -2, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: -1 },
    ];
    super(shape, _centerPoint, _color);
  }
}

export class LReverseShape extends SquareGroup {
  constructor(_centerPoint: Point, _color: string) {
    const shape: Shape = [
      { x: 2, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: -1 },
    ];
    super(shape, _centerPoint, _color);
  }
}

export class SShape extends SquareGroup {
  constructor(_centerPoint: Point, _color: string) {
    const shape: Shape = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: -1, y: 1 },
    ];
    super(shape, _centerPoint, _color);
  }

  public rotate(): void {
    super.rotate();
    this.isClock = !this.isClock;
  }
}

export class SReverseShape extends SquareGroup {
  constructor(_centerPoint: Point, _color: string) {
    const shape: Shape = [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ];
    super(shape, _centerPoint, _color);
  }

  public rotate(): void {
    super.rotate();
    this.isClock = !this.isClock;
  }
}

export class OShape extends SquareGroup {
  constructor(_centerPoint: Point, _color: string) {
    const shape: Shape = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
    ];
    super(shape, _centerPoint, _color);
  }
  public afterRotateShape(): Shape {
    return this.shape;
  }
}

export class LineShape extends SquareGroup {
  constructor(_centerPoint: Point, _color: string) {
    const shape: Shape = [
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ];
    super(shape, _centerPoint, _color);
  }

  public rotate(): void {
    super.rotate();
    this.isClock = !this.isClock;
  }
}

export class IShape extends SquareGroup {
  constructor(_centerPoint: Point, _color: string) {
    const shape: Shape = [
      { x: 0, y: -1 },
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
    ];
    super(shape, _centerPoint, _color);
  }
  public rotate(): void {
    super.rotate();
    this.isClock = !this.isClock;
  }
}

export const shapes = [
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
  const Shape = shapes[index];
  index = getRandom(0, colors.length);
  console.log(index);
  const color = colors[index];

  return new Shape(centerPoint, color);
}
