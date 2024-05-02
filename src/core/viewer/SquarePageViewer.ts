import $ from "jquery";
import { Square } from "../Square";
import { IViewer } from "../types";
import PageConfig from "./PageConfig";

/**
 * 显示一个小方块到页面上
 */
export class SquarePageViewer implements IViewer {
  private dom?: JQuery<HTMLElement>;
  private isRemove: boolean = false; // 是否已经移除

  constructor(private square: Square, private container: JQuery<HTMLElement>) {}

  show(): void {
    if (this.isRemove) return;

    if (!this.dom) {
      this.dom = $("<div>")
        .css({
          position: "absolute",
          width: PageConfig.SquareSize.width,
          height: PageConfig.SquareSize.height,
          border: "1px solid #ccc",
          boxSizing: "border-box",
        })
        .appendTo(this.container);
    }

    this.dom.css({
      left: this.square.point.x * PageConfig.SquareSize.width + "px",
      top: this.square.point.y * PageConfig.SquareSize.height + "px",
      backgroundColor: this.square.color,
    });
  }

  remove(): void {
    if (this.dom && !this.isRemove) {
      this.dom.remove();
      this.isRemove = true;
    }
  }
}
