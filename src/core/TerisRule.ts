import { Direction, Point, Shape } from "./types";
import GameConfig from "./GameConfig";
import { SquareGroup } from "./SquareGroup";

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
  static canIMove(shape: Shape, targetPoint: Point): boolean {
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

    return true;
  }

  static move(teris: SquareGroup, targetPoint: Point): void;
  static move(teris: SquareGroup, direction: Direction): boolean;
  static move(
    teris: SquareGroup,
    targetPointOrDirection: Point | Direction
  ): boolean | void {
    if (isPoint(targetPointOrDirection)) {
      if (TerisRule.canIMove(teris.shape, targetPointOrDirection)) {
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
      return this.move(teris, targetPoint);
    }
  }

  /**
   * 将当前的方块，移动到目标方向的终点
   * @param teris
   * @param direction
   */
  static moveDirectly(teris: SquareGroup, direction: Direction) {
    while (this.move(teris, direction)) {}
  }

  static rotate(teris: SquareGroup): boolean {
    const newShape = teris.afterRotateShape();
    if (this.canIMove(newShape, teris.centerPoint)) {
      teris.rotate();
      return true;
    }
    return false;
  }
}
