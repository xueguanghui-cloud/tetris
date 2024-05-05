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
    this.setSquarePoints();
  }

  public get shape() {
    return this._shape;
  }

  /**
   * 根据中心点坐标及形状，设置每一个小方块的坐标
   */
  private setSquarePoints() {
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
      arr.push(sq);
    });
    this._squares = arr;
    this.setSquarePoints();
  }

  /**
   * 是否为顺时针旋转
   */
  protected isClock = true;

  public afterRotateShape(): Shape {
    if (this.isClock) {
      return this.shape.map((p) => {
        const newPoint: Point = {
          x: -p.y,
          y: p.x,
        };
        return newPoint;
      });
    } else {
      return this.shape.map((p) => {
        const newPoint: Point = {
          x: p.y,
          y: -p.x,
        };
        return newPoint;
      });
    }
  }

  public rotate() {
    const newShape = this.afterRotateShape();
    this._shape = newShape;
    this.setSquarePoints();
  }
}
