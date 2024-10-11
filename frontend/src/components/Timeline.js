import React from "react";
import "./Timeline.css";

function Timeline() {
  return (
    <div className="timeline">
      <div className="timeline-item left">
        <div className="timeline-content">
          <h3>Article I</h3>

          <img src="path/to/image1.jpg" alt="article image" />
          <p>01/01/24</p>
        </div>
      </div>
    </div> // Correctly closing all divs
  );
}

export default Timeline;
