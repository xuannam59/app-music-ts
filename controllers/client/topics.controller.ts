import { Request, Response } from "express"
import Topic from "../../model/topic.model"

export const index = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false,
  })

  res.render("client/pages/topics/index", {
    pageTitle: "Topic",
    topics: topics
  })
}