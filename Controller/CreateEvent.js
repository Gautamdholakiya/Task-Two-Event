const User = require("../Schema/User");
const Event = require("../Schema/EventSchema");
const CreateEvents = require("../Schema/EventSchema");
// const { error, sucess } = require("../Utills/ResponseWrapper");
const { error, sucess } = require("../Utills/ResponseWrapper");

const CreatEvent = async (req, res) => {
  try {
    const { title, city, status, premier, eventNumber } = req.body;

    if (!title || !city || !status || !premier || !eventNumber) {
      return res.send(error(401, "Enter Required Information"));
    }

    const user = await User.findById(req._id);
    // console.log(user);
    const owner = req._id;

    const eventCreate = await CreateEvents.create({
      owner,
      eventNumber,
      title,
      city,
      status,
      premier,
    });

    // console.log(eventCreate);
    user.Event.push(eventCreate);

    await user.save();

    return res.send(sucess(200, { eventCreate }));
    // console.log(user);

    // console.log(req);
  } catch (e) {
    console.log(e.message);
    return res.send(error(401, e.message));
  }
};

const GetDataByFilter = async (req, res) => {
  // const findQuery = req.body;

  const data = await Event.find(req.query).sort("-createdAt");

  return res.send(sucess(200, { data }));
};

const GetDataWithTitleAndCity = async (req, res) => {
  const { city, title } = req.query;

  const data = await Event.find({ city });
  const dataTtile = await Event.find({ title });

  const result = { data, dataTtile };

  return res.send(sucess(200, { result }));
};

const GetDataWithDataAndCity = async (req, res) => {
  const { city } = req.query;

  const dataWithCity = await Event.find({ city }).sort("-createdAt");

  return res.send(sucess(200, { dataWithCity }));
};

const UpdateEvent = async (req, res) => {
  try {
    const { title, city, status, premier, eventNumber } = req.body;

    const user = await User.findById(req._id);

    if (!user) {
      return res.send(error(401, "User Not Found"));
    }

    const eventownerFind = await Event.find({
      owner: req._id,
      eventNumber: eventNumber,
    }).updateOne({
      title,
      city,
      status,
      premier,
    });

    // console.log(eventownerFind);

    if (!eventownerFind) {
      return res.send(error(401, "You Can Not Update Event!!"));
    }

    await user.save();

    console.log(eventownerFind);

    return res.send(sucess(200, { eventownerFind }));
  } catch (e) {
    return res.send(error(401, e.message));
  }
};

const DeletEvent = async (req, res) => {
  try {
    const { eventNumber } = req.body;

    if (!eventNumber) {
      return res.send(error(401, "Enter EventNumber"));
    }

    const user = await User.findById(req._id);

    const eventFind = await Event.findOne({
      owner: req._id,
      eventNumber: eventNumber,
    }).deleteOne();

    if (eventFind.deletedCount == 0) {
      return res.send(error(401, "Event Not Found"));
    }

    await user.save();

    return res.send(sucess(200, "Event Delete Successfully"));
  } catch (e) {
    console.log(e.message);
    return res.send(error(401, e.message));
  }
};

const LikeAndUnlikeEents = async (req, res) => {
  try {
    const { eventId } = req.body;
    const currentid = req._id;

    const event = await Event.findById(eventId).populate("owner");

    if (!event) {
      res.send(error(401, "event is Required"));
    }
    if (event.likes.includes(currentid)) {
      const index = await event.likes.indexOf(currentid);
      event.likes.splice(index, 1);
      // return res.send(sucess(200, "Event Unliked"));
    } else {
      event.likes.push(currentid);
    }
    await event.save();
    return res.send(sucess(200, "Event Liked"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

module.exports = {
  CreatEvent,
  GetDataByFilter,
  GetDataWithTitleAndCity,
  GetDataWithDataAndCity,
  UpdateEvent,
  DeletEvent,
  LikeAndUnlikeEents,
};
