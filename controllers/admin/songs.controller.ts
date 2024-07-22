import { Request, Response } from "express";
import Song from "../../model/songs.model";
import Topic from "../../model/topic.model";
import Singer from "../../model/singer.model";
import { systemConfig } from "../../config/system";

export const index = async (req: Request, res: Response) => {
  const songs = await Song.find({
    status: "active",
    deleted: false
  }).select("-lyrics -audio");
  for (let song of songs) {
    const topic = await Topic.findOne({
      _id: song.topicId,
      deleted: false
    }).select("title");

    const singer = await Singer.findOne({
      _id: song.singerId,
      deleted: false
    }).select("fullName");

    song["topic"] = topic;
    song["singer"] = singer;
  }
  res.render("admin/pages/songs/index", {
    pageTitle: "Danh sách bài hát",
    songs: songs
  })
};

export const create = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false,
    status: "active"
  }).select("title");

  const singers = await Singer.find({
    deleted: false,
    status: "active"
  }).select("fullName");

  res.render("admin/pages/songs/create", {
    pageTitle: "Thêm mới",
    topics: topics,
    singers: singers
  })
};

export const createPost = async (req: Request, res: Response) => {
  let avatar = "";
  let audio = "";
  if (req.body["avatar"].length > 0) {
    avatar = req.body["avatar"][0];
  }

  if (req.body["audio"].length > 0) {
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

  const song = new Song(data);
  await song.save();

  res.redirect(`/${systemConfig.prefixAdmin}/songs`);
}
