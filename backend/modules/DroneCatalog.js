const multer=require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../../frontend/public')
    },
    filename: (req, file, cb)=>{
        const mimeExtension={
            'image/jpeg' : '.jpeg',
            'image/jpg' : '.jpg',
            'image/png' : '.png',

        }
        cb(null,file.fieldname +'-'+Date.now()+mimeExtension[file.mimetype]);
    }
})
 
var upload = multer({ 
    storage: storage,
    fileFilter:(req,file,cb)=>{
        if(file.mimetype=='image/jpeg'||
       file.mimetype=='image/jpg'||
       file.mimetype=='image/png'){
       cb(null,true);
}else{
    cb(null,false);
    req.fileError="File format not valid";
} 
}
})
const addDrone = async (req, res, next) => {
  const { models: { drone: Drone } } = COREAPP;
    try {
      console.log("hi");
        // let upload = multer({ storage: storage }).single("droneImage");
  
        // upload(req, res, function (err) {
        //     console.log("image name"+req.file);
        //   if (!req.file) {
        //     return res.send("Please select an image to upload");
        //   } else if (err instanceof multer.MulterError) {
        //     return res.send(err);
        //   } else if (err) {
        //     return res.send(err);
        //   }
    
         
          const name = req.body.droneName;
          const brand = req.body.brand;
          const camera = req.body.camera;
          const speed = req.body.speed;
          const weight = req.body.weight;
          const price = req.body.price;
          const time = req.body.time;
          const service = req.body.service;
          
        const droneDetails= await Drone.create({manufacturer:brand},
         {model:name},
          {camera:camera},
          {speed:speed},
          {weight:weight},
          {price:price},
          {time:time},
          {service:service});
            
          res.send ( {success : true});
        
      } catch (err) {
        console.log(err);
      }
    }

module.exports = {
	addDrone
};