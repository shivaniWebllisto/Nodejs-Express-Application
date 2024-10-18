const express=require('express')
const router=express.Router()
const {createJobs,getAllJobs,getSingleJobs,updateJobs,deleteJobs}=require('../controllers/jobs')
// router.route('/register').post(register)
// router.route('/login').post(login)
//create it 
router.route('/').post(createJobs).get(getAllJobs)
router.route('/jobs/:id').get(getSingleJobs).patch(updateJobs).delete(deleteJobs)
 
module.exports=router