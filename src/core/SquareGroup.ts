import { Square } from "./Square";
import { Point, Shape } from "./types";

/**
 * 组合方块
 */
export class SquareGroup {
  private _squares: readonly Square[] = [];

  get squares(): readonly Square[] {
    return this._squares;
  }

  public get centerPoint(): Point {
    return this._centerPoint;
  }

  public set centerPoint(centerPoint: Point) {
    this._centerPoint = centerPoint;
    this._shape.forEach((p, i) => {
      this._squares[i].point = {
        x: this._centerPoint.x + p.x,
        y: this._centerPoint.y + p.y,
      };
    });
  }

  constructor(
    private _shape: Shape,
    private _centerPoint: Point,
    private _color: string
  ) {
    const arr: Square[] = [];
    // 设置小方块数组
    this._shape.forEach((p) => {
      const sq = new Square();
      sq.color = this._color;
      sq.point = {
        x: this._centerPoint.x + p.x,
        y: this._centerPoint.y + p.y,
      };
      arr.push(sq);
    });
    this._squares = arr;
  }
}
