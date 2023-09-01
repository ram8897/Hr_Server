const asyncHandler = require('express-async-handler')
// const Zoom = require('@zoomus/websdk');


const getMeeting = asyncHandler(async (req, res) => {
    res.send(`
    <form method="POST" action="/schedule">
      <label for="topic">Topic</label>
      <input type="text" name="topic" required>
      <br>
      <label for="start_time">Start Time</label>
      <input type="datetime-local" name="start_time" required>
      <br>
      <label for="duration">Duration (in minutes)</label>
      <input type="number" name="duration" value="30" min="1" max="240" required>
      <br>
      <input type="submit" value="Schedule Meeting">
    </form>
  `);
})

const sehudeleMeeting = asyncHandler( async (req, res) => {
    const {topic, start_time, duration} = req.body;
    const start_time_formatted = new Date(start_time).toISOString();
    // const zoomClient = Zoom.createClient({ apiKey: 'Ce-pHDv8The3DcIghk3mAA', apiSecret: 'whYT1I8732vCJOJkEIoFlUtdUz6UfHPQNATn' })
    zoomClient.meeting.create({
      topic,
      type: 2, // Scheduled meeting
      start_time: start_time_formatted,
      duration: duration,
      timezone: 'UTC',
      password: Math.random().toString(36).slice(-8), // Generate a random password
      agenda: `Scheduled meeting: ${topic}`,
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: true,
        mute_upon_entry: false,
        watermark: false,
        use_pmi: false,
        approval_type: 0,
        registration_type: 2,
        audio: 'both',
        auto_recording: 'none',
      },
    }).then((meeting) => {
      res.send(`
        <p>Meeting created successfully:</p>
        <ul>
          <li>Topic: ${meeting.topic}</li>
          <li>Start Time: ${new Date(meeting.start_time).toLocaleString()}</li>
          <li>Duration: ${meeting.duration} minutes</li>
          <li>Password: ${meeting.password}</li>
          <li>Join URL: <a href="${meeting.join_url}">${meeting.join_url}</a></li>
        </ul>
      `);
    }).catch((error) => {
      console.error(error);
      res.status(500).send('Error creating meeting');
    });
})

module.exports = { getMeeting, sehudeleMeeting }