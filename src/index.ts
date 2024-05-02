import $ from "jquery";
import { Square } from "./core/Square";
import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import { SquareGroup } from "./core/SquareGroup";
import { LineShape, createTeris } from "./core/Teris";

const teris = createTeris({ x: 3, y: 3 });
teris.squares.forEach((sq) => {
  sq.viewer = new SquarePageViewer(sq, $("#root"));
  sq.viewer.show();
});

$("#btnDown").on("click", () => {
  teris.centerPoint = {
    x: teris.centerPoint.x,
    y: teris.centerPoint.y + 1,
  };
});
$("#btnRight").on("click", () => {
  teris.centerPoint = {
    x: teris.centerPoint.x + 1,
    y: teris.centerPoint.y,
  };
});
$("#btnLeft").on("click", () => {
  teris.centerPoint = {
    x: teris.centerPoint.x - 1,
    y: teris.centerPoint.y,
  };
});
