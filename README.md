# INTENT

Create a small application that allows users to report service outages. <br>

## Background

I was building towards this in my original version of project 3. It would be cool to have a tool to provide coordination between Army users and Space Force operators.

```
Army operations depend heavily on satellite communications (SATCOM) and Positioning, Navigation and Timing (PNT) across essentially every warfighting function, while current Space Force planning emphasizes making PNT/SATCOM status and degradation understable and usable by the Joint Force.

The goal is to provide an answer to "What space-enabled capabilities do I have right now, what is degraded, and what should I do about it?" and make those answers useful to an Army staff.

1. A dashboard for space operators to create effect/degradation report with capability, location/area, severity, start/end time, confidence, description and recommended action.

2. Army users see a dashboard of current effects and filter by location/capability. Additionally, they should be able to send field condition reports for space operators to analyze.

Guardians enter space-domain information, but soldiers see operational consequences.
```

That's a bit much IMO to include in this project with the time available. My goal with this hackathon is to collect a report and populate the map at specified coordinates.

# MVP-

1. Users complete a report

- RANK
- FIRST NAME
- LAST NAME
- LAT/LONG
- SYSCAP STATUS (Normal, Degraded, Unavailable)
- RESPONSE ACTION
- COMMENTS

2. Report is saved to database

3. Map always shows open reports

4. List of reports published below map
