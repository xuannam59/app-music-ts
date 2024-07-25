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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMultip = exports.uploadSingle = void 0;
const uploadCloudinary_helper_1 = require("../../helper/uploadCloudinary.helper");
const uploadSingle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req["file"]) {
            const link = yield (0, uploadCloudinary_helper_1.uploadCloudinary)(req["file"].buffer);
            req.body[req["file"].fieldname] = link;
        }
    }
    catch (error) {
        console.log(error);
    }
    next();
});
exports.uploadSingle = uploadSingle;
const uploadMultip = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    for (let key in req["files"]) {
        const links = [];
        for (let item of req["files"][key]) {
            try {
                const link = yield (0, uploadCloudinary_helper_1.uploadCloudinary)(item.buffer);
                links.push(link);
            }
            catch (error) {
                console.log(error);
            }
        }
        req.body[key] = links;
    }
    next();
});
exports.uploadMultip = uploadMultip;
