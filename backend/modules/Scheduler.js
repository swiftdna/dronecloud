const schedule = require('node-schedule');
const moment = require('moment');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const { BookingDroneScheduler } = require('./Booking');
const { flysimulatorbooking,checkdronestatus } = require('./SimulatorInteraction');
const { param } = require('..');
const _ = require('underscore');


// const BookingDroneScheduler = async(req, res, next) => {
//     const { models: { booking: Booking } } = COREAPP;
//     try {
//         var currDate = moment().toDate();
//         var newDateObj = moment().add(5, 'minutes').toDate();

//         const userbookings = await Booking.findAll({
//             where:{
//                 status: 'booked',
//                 start_date:{
//                     [Op.gte]: currDate,
//                     [Op.lte]: newDateObj
//                 }
//             },
//             raw: true
//         });
//         console.log(userbookings)
//         console.log(currDate,newDateObj)
//         const x = {
//             droneid:"1",
//             serviceid:"22",
//             plan:{"fileType":"Plan","mission":{"cruiseSpeed":15,"hoverSpeed":5,"items":[{"altitude":50.00000000005293,"latitude":37.558605,"longitude":-122.04754200000004,"type":"SimpleItem"},{"altitude":49.99999999958835,"latitude":37.55864599999999,"longitude":-122.04716700000002,"type":"SimpleItem"},{"altitude":50.00000000023102,"latitude":37.55854299999999,"longitude":-122.04714700000001,"type":"SimpleItem"},{"altitude":50.00000000013322,"latitude":37.55850099999999,"longitude":-122.04753699999999,"type":"SimpleItem"},{"altitude":49.99999999947457,"latitude":37.55857599999999,"longitude":-122.04759100000001,"type":"SimpleItem"},{"altitude":14.99999999988875,"latitude":37.55835499999999,"longitude":-122.047656,"type":"SimpleItem"},{"altitude":14.99999999990697,"latitude":37.558277999999994,"longitude":-122.04764200000001,"type":"SimpleItem"},{"altitude":14.999999999058375,"latitude":37.55827200000002,"longitude":-122.04751300000001,"type":"SimpleItem"},{"altitude":14.999999999587114,"latitude":37.558371999999984,"longitude":-122.047544,"type":"SimpleItem"},{"altitude":14.999999999485869,"latitude":37.558385999999985,"longitude":-122.047313,"type":"SimpleItem"},{"altitude":15.00000000058955,"latitude":37.558317,"longitude":-122.04730100000003,"type":"SimpleItem"},{"altitude":14.99999999915223,"latitude":37.558319,"longitude":-122.04721900000001,"type":"SimpleItem"},{"altitude":14.999999998778456,"latitude":37.5584,"longitude":-122.047232,"type":"SimpleItem"}]}}
//         }
        
//         return userbookings
        
