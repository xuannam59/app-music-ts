"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const topic_route_1 = require("./topic.route");
const songs_route_1 = require("./songs.route");
const search_route_1 = require("./search.route");
const clientRoute = (app) => {
    app.use("/topics", topic_route_1.topicRouter);
    app.use("/songs", songs_route_1.songRouter);
    app.use("/search", search_route_1.searchRoute);
};
exports.default = clientRoute;
