import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  userId: String,
  songId: String,
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date,
}, {
  timestamps: true
});

const Favorite = mongoose.model("Favorite", favoriteSchema, "favorites");

export default Favorite;