//     }
//     catch(e) {
//         console.log(e)
//     }
//   }
const makebooking = async () => {
    const nextbooking = await BookingDroneScheduler();

      // const x = {
        //     droneid:"1",
        //     serviceid:"22",
        //     plan:{"fileType":"Plan","mission":{"cruiseSpeed":15,"hoverSpeed":5,"items":[{"altitude":50.00000000005293,"latitude":37.558605,"longitude":-122.04754200000004,"type":"SimpleItem"},{"altitude":49.99999999958835,"latitude":37.55864599999999,"longitude":-122.04716700000002,"type":"SimpleItem"},{"altitude":50.00000000023102,"latitude":37.55854299999999,"longitude":-122.04714700000001,"type":"SimpleItem"},{"altitude":50.00000000013322,"latitude":37.55850099999999,"longitude":-122.04753699999999,"type":"SimpleItem"},{"altitude":49.99999999947457,"latitude":37.55857599999999,"longitude":-122.04759100000001,"type":"SimpleItem"},{"altitude":14.99999999988875,"latitude":37.55835499999999,"longitude":-122.047656,"type":"SimpleItem"},{"altitude":14.99999999990697,"latitude":37.558277999999994,"longitude":-122.04764200000001,"type":"SimpleItem"},{"altitude":14.999999999058375,"latitude":37.55827200000002,"longitude":-122.04751300000001,"type":"SimpleItem"},{"altitude":14.999999999587114,"latitude":37.558371999999984,"longitude":-122.047544,"type":"SimpleItem"},{"altitude":14.999999999485869,"latitude":37.558385999999985,"longitude":-122.047313,"type":"SimpleItem"},{"altitude":15.00000000058955,"latitude":37.558317,"longitude":-122.04730100000003,"type":"SimpleItem"},{"altitude":14.99999999915223,"latitude":37.558319,"longitude":-122.04721900000001,"type":"SimpleItem"},{"altitude":14.999999998778456,"latitude":37.5584,"longitude":-122.047232,"type":"SimpleItem"}]}}
        // }
   

        const alluserfamrs= _.pluck(nextbooking , 'farm_id');
        
        
        const { models: { farm: Farm } } = COREAPP;
   
		const farmData = await Farm.findAll({raw: true});
        req={}
        req.model = {};
        req.model.data = {
            success: true,
            data: farmData
        };

        console.log( farmData)
        const farmdataIDs = _.pluck(farmData , 'id');
        const filteredFarms = farmdataIDs.filter(droneID => alluserfamrs.indexOf(droneID) === -1);
        console.log(filteredFarms)

        const getFarmPlots = await Farm.findAll(
            
            {
                where:{
                id: {
                    [Op.in]:filteredFarms ,
                    }
               
            },
                raw: true
            }
            );
        req={}
        req.model = {};
        req.model.data = {
            success: true,
            data: getFarmPlots
        };
       
        console.log("%%%",req.model.data.data)

        // for (let i = 0; i < req.model.data.data.length; i++) {
        //     console.log("%%%",req.model.data.data[i].lat)
        //     req.body = {
        //         drone_id:14560,
        //         plan:{"fileType":"Plan","mission":{"cruiseSpeed":15,"hoverSpeed":5,"items":[{"altitude":50.00000000005293,"latitude":req.model.data.data[i].lat,"longitude":req.model.data.data[i].lng,"type":"SimpleItem"}]}},
        //         service_id:1008,
        //         }
        //   }
        req.body = {
            drone_id:14560,
            plan:{"fileType":"Plan","mission":{"cruiseSpeed":15,"hoverSpeed":5,"items":[{"altitude":50.00000000005293,"latitude":37.558605,"longitude":-122.04754200000004,"type":"SimpleItem"},{"altitude":49.99999999958835,"latitude":37.55864599999999,"longitude":-122.04716700000002,"type":"SimpleItem"},{"altitude":50.00000000023102,"latitude":37.55854299999999,"longitude":-122.04714700000001,"type":"SimpleItem"},{"altitude":50.00000000013322,"latitude":37.55850099999999,"longitude":-122.04753699999999,"type":"SimpleItem"},{"altitude":49.99999999947457,"latitude":37.55857599999999,"longitude":-122.04759100000001,"type":"SimpleItem"},{"altitude":14.99999999988875,"latitude":37.55835499999999,"longitude":-122.047656,"type":"SimpleItem"},{"altitude":14.99999999990697,"latitude":37.558277999999994,"longitude":-122.04764200000001,"type":"SimpleItem"},{"altitude":14.999999999058375,"latitude":37.55827200000002,"longitude":-122.04751300000001,"type":"SimpleItem"},{"altitude":14.999999999587114,"latitude":37.558371999999984,"longitude":-122.047544,"type":"SimpleItem"},{"altitude":14.999999999485869,"latitude":37.558385999999985,"longitude":-122.047313,"type":"SimpleItem"},{"altitude":15.00000000058955,"latitude":37.558317,"longitude":-122.04730100000003,"type":"SimpleItem"},{"altitude":14.99999999915223,"latitude":37.558319,"longitude":-122.04721900000001,"type":"SimpleItem"},{"altitude":14.999999998778456,"latitude":37.5584,"longitude":-122.047232,"type":"SimpleItem"}]}},
            service_id:1008,
            }
        req.internal = true
        const flyingdroneresponse = await flysimulatorbooking(req);
        console.log(flyingdroneresponse)

}
const updatebooking = async () => {
    params = {}
    params.droneid = 14560
    params.serviceid = 1007
    const checkdrone = await checkdronestatus(params);
    console.log(checkdrone);

}
const handleBookingSchedule = () => {
    console.log('Scheduler setup for bookings!');
    schedule.scheduleJob('*/10 * * * * *', async () => {
        console.log('I will run once in 5 mins and schedule trips in the simulator', moment().format("MMM dd YYYY hh:mm:ss a"));
    // get all booking within 5 ins
    makebooking();
    updatebooking();
    

    });
};


module.exports = {
    handleBookingSchedule
};