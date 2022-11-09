const addDrone = async (req, res, next) => {
  const { models: { drone: Drone } } = COREAPP;
  try {
    const name = req.body.droneName;
    const brand = req.body.brand;
    const camera = req.body.camera;
    const speed = req.body.speed;
    const weight = req.body.weight;
    const price = req.body.price;
    const time = req.body.time;
    const service = req.body.service;
    const image_url = req.body.image_url;
      
    const droneDetails= await Drone.create({
      manufacturer: brand, 
      model: name,
      camera: camera,
      speed: speed,
      weight: weight,
      price: price,
      time: time,
      service: service,
      image_url: image_url
    });
    res.send({success : true});
  } catch (err) {
    console.log(err);
    return next();
  }
};

const getDrone = async (req,res,next)=>{
  const { models: { drone: Drone } } = COREAPP;
  try{
    console.log("hi");
    const drones= await Drone.findAll();

  console.log(drones);
  if(drones){
  res.send({success:true, result:drones});
  
  }
}catch(err){
  console.log(err);
  return next();
}
} 

module.exports = {
	addDrone,
  getDrone
};