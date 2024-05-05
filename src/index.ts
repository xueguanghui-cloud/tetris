import $ from "jquery";
import { createTeris } from "./core/Teris";
import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import { TerisRule } from "./core/TerisRule";
import { Direction } from "./core/types";

const teris = createTeris({ x: 8, y: 3 });
teris.squares.forEach((sq) => {
  sq.viewer = new SquarePageViewer(sq, $("#root"));
  sq.viewer.show();
});

$("#btnDown").on("click", () => {
  TerisRule.move(teris, Direction.Down);
});
$("#btnRight").on("click", () => {
  TerisRule.move(teris, Direction.Right);
});
$("#btnLeft").on("click", () => {
  TerisRule.move(teris, Direction.Left);
});
$("#btnRotate").on("click", () => {
  TerisRule.rotate(teris);
});
