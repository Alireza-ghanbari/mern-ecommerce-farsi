import mongoose from "mongoose";
import slugify from "slugify";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "already hava a category with this name"],
      required: [true, "name is required"],
    },
    images: {
      type: [String],
      required: [true, "images is required"],
    },
    subCategory: {
      type: [String],
    },
    slug: {
      type: String,
    },
  },
  { timestamps: true }
);

CategorySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next()
});

const Category = mongoose.model("Category", CategorySchema)
export default Category