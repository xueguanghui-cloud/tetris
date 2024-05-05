import { Direction, Point, Shape } from "./types";
import GameConfig from "./GameConfig";
import { SquareGroup } from "./SquareGroup";
import { Square } from "./Square";

function isPoint(obj: any): obj is Point {
  return typeof obj.x !== "undefined";
}

/**
 * 该类提供一系列的函数，根据游戏规则判断各种情况。
 */
export class TerisRule {
  /**
   * 判断某个形状的方块，是否能够移动到目标位置
   * @returns boolean
   */
  static canIMove(
    shape: Shape,
    targetPoint: Point,
    existSquares: Square[]
  ): boolean {
    // 假设中心点已经移动到了目标位置，算出每个小方块的坐标
    const targetSquarePoints: Point[] = shape.map((it) => {
      return {
        x: targetPoint.x + it.x,
        y: targetPoint.y + it.y,
      };
    });
    // 边界判断
    if (
      targetSquarePoints.some((p) => {
        // 是否超出了边界
        return (
          p.x < 0 ||
          p.x >= GameConfig.panelSize.width ||
          p.y < 0 ||
          p.y >= GameConfig.panelSize.height
        );
      })
    ) {
      return false;
    }

    // 判断是否与已有的方块重叠
    if (
      targetSquarePoints.some((p) =>
        existSquares.some((sq) => sq.point.x === p.x && sq.point.y === p.y)
      )
    ) {
      return false;
    }

    return true;
  }

  static move(
    teris: SquareGroup,
    targetPoint: Point,
    existSquares: Square[]
  ): void;
  static move(
    teris: SquareGroup,
    direction: Direction,
    existSquares: Square[]
  ): boolean;
  static move(
    teris: SquareGroup,
    targetPointOrDirection: Point | Direction,
    existSquares: Square[]
  ): boolean | void {
    if (isPoint(targetPointOrDirection)) {
      if (
        TerisRule.canIMove(teris.shape, targetPointOrDirection, existSquares)
      ) {
        teris.centerPoint = targetPointOrDirection;
        return true;
      }
      return false;
    } else {
      const direction = targetPointOrDirection;
      let targetPoint: Point;
      switch (direction) {
        case Direction.Down:
          targetPoint = {
            x: teris.centerPoint.x,
            y: teris.centerPoint.y + 1,
          };
          break;
        case Direction.Left:
          targetPoint = {
            x: teris.centerPoint.x - 1,
            y: teris.centerPoint.y,
          };
          break;
        case Direction.Right:
          targetPoint = {
            x: teris.centerPoint.x + 1,
            y: teris.centerPoint.y,
          };
          break;
      }
      return this.move(teris, targetPoint, existSquares);
    }
  }

  /**
   * 将当前的方块，移动到目标方向的终点
   * @param teris
   * @param direction
   */
  static moveDirectly(
    teris: SquareGroup,
    direction: Direction,
    existSquares: Square[]
  ) {
    while (this.move(teris, direction, existSquares)) {}
  }

  static rotate(teris: SquareGroup, existSquares: Square[]): boolean {
    const newShape = teris.afterRotateShape();
    if (this.canIMove(newShape, teris.centerPoint, existSquares)) {
      teris.rotate();
      return true;
    }
    return false;
  }

  /**
   * 从已存在的方块中消除，并返回消除的行数
   * @param existSquares
   */
  static deleteSquares(existSquares: Square[]): number {
    // 获得y坐标数组
    const ys = existSquares.map((sq) => sq.point.y);
    // 获取最大和最小的y坐标
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    // 遍历每一行是否可以消除
    let num = 0;
    for (let y = minY; y <= maxY; y++) {
      if (this.deleteLine(existSquares, y)) {
        num++;
      }
    }
    return num;
  }

  /**
   * 消除一行
   * @param existSquares
   * @param y
   */
  private static deleteLine(existSquares: Square[], y: number): boolean {
    const squares = existSquares.filter((sq) => sq.point.y === y);

    if (squares.length === GameConfig.panelSize.width) {
      // 消除此行
      squares.forEach((sq) => {
        sq.viewer?.remove();

        const index = existSquares.indexOf(sq);
        existSquares.splice(index, 1);
      });

      // 处理剩余方块y坐标小于当前y坐标的方块 y+1
      existSquares
        .filter((sq) => sq.point.y < y)
        .forEach((sq) => {
          sq.point = {
            x: sq.point.x,
            y: sq.point.y + 1,
          };
        });

      return true;
    }
    return false;
  }
}
