import React, { useState, useEffect } from "react";

import { Card, Button } from "react-bootstrap";

function PokeCard({
  id,
  name,
  sprite,
  selected,
  cardSelected
}) {
  return(
    <Card onClick={cardSelected} id={id} className="m-2" style={{ width: '18rem', backgroundColor: selected ? "#4d908e" : "#335c67", border: "2px solid #f4d58d" }}>
      <Card.Img variant="top" src={sprite} />
      <Card.Body>
        <Card.Title className="text-center">{name}</Card.Title>
      </Card.Body>
    </Card>
  )
}

export default PokeCard;