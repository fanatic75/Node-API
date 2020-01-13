const express = require("express");
const router = express.Router();
const projectService = require("./project.service.js");




const getCostOfAllClients = (req,res,next) => { 

    projectService.getCostOfAllClients(req.query&&req.query)
    .then(result=>result?res.json(result):res.sendStatus(404))
    .catch(err=>next(err));

 

}



router.get("/",getCostOfAllClients);

module.exports = router;