import apiFeature from "../utils/apiFeatures.js";
import mosqueModel from '../models/mosque.js'


export const createmosque = async (req, res) => {
  try {
    const { name, slug, address, contactInfo, aboutInfo, facilities, timings, user,images } = req.body;

    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ message: 'Images are required and must be an array' });
    }

    
    if (!name || !slug || !address || !contactInfo || !facilities) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    const mosque = new mosqueModel({
      name,
      slug,
      address,
      contactInfo,
      aboutInfo,
      facilities,
      timings,
      user,
      images
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


export const getmosques = async (req, res, next) => {
  const resultperpage = 100;
  const apiFeatures = new apiFeature(mosqueModel.find(), req.query)
    .search()
    .filter()
    .paginate(resultperpage);

  const mosque = await apiFeatures.query;
  res.status(200).json({
    success: true,
    message: "success get all mosques",
    count: mosque.length,
    mosque,
   
  });
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

export const updatemosque = async (req, res, next) => {
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
