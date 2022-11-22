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
const getFilterDrones = async (req,res,next)=>{
  const { models: { drone: Drone } } = COREAPP;
  const brand = req.body.brand;
  const service = req.body.service;
  const status = req.body.status;
  const price = req.body.price;
  try{
    console.log("hi");
    const drones= await Drone.findAll({
      where:{
          brand,
          service,
          status,
          price,
      },
      raw:true
    });

  console.log(drones);
  if(drones){
  res.send({success:true, result:drones});
  
  }
}catch(err){
  console.log(err);
  return next();
}
} 
const getSingleDrone = async (req,res,next)=>{
  const { models: { drone: Drone } } = COREAPP;
  try{

    const {id} = req.params;
     console.log({id});
    const drone= await Drone.findOne({
      where:{
          id
      }, 
      raw: true
  });

  console.log(drone);
  if(drone){
  res.send({success:true, result:drone});
  
  }
}catch(err){
  console.log(err);
  return next();
}
} 

const updateDrone=async(req,res,next)=>{
  const {models:{drone:Drone}}=COREAPP;
  console.log("hello");
  try{
    const {id}=req.params;
    const name = req.body.droneName;
    const brand = req.body.brand;
    const camera = req.body.camera;
    const speed = req.body.speed;
    const weight = req.body.weight;
    const price = req.body.price;
    const time = req.body.time;
    const service = req.body.service;
    const image_url = req.body.image_url;
    const update_drone=await Drone.update({
      manufacturer: brand, 
      model: name,
      camera: camera,
      speed: speed,
      weight: weight,
      price: price,
      time: time,
      service: service,
      image_url: image_url

    },{ where: {id:id }});
    res.send({success:true})
  }catch(err){
    console.log(err);
    return next();
  }
}


module.exports = {
	addDrone,
  getDrone,
  getSingleDrone,
  updateDrone,
  getFilterDrones,
};