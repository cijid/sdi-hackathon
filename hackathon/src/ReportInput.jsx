import milRankImg from "../../assets/png/Space-Force-E-6-Rank-Technical-Sergeant.png";

export default function (ReportInput) {
  return (
    <>
      <aside className={styles.reporting}>
        <div className="profileInfo">
          <p className="userRank"></p>
          <p className="userName"></p>
          <p className="syscap"></p>
          <p className="responseAction"></p>
          <p className="comments"></p>
        </div>
        <div className="reportInputs"></div>
        <div className="rankImage"></div>
        <img src={milRankImg} alt="milrank" />
      </aside>
    </>
  );
}
