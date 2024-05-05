import { SquareGroup } from "./SquareGroup";

export interface Point {
  readonly x: number;
  readonly y: number;
}

export interface IViewer {
  /**
   * 显示
   */
  show(): void;

  /**
   * 移除，不再显示
   */
  remove(): void;
}

/**
 * 形状
 */
export type Shape = Point[];

/**
 * 移动方向
 */
export enum Direction {
  Left,
  Right,
  Down,
}

export enum GameStatus {
  init,
  playing,
  pause,
  over,
}

export interface GameViewer {
  /**
   *
   * @param teris 下一个方块对象
   */
  showNext(teris: SquareGroup): void;
  /**
   *
   * @param teris 切换方块对象
   */
  switch(teris: SquareGroup): void;
}
