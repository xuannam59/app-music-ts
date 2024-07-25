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
exports.result = void 0;
const unidecode_1 = __importDefault(require("unidecode"));
const songs_model_1 = __importDefault(require("../../model/songs.model"));
const singer_model_1 = __importDefault(require("../../model/singer.model"));
const result = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const type = req.params.typeSearch;
        const keyword = `${req.query.keyword}`.trim();
        let newSong = [];
        if (keyword) {
            const keywordRegex = new RegExp(keyword, "i");
            const unidecodeText = (0, unidecode_1.default)(keyword);
            const keywordSlug = unidecodeText.replace(/\s+/g, "-");
            const slug = new RegExp(keywordSlug, "i");
            const songs = yield songs_model_1.default.find({
                $or: [
                    { title: keywordRegex },
                    { slug: slug }
                ],
                deleted: false
            }).select("-lyrics -audio");
            for (let item of songs) {
                const singer = yield singer_model_1.default.findOne({
                    _id: item.singerId,
                }).select("fullName");
                item["singer"] = singer;
                newSong.push({
                    title: item.title,
                    avatar: item.avatar,
                    singer: singer,
                    like: item.like,
                    slug: item.slug
                });
            }
        }
        switch (type) {
            case "result":
                res.render("client/pages/search/result", {
                    pageTitle: `Tìm bài: ${keyword}`,
                    songs: newSong,
                    keyword: keyword
                });
                break;
            case "suggest":
                res.json({
                    code: 200,
                    message: "success",
                    songs: newSong
                });
                break;
        }
    }
    catch (error) {
    }
});
exports.result = result;
