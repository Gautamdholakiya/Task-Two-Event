const router = require("express").Router();
const SignupController = require("../Controller/UserController");
const EventController = require("../Controller/CreateEvent");
const UserMiddelWare = require("../MiddelWare/UserMiddelWare");

router.post("/SignUp", SignupController.SignUp);
router.post("/Login", SignupController.Login);
router.post("/CreateEvent", UserMiddelWare, EventController.CreatEvent);
router.get("/GetDataWithFilter", EventController.GetDataByFilter);
router.get("/GetDataWithTitleAndCity", EventController.GetDataWithTitleAndCity);
router.get(
  "/GetDataWithRecentlyCreateEventAndCity",
  EventController.GetDataWithDataAndCity
);
router.put("/UpdateEvent", UserMiddelWare, EventController.UpdateEvent);
router.delete("/DeleteEvent", UserMiddelWare, EventController.DeletEvent);
router.post(
  "/LikesAndUnlikeEvent",
  UserMiddelWare,
  EventController.LikeAndUnlikeEents
);

module.exports = {
  router,
};
