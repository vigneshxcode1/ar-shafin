import mongoose from 'mongoose';
import crypto from 'crypto';

const mosqueSchema = new mongoose.Schema(
  {
    uniqueId: {
      type: String,
      unique: true,
      ref: 'Admin',
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,

     
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
      lowercase: true,
    },
    state: {
      type: String,
      required: true,
      lowercase: true,
    },
    postalCode: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
      
    },
    email: {
      type: String,
     
    },
    website: String,

    regular:{
      type: Number
    },

    friday:{
      type: Number
    },
    
    fajr: {
      azaan: String,
      jamaat: String,
      
    },
    dhuhr: {
      azaan: String,
      jamaat: String,
     
    },
    asr: {
      azaan: String,
      jamaat: String,
     
    },
    maghrib: {
      azaan: String,
      jamaat: String,
     
    },
    isha: {
      azaan: String,
      jamaat: String,
    
    },
    jumma: {
      azaan: String,
      jamaat: String,
      qutba: String,
    
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

mosqueSchema.pre("save", function (next) {
  if (!this.uniqueId) {
    const randomStr = crypto
      .randomBytes(2)
      .toString("hex")
      .toUpperCase()
      .slice(0, 4);
    this.uniqueId = `${this.state.toUpperCase()}${this.city.toUpperCase()}_${randomStr}`;
  }
  next();
});

const mosqueModel = mongoose.model("mosque", mosqueSchema);

export default mosqueModel;