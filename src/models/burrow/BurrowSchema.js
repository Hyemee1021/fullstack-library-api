import mongoose from "mongoose";

const burrowSchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Types.ObjectId,

      require: true,
    },
    bookName: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
    userName: {
      type: String,
      required: true,
    },
    reviewGiven: {
      type: mongoose.Types.ObjectId,
      default: null,
    },
    dueDate: {
      type: Date,

      default: Date.now() + 15 * 24 * 60 * 60 * 1000,
    },
    isReturned: {
      type: Boolean,
      default: false,
    },
    returnedDate: {
      type: Date,
      default: null,
    },
    thumbnail: {
      type: String,
      default: "",
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("Burrow", burrowSchema);
