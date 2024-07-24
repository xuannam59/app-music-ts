import mongoose from "mongoose";
import slug from "mongoose-slug-updater";
const topicSchema = new mongoose.Schema({
  title: String,
  avatar: String,
  description: String,
  status: String,
  slug: {
    type: String,
    slug: "title",
    unique: true
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Topic = mongoose.model("Topic", topicSchema, "topics");

export default Topic;