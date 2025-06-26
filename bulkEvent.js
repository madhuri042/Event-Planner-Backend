const axios = require("axios");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTdmYmE2Nzk3YmIwMGZiNGVjZjZjMCIsImlhdCI6MTc1MDU5NjUxOCwiZXhwIjoxNzUzMTg4NTE4fQ.0lKRH_PW0bD40b49O1XuOsKF3lg2Bc_-Ep4J2chFELo";

const events = [
  {
    title: "Project Meeting",
    description: "Initial discussion on project",
    date: "2025-06-28",
    time: "10:00 AM",
    location: "Office",
    guests: ["guest1@example.com"],
  },
  {
    title: "Client Review",
    description: "Review with client team",
    date: "2025-06-29",
    time: "2:00 PM",
    location: "Zoom",
    guests: ["client@example.com"],
  },
  {
    title: "Demo Day",
    description: "Final product demo",
    date: "2025-07-01",
    time: "4:00 PM",
    location: "Google Meet",
    guests: ["team@example.com", "ceo@example.com"],
  },
];

async function createEvents() {
  for (const event of events) {
    try {
      const res = await axios.post("http://localhost:4000/api/events", event, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(`✅ Created: ${res.data.title}`);
    } catch (err) {
      console.error(
       `❌ Failed to create event: ${event.title}`,
        err.response?.data || err.message
      );
    }
  }
}

createEvents();