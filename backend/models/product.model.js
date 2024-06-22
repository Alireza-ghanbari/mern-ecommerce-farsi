import mongoose from "mongoose";
import slugify from "slugify";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    description: {
      type: String,
      trim: true,
    },
    images: {
      type: [String],
      required: [true, "image is required"],
    },
    price: {
      type: Number,
      required: [true, "price is required"],
    },
    discoutPrice: {
      type: Number,
      validate: {
        validator: function (value) {
          return this.price > value;
        },
        message: "discount price should be less than the original price",
      },
    },
    category: {
      type: [String],
      required: [true, "category is required"],
    },
    quantity: {
      type: Number,
      required: [true, "quantity is required"],
      validate: {
        validator: function (value) {
          return value >= 0;
        },
        message: "invalid quantity",
      },
    },
    startDiscountDate: {
      type: Date,
    },
    endDiscountDate: {
      type: Date,
    },
    slug: {
      type: String,
    },
  },
  { timestamps: true }
);

ProductSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
