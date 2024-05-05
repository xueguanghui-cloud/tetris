import GameConfig from "./GameConfig";
import { Square } from "./Square";
import { SquareGroup } from "./SquareGroup";
import { createTeris } from "./Teris";
import { TerisRule } from "./TerisRule";
import { Direction, GameStatus, GameViewer } from "./types";

export class Game {
  // 游戏状态
  private _status: GameStatus = GameStatus.init;
  // 当前玩家操作的方块
  private _curTeris?: SquareGroup;
  // 下一个方块
  private _nextTeris: SquareGroup;
  // 计时器
  private _timer?: number;
  // 当前游戏中已存在的方块
  private _existSquares: Square[] = [];
  // 自动下落间隔时间
  private _duration: number = 1000;
  // 积分
  private _score: number = 0;

  constructor(private _viewer: GameViewer) {
    this._nextTeris = createTeris({ x: 0, y: 0 }); // 没有实际含义，只是为了解决TS报错
    this.createNext();
  }

  private createNext() {
    this._nextTeris = createTeris({ x: 0, y: 0 });
    this.resetCenterPoint(GameConfig.nextSize.width, this._nextTeris);
    this._viewer.showNext(this._nextTeris);
  }

  /**
   * 切换方块
   */
  private switchTeris() {
    this._curTeris = this._nextTeris;
    this._curTeris.squares.forEach((sq) => sq.viewer?.remove());
    this.resetCenterPoint(GameConfig.panelSize.width, this._curTeris);
    // 判断当前方块出现后是否和之前方块有重叠
    if (
      !TerisRule.canIMove(
        this._curTeris.shape,
        this._curTeris.centerPoint,
        this._existSquares
      )
    ) {
      // 游戏结束
      this._status = GameStatus.over;
      clearInterval(this._timer!);
      this._timer = undefined;
      return;
    }
    this.createNext();
    this._viewer.switch(this._curTeris);
  }

  /**
   * 当前方块自动下落
   */
  private autoDrop() {
    if (this._timer || this._status !== GameStatus.playing || !this._curTeris)
      return;

    this._timer = setInterval(() => {
      if (this._curTeris) {
        if (
          !TerisRule.move(this._curTeris, Direction.Down, this._existSquares)
        ) {
          // 触底
          this.hitBottom();
        }
      }
    }, this._duration);
  }

  /**
   * 设置中心点坐标，以达到让该方块出现在区域的中上方
   * @param width
   * @param teris
   */
  private resetCenterPoint(width: number, teris: SquareGroup) {
    const x = Math.ceil(width / 2) - 1;
    let y = 0;
    teris.centerPoint = { x, y };
    while (teris.squares.some((it) => it.point.y < 0)) {
      teris.centerPoint = {
        x: teris.centerPoint.x,
        y: teris.centerPoint.y + 1,
      };
    }
  }

  /**
   * 初始化操作
   */
  private init() {
    this.createNext();
    this._existSquares.forEach((sq) => sq.viewer?.remove());
    this._existSquares = [];
    this._curTeris = undefined;
    this._score = 0;
  }

  /**
   * 增加积分
   * @param lineCount 消除行数
   */
  private addScore(lineCount: number) {
    switch (lineCount) {
      case 0:
        break;
      case 1:
        this._score += 10;
        break;
      case 2:
        this._score += 20;
        break;
      case 3:
        this._score += 40;
        break;
      case 4:
        this._score += 100;
        break;
    }
    console.log(this._score);
  }

  /**
   * 触底操作
   */
  private hitBottom() {
    // 将当前的俄罗斯方块包含的小方块加入到已存在的方块数组中；
    this._existSquares = this._existSquares.concat(this._curTeris!.squares);

    // 处理移除
    const num = TerisRule.deleteSquares(this._existSquares);
    // 增加积分
    this.addScore(num);

    // 切换方块
    this.switchTeris();
  }

  /**
   * 游戏开始
   */
  start() {
    if (this._status === GameStatus.playing) return;

    // 从游戏结束到开始
    if (this._status === GameStatus.over) {
      this.init();
    }

    this._status = GameStatus.playing;

    if (!this._curTeris) {
      this.switchTeris();
    }

    this.autoDrop();
  }

  /**
   * 游戏暂停
   */
  pause() {
    if (this._status === GameStatus.pause) return;
    this._status = GameStatus.pause;
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = undefined;
    }
  }

  controlLeft() {
    if (this._curTeris && this._status === GameStatus.playing) {
      TerisRule.move(this._curTeris, Direction.Left, this._existSquares);
    }
  }
  controlRight() {
    if (this._curTeris && this._status === GameStatus.playing) {
      TerisRule.move(this._curTeris, Direction.Right, this._existSquares);
    }
  }
  controlDown() {
    if (this._curTeris && this._status === GameStatus.playing) {
      TerisRule.moveDirectly(
        this._curTeris,
        Direction.Down,
        this._existSquares
      );
      // 触底
      this.hitBottom();
    }
  }
  controlRotate() {
    if (this._curTeris && this._status === GameStatus.playing) {
      TerisRule.rotate(this._curTeris, this._existSquares);
    }
  }
}
