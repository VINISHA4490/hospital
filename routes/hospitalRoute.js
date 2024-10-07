const express=require('express')
const router=express.Router()

// file handling
const fs=require('fs')

// utility function for reading from json file
const loadHospitaldata=()=>{
    try {

        const dataBuffer=fs.readFileSync('hospitaldata.json')
        const dataJSON=dataBuffer.toString()
        return JSON.parse(dataJSON)
        
    } catch (error) {
        
        return[]
    }
}
// utility function for writing into JSON file

const saveHospitaldata=(loadHospitaldata)=>{
    try{

    
    const dataJSON=JSON.stringify(hospitaldata,null,2)
    fs.writeFileSync('hopitaldata.json',dataJSON)
}catch(error){
    console.log(error)
}
}

// loads all hospital data---loclhost:5000/hospitaldata
router.get('/',(req,res)=>{
 
     const hospitaldata=loadHospitaldata()
    res.send(hospitaldata)

})

// post method
router.post('/',(req,res)=>{
    try{
    const hopitaldata=loadHospitaldata()
    const newhospitaldata={
        id:hospitaldata.length +1,
        name:req.body.name,
        patientcount:req.body.patientcount,
        location:req.body.location||[]
    }
      hospitaldata.push(newhospitaldata)
      saveHospitaldata(hopitaldata)
      res.status(201).send(newhospitaldata)
}catch(error){
    res.status(400).send(error)
}
})

// update by id
router.patch('/:id',(req,res)=>{
    try {
        
        const hospitaldata=loadHospitaldata()
        const hospitaldatas=hospitaldata.find(i=>i.id===parseInt(req.params.id))
        if(!hospitaldatas){
            return res.status(404).send({error:'hospital not found'})
        }

        // having data and updted
        hospitaldatas.name=req.body.name || hospitaldatas.name
        hospitaldatas.patientCount=req.body.patientCoun || hospitaldatas.patientCount
        hospitaldatas.location=req.body.location || hospitaldatas.location
        saveHospitaldata(hospitaldata)
        res.send(200).send(hospitaldatas)

} catch (error) {

    res.status(400).send(error)
        
    }

})

// delete

router.delete('/:id',(req,res)=>{
    try {
        

        let hopitaldata=loadHospitaldata()
        const index=hospitaldata.findIndex(i=>i.id===parseInt(req.params.id))
    if(index === -1){
        return res.status(404).send({error:'hospital not found'})
    }
    
    hopitaldata.splice(index,1)
    saveHospitaldata(hopitaldata)
    res.send({message:'hospital sata deleted'})

    } catch (error) {
        res.status(400).send(error)
        
    }
})


module.exports=router;

// get all hospitaldata- localhost:5000/hospitaldata