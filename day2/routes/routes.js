const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const crypto = require("crypto")
const multer = require("multer")
const path = require("path")
const {GridFsStorage} = require("multer-gridfs-storage")
const Grid = require("gridfs-stream")

const uploadss = require("../models/product.js")

const city = require("../models/cities.js")
const { findOneAndUpdate } = require("../models/product.js")


const mongoURI = "mongodb://localhost/vixspace2"
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname)
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
const upload = multer({ storage });

// uploading images
// router.post("/",upload.single("img"),(req,res)=>{
//     res.json({file:req.file})
// })

router.post("/",upload.single("image"),async(req,res)=>{
    try {
      const data = new uploadss({
        category: req.body.category,
        title: req.body.title,
        s_no:req.body.s_no,
        image: req.file.image
      })
      await uploadss.insertMany(data)
      console.log("data added successfully")
      res.send("data added successfully")
    } catch (error) {
        res.send({error:error.message})
        console.log(error)
    }
    // res.json({file:req.file})
})



// getting images
router.get('/', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }

    // Files exist
    return res.json(files),console.log(files)
  });
});
// get all details

router.get('/all',async(req, res, next)=>{
  try {
    gfs.files.find().toArray((err, files) => {
      // Check if files
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: 'No files exist'
        });
      }
      return res.json(files),console.log(files)
  })
  } catch (error) {
    res.send({error: error.message})
    console.log(error)
  }
})

// get single image

router.get('/files/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // File exists
    return res.json(file),console.log(file);
  });
});

// displaying image after retreiving it from database

router.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});

// delete images by id

router.delete('/files/:filename', (req, res) => {
  gfs.files.deleteOne({ filename: req.params.filename}, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    }

    res.send("succesfully deleted")
    console.log("deleted")
  });
});

// deleting all images from database

router.delete('/files', (req, res) => {
  gfs.files.deleteMany((err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    }

    res.send("succesfully deleted")
    console.log("deleted")
  });
});

// ************************************************************************
// procudt crud

// create product above

// get product all products

router.get('/product',async(req, res)=>{
  try {
    const data  = await uploadss.find()
    res.send(data)
    console.log(data)
  } catch (error) {
    console.log(error)
    res.send({error: error.message})
  }
})

// get one product
router.get('/product/:category',async(req, res)=>{
  try {
    const data  = await uploadss.findOne({category: req.params.category})
    res.send(data)
    console.log(data)
  } catch (error) {
    console.log(error)
    res.send({error: error.message})
  }
})

// update one production

router.patch('/product/:category',async(req, res)=>{
  try {
    const data  = await uploadss.findOneAndUpdate({category:req.params.category},req.body);
    // data.sub = req.body.sub
    const ai = await data.save()
    res.send("updateed")
    console.log("updated")
  } catch (error) {
    console.log(error)
    res.send({error: error.message})
  }
})

// delete product

router.delete('/product/:category',async(req, res)=>{
  try {
    const data  = await uploadss.findOneAndDelete({category: req.params.category})
    res.send("delted successfully")
    console.log("deleted successfully")
  } catch (error) {
    console.log(error)
    res.send({error: error.message})
  }
})



// ********************************************************************************************************************************
// cities routes

router.post('/cities',async(req,res) => {
  const point = {'latitude': req.body.latitude,
  'longitude': req.body.longitude
    }
  try {
    const citys = new city({
      city_name: req.body.city_name,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      s_no: req.body.s_no,
      points :point
    })
    await city.insertMany(citys)
    console.log("created")
    res.send("created")
  } catch (error) {
    res.send({error: error.message})
    console.log(error)
  }
})

// get all cities
router.get('/cities',async(req, res)=>{
  try {
    const data  = await city.find()
    res.send(data)
    console.log(data)
  } catch (error) {
    console.log(error)
    res.send({error: error.message})
  }
})

// get by city_name

router.get('/cities/:city_name',async(req, res)=>{
  try {
    const data  = await city.findOne({city_name: req.params.city_name})
    res.send(data)
    console.log(data)
  } catch (error) {
    console.log(error)
    res.send({error: error.message})
  }
})

// update city

router.patch('/cities/;city_name',async(req, res)=>{
  try {
    const data  = await city.findOneAndUpdate({city_name:req.body.city_name},req.body)
    // data.sub = req.body.sub
    const a1 = await data.save()
    res.send("updated successfully")
    console.log("updated successfully")
  } catch (error) {
    console.log(error)
    res.send({error: error.message})
  }
})

// delete one city

router.delete('/cities/:city_name',async(req, res)=>{
  try {
    const data  = await city.findOneAndDelete({city_name:req.body.city_name})
    res.send("deleted")
    console.log("deleted")
  } catch (error) {
    console.log(error)
    res.send({error: error.message})
  }
})




module.exports = router