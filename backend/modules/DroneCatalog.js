
const multer=require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../etsyfrontend/src/uploads')
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
    try {
        let upload = multer({ storage: storage }).single("droneImage");
  
        upload(req, res, function (err) {
            console.log("image name"+req.file);
          if (!req.file) {
            return res.send("Please select an image to upload");
          } else if (err instanceof multer.MulterError) {
            return res.send(err);
          } else if (err) {
            return res.send(err);
          }
    
          
          const name = req.body.name;
          const brand = req.body.itemDescription;
          const camera = req.body.itemPrice;
          const speed = req.body.itemCount;
          const weight = req.file.filename;
          const price = req.body.itemCategory;
          const time=req.body.id;
          const service=req.params.shop;
          
          dbConnection.query(
            "INSERT INTO drone_catalog (name, manufacturer, camera, speed, weight, price, time, service) VALUES (?, ?, ?, ?, ?, ?,?, ?)",
            [
            
              name,
              brand,
              camera,
              speed,
              weight,
              price,
              time,
              service
  
            ],
            (err, result) => {
              if (err) {
                console.log(err);
                res.send({ message: "error" });
              } else {
                res.send({ message: "success" });
              }
            }
          );
        });
      } catch (err) {
        console.log(err);
      }
    }





module.exports = {
	addDrone
};