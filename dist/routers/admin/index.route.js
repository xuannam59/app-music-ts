"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const system_1 = require("../../config/system");
const dashboard_route_1 = require("./dashboard.route");
const topics_1 = require("./topics");
const songs_route_1 = require("./songs.route");
const upload_route_1 = require("./upload.route");
const adminRoute = (app) => {
    const prefixAdmin = system_1.systemConfig.prefixAdmin;
    app.use(`/${prefixAdmin}/dashboard`, dashboard_route_1.dashboardRouter);
    app.use(`/${prefixAdmin}/topics`, topics_1.topicsRouter);
    app.use(`/${prefixAdmin}/songs`, songs_route_1.songsRouter);
    app.use(`/${system_1.systemConfig.prefixAdmin}/upload`, upload_route_1.uploadRoute);
};
exports.default = adminRoute;
