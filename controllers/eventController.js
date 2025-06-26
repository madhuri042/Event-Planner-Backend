const Event = require("../models/event");

exports.createEvent = async (req, res) => {
  const event = new Event({ ...req.body, createdBy: req.user._id });
  await event.save();
  res.status(201).json(event);
};

exports.getEvents = async (req, res) => {
  const events = await Event.find({ createdBy: req.user._id });
  res.json(events);
};

exports.getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (event.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Access denied" });
  }
  res.json(event);
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    Object.assign(event, req.body);
    await event.save();

    res.json({ message: "Event updated", event });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (
      !event.createdBy ||
      event.createdBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    await event.deleteOne();
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Delete Event Error:", error.message);
    res
      .status(500)
      .json({ message: "Failed to delete event", error: error.message });
  }
};