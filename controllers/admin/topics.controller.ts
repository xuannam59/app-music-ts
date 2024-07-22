import { Request, Response } from "express";
import Topic from "../../model/topic.model";

export const index = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false,
    status: "active"
  });

  res.render("admin/pages/topics/index", {
    pageTitle: "Chủ đề",
    topics: topics
  })
}