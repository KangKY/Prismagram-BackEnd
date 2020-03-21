import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: "ap-northeast-2"
});

const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "second-family/avatar",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});

const multerPost = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "second-family/post",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});



export const uploadAvatar = multerAvatar.single("avatar");
export const uploadPost = multerPost.array("post");

export const uploadController = (req, res) => {
  if(!req.file) {
    res.json({location: null});
  } else {
    const {
      file
    } = req;
    console.log(req.file);
    
    const location = file.location.replace("https://second-family.s3.ap-northeast-2.amazonaws.com", "https://d3a202416judqc.cloudfront.net")
    console.log(location);
    
    res.json({ location });
  }
};

export const uploadMultiController = (req, res) => {
  
  if(!req.files) {
    res.json({location: null});
  } else {
    let locations = [];
    req.files.map(file => {
      const location = file.location.replace("https://second-family.s3.ap-northeast-2.amazonaws.com", "https://d3a202416judqc.cloudfront.net")
      locations.push(location);
    });
    console.log(locations);
    res.send(locations);
  }
};