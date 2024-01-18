import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers";

// interface IContact {
//   name: string;
//   email: string;
//   phone: string;
//   favorite: boolean
// }

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
