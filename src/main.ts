import { Application } from 'pixi.js';
import './css/main.css';
import { RouteManager } from './manager/route_manager';

export const app = new Application();

globalThis.__PIXI_APP__ = app;

await app.init({ background: "#000000", resizeTo: window, preference: "webgl"});

document.body.appendChild(app.canvas);

export const router = new RouteManager();

router.startGame();