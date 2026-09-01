import { useState, useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

export function ReportsPage() {
  //User Profile Info
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userRank, setUserRank] = useState("");

  //Reporting
  const [syscapStatus, setSyscapStatus] = useState("");
  const [responseAction, setResponseAction] = useState("");
  const [userComments, setUserComments] = useState("");

  const [allReports, setAllReports] = useState([]);

  //Mapping
  const defaultPosition = [38, -104];
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  //Status Colors for Marker
  const statusColors = {
    normal: "green",
    degraded: "yellow",
    unavailable: "red",
  };

  // Fetch all of my reports
  useEffect(() => {
    fetch("http://localhost:8081/reports")
      .then((res) => res.json())
      .then((data) => {
        setAllReports(data);
      })
      .catch((err) => {
        console.error("Error fetching reports:", err);
      });
  }, []);

  //Submit a new report
  async function handleReportSubmission(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: userFirstName,
          last_name: userLastName,
          user_grade_and_rank: userRank,
          report_lat: Number(latitude),
          report_long: Number(longitude),
          syscap_status_code: syscapStatus,
          response_actions: responseAction,
          comments: userComments,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not create report");
      }

      console.log("Report created:", data);

      setAllReports((collectReports) => [...collectReports, data]);

      console.log("Testing add to reports: ", allReports);

      setUserFirstName("");
      setUserLastName("");
      setUserRank("");
      setSyscapStatus("");
      setResponseAction("");
      setUserComments("");
      setLatitude("");
      setLongitude("");
    } catch (error) {
      console.error("Error creating report:", error);
    }
  }

  // Delete Resolved Report
  async function handleReportRemoval(event, reportID) {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8081/reports/${reportID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not remove report");
      }

      window.location.reload();
    } catch (error) {
      console.error("Error removing entry:", error.message);
      alert(error.message);
    }
  }

  return (
    <>
      <div className="page-container">
        <div className="page-header">
          <h1>Welcome to the Map!</h1>
        </div>
        <div className="form-submission">
          <form onSubmit={handleReportSubmission} className="reportSubmission">
            <label className="user-rank">
              Your Grade and Rank:
              <input
                type="text"
                value={userRank}
                onChange={(event) => setUserRank(event.target.value)}
                className="form-select"
              />
            </label>
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

            {/* Retrieve all the reports and place dots */}
            {allReports.map((report) => (
              <CircleMarker
                key={report.id}
                center={[Number(report.report_lat), Number(report.report_long)]}
                radius={15}
                pathOptions={{
                  color: statusColors[report.syscap_status_code] || "gray",
                  fillColor: statusColors[report.syscap_status_code] || "gray",
                  fillOpacity: 0.7,
                }}
              >
                <Popup>
                  <strong>
                    {report.user_grade_and_rank} {report.first_name}{" "}
                    {report.last_name}
                  </strong>
                  <br />
                  Status: {report.syscap_status_code}
                  <br />
                  Response: {report.response_actions}
                  <br />
                  Comments: {report.comments}
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
        {/* Create a table with all the report info */}
        <table className="reports-table">
          <thead className="reports-table-head">
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>User Grade and Rank</th>
              <th>Reported Latitude</th>
              <th>Reported Longitude</th>
              <th>SYSCAP Status</th>
              <th>Response Actions</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody className="reports-table-body">
            {allReports.map((reporttable) => (
              <tr key={reporttable.id}>
                <td>{reporttable.id}</td>
                <td>{reporttable.first_name}</td>
                <td>{reporttable.last_name}</td>
                <td>{reporttable.user_grade_and_rank}</td>
                <td>{reporttable.report_lat}</td>
                <td>{reporttable.report_long}</td>
                <td>{reporttable.syscap_status_code}</td>
                <td>{reporttable.response_actions}</td>
                <td>{reporttable.comments}</td>
                <td>
                  <form
                    onSubmit={(event) =>
                      handleReportRemoval(event, reporttable.id)
                    }
                    className="reportSubmission"
                  >
                    <button type="submit">Remove</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ReportsPage;
