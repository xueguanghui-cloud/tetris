import { IViewer, Point } from "./types";
/**
 * 小方块
 */
export class Square {
  public constructor(
    private _point: Point = { x: 0, y: 0 },
    private _color: string = "",
    private _viewer?: IViewer
  ) {}

  public get point(): Point {
    return this._point;
  }

  public set point(point: Point) {
    this._point = point;
    if (this._viewer) this._viewer.show();
  }

  public get color(): string {
    return this._color;
  }

  public set color(color: string) {
    this._color = color;
  }

  public get viewer(): IViewer | undefined {
    return this._viewer;
  }

  public set viewer(viewer: IViewer) {
    this._viewer = viewer;
    if (this._viewer) this._viewer.show();
  }
}
