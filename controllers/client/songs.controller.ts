import { Request, Response } from "express"
import Topic from "../../model/topic.model";
import Song from "../../model/songs.model";
import Singer from "../../model/singer.model";
import Favorite from "../../model/favorite.model";

// [GET] /songs/:slugTopic
export const list = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    res.redirect("/topics")
  }

}

// [GET] /songs/detail/:slugSong
export const detail = async (req: Request, res: Response) => {
  try {
    const slugSong = req.params.slugSong;
    const song = await Song.findOne({
      slug: slugSong,
      deleted: false,
      status: "active"
    });

    const topic = await Topic.findOne({
      _id: song.topicId,
      deleted: false,
      status: "active"
    }).select("title");

    const singer = await Singer.findOne({
      _id: song.singerId,
      deleted: false,
      status: "active"
    }).select("fullName");

    song["topic"] = topic;
    song["singer"] = singer;

    res.render("client/pages/songs/detail", {
      pageTitel: song.title,
      song: song,
    })
  } catch (error) {
    res.redirect("/songs/nhac-tre");
  }

}

// [GET] /songs/detail/like/:typeLike/:id
export const like = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const typeLike: string = req.params.typeLike;
    const song = await Song.findOne({
      _id: id,
      deleted: false,
      status: "active"
    });

    let newLike: number
    if (typeLike == "like") {
      newLike = song.like + 1;
    } else {
      newLike = song.like - 1;
    }

    await Song.updateOne({
      _id: id,
    }, {
      like: newLike
    });

    res.json({
      code: 200,
      message: "Success",
      like: newLike
    })
  } catch (error) {
    res.json({
      code: 400,
      message: "Error!"
    });
  }

}

// [GET] /songs/detail/favorite/:typeFavorite/:id
export const favorite = async (req: Request, res: Response) => {
  try {
    const typeFavorit: string = req.params.typeFavorit;
    const id: string = req.params.id;

    switch (typeFavorit) {
      case "favorite":
        const favorite = new Favorite({
          songId: id
        });
        await favorite.save();
        break;
      case "unFavorite":
        await Favorite.deleteOne({
          songId: id
        });
        break;
    }

    res.json({
      code: 200,
      message: "Success!"
    })
  } catch {
    res.json({
      code: 400,
      message: "Error!"
    })
  }
}