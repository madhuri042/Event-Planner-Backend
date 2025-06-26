const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

router.post("/", protect, createEvent);
router.get("/", protect, getEvents);
router.get("/:id", protect, getEventById);
router.put("/:id", protect, updateEvent); // ✅ ADD THIS LINE

router.delete("/:id", protect, deleteEvent);

module.exports = router;