const getAllJobs = async (req, res) => {
  res.send("getAllJobs");
};
const getSingleJobs = async (req, res) => {
  res.send("getSingleJobs");
};
const createJobs = async (req, res) => {
  res.send("createJobs");
};
const updateJobs = async (req, res) => {
  res.send("updateJobs");
};
const deleteJobs = async (req, res) => {
  res.send("deleteJobs");
};
module.exports = {
  getAllJobs,
  createJobs,
  getSingleJobs,
  updateJobs,
  deleteJobs,
};
