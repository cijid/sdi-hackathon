import { useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import "./App.css";

function App() {
  //User Profile Info
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userRank, setUserRank] = useState("");

  //Reporting
  const [syscapStatus, setSyscapStatus] = useState("");
  const [responseAction, setResponseAction] = useState("");
  const [userComments, setUserComments] = useState("");
  const [submittedReport, setSubmittedReport] = useState(null);

  //Mapping
  const defaultPosition = [51.505, -0.09];
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  //Status Colors for Marker
  const statusColors = {
    normal: "green",
    degraded: "yellow",
    unavailable: "red",
  };

  function handleReportSubmission(event) {
    event.preventDefault();

    const report = {
      firstName: userFirstName,
      lastName: userLastName,
      rank: userRank,
      latitude: Number(latitude),
      longitude: Number(longitude),
      status: syscapStatus,
      responseAction,
      comments: userComments,
    };

    console.log("Submitted Report: ", report);
    setSubmittedReport(report);
  }

  return (
    <>
      <div className="page-container">
        <div className="page-header">
          <h1>Welcome to the Map!</h1>
        </div>
        <div className="form-submission">
          <form onSubmit={handleReportSubmission} className="reportSubmission">
            <label className="user-first-name">
              Your First Name:
              <input
                type="text"
                value={userFirstName}
                onChange={(event) => setUserFirstName(event.target.value)}
                className="form-select"
              />
            </label>
            <label className="user-last-name">
              Your Last Name:
              <input
                type="text"
                value={userLastName}
                onChange={(event) => setUserLastName(event.target.value)}
                className="form-select"
              />
            </label>
            <label className="user-rank">
              Your Grade and Rank:
              <input
                type="text"
                value={userRank}
                onChange={(event) => setUserRank(event.target.value)}
                className="form-select"
              />
            </label>
            <label>
              Latitude:
              <input
                type="number"
                step="any"
                value={latitude}
                onChange={(event) => setLatitude(event.target.value)}
                className="form-select"
              />
            </label>

            <label>
              Longitude:
              <input
                type="number"
                step="any"
                value={longitude}
                onChange={(event) => setLongitude(event.target.value)}
                className="form-select"
              />
            </label>
            <label className="user-syscap-status">
              SYSCAP Status:
              <select
                value={syscapStatus}
                onChange={(event) => setSyscapStatus(event.target.value)}
                className="form-select"
              >
                <option value="">Select Status</option>
                <option value="normal">Normal</option>
                <option value="degraded">Degraded</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </label>

            <label className="user-response-action">
              Response Actions:
              <input
                type="text"
                value={responseAction}
                onChange={(event) => setResponseAction(event.target.value)}
                className="form-select"
              />
            </label>
            <label className="user-comments">
              Comments:
              <input
                type="text"
                value={userComments}
                onChange={(event) => setUserComments(event.target.value)}
                className="form-select"
              />
            </label>
            <div className="report-submit">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
        <div className="the-map">
          <MapContainer
            center={defaultPosition}
            zoom={8}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {submittedReport && (
              <CircleMarker
                center={[submittedReport.latitude, submittedReport.longitude]}
                radius={15}
                pathOptions={{
                  color: statusColors[submittedReport.status] || "gray",
                  fillColor: statusColors[submittedReport.status] || "gray",
                  fillOpacity: 0.7,
                }}
              >
                <Popup>
                  <strong>
                    {submittedReport.rank} {submittedReport.firstName}{" "}
                    {submittedReport.lastName}
                  </strong>
                  <br />
                  Status: {submittedReport.status}
                  <br />
                  Response: {submittedReport.responseAction}
                  <br />
                  Comments: {submittedReport.comments}
                </Popup>
              </CircleMarker>
            )}
          </MapContainer>
        </div>
      </div>
    </>
  );
}

export default App;
