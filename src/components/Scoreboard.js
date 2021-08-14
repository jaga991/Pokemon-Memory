import React, { useState, useEffect } from "react";

import { Container, Row } from "react-bootstrap";

function Scoreboard({
  currentScore,
  highScore
}) {
  let scoreText = `Score: ${currentScore}, High Score: ${highScore}`
  return (
    <Row id="scoreboard">
      <p>{scoreText}</p>
    </Row>
  )
}

export default Scoreboard;