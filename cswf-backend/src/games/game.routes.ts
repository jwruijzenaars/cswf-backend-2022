import { GameController } from "./game.controller";
import { Express, Router } from "express";
import { GameService } from "./game.service";
const gameController = new GameController(new GameService);
const gameRouter = Router();

gameRouter.get("/", gameController.getGames);

export = gameRouter;