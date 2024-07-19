import { Request, Response } from "express";
import unidecode from "unidecode";
import Song from "../../model/songs.model";
import Singer from "../../model/singer.model";


// [GET] /search/result
export const result = async (req: Request, res: Response) => {
  try {
    const type: string = req.params.typeSearch;
    const keyword: string = `${req.query.keyword}`.trim();
    let newSong = [];
    if (keyword) {
      const keywordRegex: RegExp = new RegExp(keyword, "i");
      const unidecodeText: string = unidecode(keyword);
      const keywordSlug = unidecodeText.replace(/\s+/g, "-");
      const slug: RegExp = new RegExp(keywordSlug, "i");
      const songs = await Song.find({
        $or: [
          { title: keywordRegex },
          { slug: slug }
        ],
        deleted: false
      }).select("-lyrics -audio");

      for (let item of songs) {
        const singer = await Singer.findOne({
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
        }
        )
        break;

    }

  } catch (error) {

  }
}