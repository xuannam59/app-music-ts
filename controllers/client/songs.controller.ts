import { Request, Response } from "express"
import Topic from "../../model/topic.model";
import Song from "../../model/songs.model";
import Singer from "../../model/singer.model";

// [GET] /songs/:slugTopic
export const list = async (req: Request, res: Response) => {
  const slugTopic: string = req.params.slugTopic;

  const topic = await Topic.findOne({
    slug: slugTopic,
    deleted: false,
    status: "active"
  }).select("id title");

  const songs = await Song.find({
    topicId: topic.id,
    deleted: false,
    status: "active"
  }).select("-lyrics -audio");

  for (const item of songs) {
    const singer = await Singer.findOne({
      _id: item.singerId,
      deleted: false
    }).select("fullName");

    item["singer"] = singer;
  }

  res.render("client/pages/songs/list", {
    pageTitle: topic?.title,
    songs: songs
  })
}


// [GET] /song/detail/:slugSong