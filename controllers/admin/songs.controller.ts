import { Request, Response } from "express";
import Song from "../../model/songs.model";
import Topic from "../../model/topic.model";
import Singer from "../../model/singer.model";

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
}