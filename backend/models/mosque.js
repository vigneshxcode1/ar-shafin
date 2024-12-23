import mongoose from 'mongoose';
import crypto from 'crypto'


const mosqueSchema = new mongoose.Schema(
  {
    uniqueId: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
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
    
    },
    contactInfo: {
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      website: String,
    },
    aboutInfo: {
      established: Date,
      capacity: {
        regular: Number,
        friday: Number,
      },
    },
    facilities: [
      {
        type: String,
        enum: [
          "parking",
          "wudu_area",
          "women_section",
          "wheelchair_access",
          "funeral_service",
          "marriage_hall",
          "library",
          "islamic_school",
        ],
      },
    ],
    timings: {
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
    },
    images: [
      {
       type:String,
       required:true
      },
    ],
    active: {
      type: Boolean,
      default: false,
    },
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
    this.uniqueId = `${this.address.state.toUpperCase()}${this.address.city.toUpperCase()}_${randomStr}`;
  }
  next();
});

const mosqueModel = mongoose.model("mosque", mosqueSchema);

export default mosqueModel;
