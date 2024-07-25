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
exports.editPost = exports.edit = exports.createPost = exports.create = exports.index = void 0;
const songs_model_1 = __importDefault(require("../../model/songs.model"));
const topic_model_1 = __importDefault(require("../../model/topic.model"));
const singer_model_1 = __importDefault(require("../../model/singer.model"));
const system_1 = require("../../config/system");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield songs_model_1.default.find({
        status: "active",
        deleted: false
    }).select("-lyrics -audio");
    for (let song of songs) {
        const topic = yield topic_model_1.default.findOne({
            _id: song.topicId,
            deleted: false
        }).select("title");
        const singer = yield singer_model_1.default.findOne({
            _id: song.singerId,
            deleted: false
        }).select("fullName");
        song["topic"] = topic;
        song["singer"] = singer;
    }
    res.render("admin/pages/songs/index", {
        pageTitle: "Danh sách bài hát",
        songs: songs
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield topic_model_1.default.find({
        deleted: false,
        status: "active"
    }).select("title");
    const singers = yield singer_model_1.default.find({
        deleted: false,
        status: "active"
    }).select("fullName");
    res.render("admin/pages/songs/create", {
        pageTitle: "Thêm mới",
        topics: topics,
        singers: singers
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let avatar = "";
    let audio = "";
    if (req.body["avatar"]) {
        avatar = req.body["avatar"][0];
    }
    if (req.body["audio"]) {
        audio = req.body["audio"][0];
    }
    const data = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        avatar: avatar,
        audio: audio
    };
    const song = new songs_model_1.default(data);
    yield song.save();
    res.redirect(`/${system_1.systemConfig.prefixAdmin}/songs`);
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const song = yield songs_model_1.default.findOne({
            _id: id,
            deleted: false,
            status: "active"
        });
        const topics = yield topic_model_1.default.find({
            deleted: false,
            status: "active"
        });
        const singers = yield singer_model_1.default.find({
            deleted: false,
            status: "active"
        });
        res.render("admin/pages/songs/edit", {
            pageTitle: `Bài hát: ${song.title}`,
            song: song,
            topics: topics,
            singers: singers
        });
    }
    catch (error) {
        res.redirect(`/${system_1.systemConfig.prefixAdmin}/songs`);
    }
});
exports.edit = edit;
const editPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        lyrics: req.body.lyrics,
        status: req.body.status
    };
    if (req.body["avatar"]) {
        data["avatar"] = req.body["avatar"];
    }
    if (req.body["audio"]) {
        data["audio"] = req.body["audio"];
    }
    yield songs_model_1.default.updateOne({ _id: id }, data);
    res.redirect("back");
});
exports.editPost = editPost;
