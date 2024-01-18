import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

contactSchema.post("save", { errorHandler: true }, handleMongooseError);

const Contact = model("contact", contactSchema);

export default Contact;
