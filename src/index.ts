import $ from "jquery";
import { Game } from "./core/Game";
import { GamePageViewer } from "./core/viewer/GamePageViewer";

const game = new Game(new GamePageViewer());

$("#btnStart").on("click", () => {
  game.start();
});
$("#btnPause").on("click", () => {
  game.pause();
});

$("#btnDown").on("click", () => {
  game.controlDown();
});
$("#btnLeft").on("click", () => {
  game.controlLeft();
});
$("#btnRight").on("click", () => {
  game.controlRight();
});
$("#btnRotate").on("click", () => {
  game.controlRotate();
});
