import { Request, Response } from "express";
import Song from "../../model/songs.model";
import Topic from "../../model/topic.model";
import Singer from "../../model/singer.model";
import { systemConfig } from "../../config/system";


// [GET] /admin/songs
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

// [GET] /admin/songs/create
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

// [POST] /admin/songs/create
export const createPost = async (req: Request, res: Response) => {
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

  const song = new Song(data);
  await song.save();

  res.redirect(`/${systemConfig.prefixAdmin}/songs`);
};

// [GET] /admin/songs/edit/:id
export const edit = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const song = await Song.findOne({
      _id: id,
      deleted: false,
      status: "active"
    });

    const topics = await Topic.find({
      deleted: false,
      status: "active"
    });

    const singers = await Singer.find({
      deleted: false,
      status: "active"
    });

    res.render("admin/pages/songs/edit", {
      pageTitle: `Bài hát: ${song.title}`,
      song: song,
      topics: topics,
      singers: singers
    });

  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/songs`);
  }
}

// [PATCH] /admin/songs/edit/:id
export const editPost = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const data = {
    title: req.body.title,
    topicId: req.body.topicId,
    singerId: req.body.singerId,
    description: req.body.description,
    lyrics: req.body.lyrics,
    status: req.body.status
  }

  if (req.body["avatar"]) {
    data["avatar"] = req.body["avatar"]
  }

  if (req.body["audio"]) {
    data["audio"] = req.body["audio"]
  }

  await Song.updateOne({ _id: id }, data);

  res.redirect("back");
}
