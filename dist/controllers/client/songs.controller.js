"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listen = exports.favorite = exports.favoritePatch = exports.like = exports.detail = exports.list = void 0;
const topic_model_1 = __importDefault(require("../../model/topic.model"));
const songs_model_1 = __importDefault(require("../../model/songs.model"));
const singer_model_1 = __importDefault(require("../../model/singer.model"));
const favorite_model_1 = __importDefault(require("../../model/favorite.model"));
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slugTopic = req.params.slugTopic;
        const topic = yield topic_model_1.default.findOne({
            slug: slugTopic,
            deleted: false,
            status: "active"
        }).select("id title");
        const songs = yield songs_model_1.default.find({
            topicId: topic.id,
            deleted: false,
            status: "active"
        }).select("-lyrics -audio");
        for (const item of songs) {
            const singer = yield singer_model_1.default.findOne({
                _id: item.singerId,
                deleted: false
            }).select("fullName");
            item["singer"] = singer;
        }
        res.render("client/pages/songs/list", {
            pageTitle: topic === null || topic === void 0 ? void 0 : topic.title,
            songs: songs
        });
    }
    catch (error) {
        res.redirect("/topics");
    }
});
exports.list = list;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slugSong = req.params.slugSong;
        const song = yield songs_model_1.default.findOne({
            slug: slugSong,
            deleted: false,
            status: "active"
        });
        const topic = yield topic_model_1.default.findOne({
            _id: song.topicId,
            deleted: false,
            status: "active"
        }).select("title");
        const singer = yield singer_model_1.default.findOne({
            _id: song.singerId,
            deleted: false,
            status: "active"
        }).select("fullName");
        const favorite = yield favorite_model_1.default.findOne({
            songId: song.id,
            deleted: false
        });
        song["topic"] = topic;
        song["singer"] = singer;
        song["favorite"] = favorite ? true : false;
        res.render("client/pages/songs/detail", {
            pageTitel: song.title,
            song: song,
        });
    }
    catch (error) {
        res.redirect("/songs/nhac-tre");
    }
});
exports.detail = detail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const typeLike = req.params.typeLike;
        const song = yield songs_model_1.default.findOne({
            _id: id,
            deleted: false,
            status: "active"
        });
        let newLike;
        if (typeLike == "like") {
            newLike = song.like + 1;
        }
        else {
            newLike = song.like - 1;
        }
        yield songs_model_1.default.updateOne({
            _id: id,
        }, {
            like: newLike
        });
        res.json({
            code: 200,
            message: "Success",
            like: newLike
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Error!"
        });
    }
});
exports.like = like;
const favoritePatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const typeFavorit = req.params.typeFavorit;
        const id = req.params.id;
        switch (typeFavorit) {
            case "favorite":
                const favorite = new favorite_model_1.default({
                    songId: id
                });
                yield favorite.save();
                break;
            case "unFavorite":
                yield favorite_model_1.default.deleteOne({
                    songId: id
                });
                break;
        }
        res.json({
            code: 200,
            message: "Success!"
        });
    }
    catch (_a) {
        res.json({
            code: 400,
            message: "Error!"
        });
    }
});
exports.favoritePatch = favoritePatch;
const favorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const favoriteSongs = yield favorite_model_1.default.find({
            deleted: false
        });
        for (let item of favoriteSongs) {
            const song = yield songs_model_1.default.findOne({
                _id: item.songId
            }).select("-lyrics -audio");
            const singer = yield singer_model_1.default.findOne({
                _id: song.singerId
            }).select("fullName");
            item["song"] = song;
            item["singer"] = singer;
        }
        res.render("client/pages/songs/favorite", {
            pageTitle: "Favorite music",
            favoriteSongs: favoriteSongs
        });
    }
    catch (error) {
        res.redirect("/topics");
    }
});
exports.favorite = favorite;
const listen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.songId;
        const song = yield songs_model_1.default.findOne({
            _id: id,
            deleted: false
        });
        const listen = song.listen + 1;
        yield songs_model_1.default.updateOne({
            _id: id
        }, {
            listen: listen
        });
        const newSong = yield songs_model_1.default.findOne({
            _id: id,
            deleted: false
        });
        const newListen = newSong.listen;
        res.json({
            code: 200,
            message: "Success!",
            listen: newListen
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Error!"
        });
    }
});
exports.listen = listen;
