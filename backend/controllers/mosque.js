import mosqueModel from "../models/mosque.js";
import ApiFeatures from "../utils/apiFeatures.js";

export const createmosque = async (req, res) => {
  try {
    const {
      name,
      slug,
      state,
      city,
      street,
      postalCode,
      phone,
      email,
      website,
      regular,
      friday,
      fajr,
      dhuhr,
      asr,
      maghrib,
      isha,
      jumma,
      images,
    } = req.body;
    const Adminid = req.headers["admin-id"];

    const mosque = new mosqueModel({
      name,
      slug,
      state,
      city,
      street,
      postalCode,
      phone,
      email,
      website,
      regular,
      friday,
      fajr,
      dhuhr,
      asr,
      maghrib,
      isha,
      jumma,
      images,
      uniqueId: Adminid,
    });

    await mosque.save();
    res.status(200).json({
      success: true,
      mosque,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


export const getmosques = async (req, res) => {
  try {
    const resultPerPage = 100;  // Number of results per page
    const apiFeatures = new ApiFeatures(mosqueModel.find(), req.query)
      .search()  
      .filter()  
      .paginate(resultPerPage);  

    const mosques = await apiFeatures.query;

    res.status(200).json({
      success: true,
      count: mosques.length,
      mosques,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const singlemosque = async (req, res, next) => {
  try {
    const mosque = await mosqueModel.findById(req.params.id);

    if (!mosque) {
      return res.status(404).json({
        success: false,
        message: "mosque not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "mosque found",
      mosque: mosque,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



export const updatemosque = async (req, res) => {
  try {
    // Log the request body to inspect incoming data
    console.log("Request Body:", req.body);

    // Extract prayer timings and other mosque details from the request body
    const { 
      name, 
      slug, 
      street, 
      city, 
      state, 
      postalCode, 
      phone, 
      email, 
      website, 
      regular, 
      friday, 
      fajr, 
      dhuhr, 
      asr, 
      maghrib, 
      isha, 
      jumma, 
      images 
    } = req.body;

    // Update the mosque with the new data
    const mosque = await mosqueModel.findByIdAndUpdate(
      req.params.id, // Using the mosque ID from the URL params
      {
        name,
        slug,
        street,
        city,
        state,
        postalCode,
        phone,
        email,
        website,
        regular,
        friday,
        fajr,
        dhuhr,
        asr,
        maghrib,
        isha,
        jumma,
        images
      },
      { new: true } // Return the updated mosque
    );

    // Check if the mosque exists
    if (!mosque) {
      return res.status(404).json({ success: false, message: "Mosque not found" });
    }

    // Respond with the updated mosque data
    res.status(200).json({ success: true, message: "Mosque updated successfully", mosque });
  } catch (error) {
    // Log any errors and return a server error response
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};




export const singlemosqueupdate = async (req, res) => {
  let mosque = await mosqueModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runvalidator: true,
  });
  if (!mosque) {
    return res.status(404).json({
      success: true,
      message: "mosque not found",
    });
  }
  res.status(200).json({
    success: true,
    message: "mosque updated ",
    mosque,
  });
};

export const deletemosque = async (req, res, next) => {
  let mosque = await mosqueModel.findByIdAndDelete(req.params.id);

  if (!mosque) {
    return res.status(404).json({
      success: false,
      message: "mosque not find",
    });
  }
  res.status(200).json({
    success: true,
    message: "mosque deleted success",
    mosque,
  });
};
