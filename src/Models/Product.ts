import mongoose from "mongoose";

export interface Products extends mongoose.Document {
  name: string;
  price: number;
  weight: number;
  brand : string;
  description : string
  category : string;
  image : string,
}

/* PetSchema will correspond to a collection in your MongoDB database. */
const ProductSchema = new mongoose.Schema<Products>({
  name: {
    type: String,
    required: [true, "Please provide a name for this pet."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  price:{
    type: Number,
    required : true
  },
  weight:{
    type: Number,
    required : true
  },
  brand:{
    type: String,
    required : true
  },
  description:{
    type: String,
    required : true,
    minLength : [3, 'Description should be atleast 3 characters long']
  },
  category:{
    type : String,
    required : true
  },
  image:{
    type : String,
    // required : true
  },


});

export default mongoose.models.product || mongoose.model<Products>("product", ProductSchema);