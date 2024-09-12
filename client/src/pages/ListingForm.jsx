import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Form, Button, Alert, Col } from "react-bootstrap";
import { QUERY_GAMES } from "../utils/queries"; // Query to fetch games by name
import { ADD_LISTING } from "../utils/mutations"; // Mutation to add listing
import "./ListingForm.css"; // Import custom CSS for further styling

const ListingForm = () => {
  const [listingType, setListingType] = useState("buy");
  const [gameTitle, setGameTitle] = useState("");
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("new");
  const [description, setDescription] = useState("");
  const [tradeForTitle, setTradeForTitle] = useState("");
  const [tradeForId, setTradeForId] = useState(null);
  const [error, setError] = useState(null);

  const { data: gameData, loading: gameLoading } = useQuery(QUERY_GAMES, {
    variables: { title: gameTitle },
    skip: !gameTitle, // Skip the query until the user types something
  });

  const { data: tradeGameData } = useQuery(QUERY_GAMES, {
    variables: { title: tradeForTitle },
    skip: !tradeForTitle,
  });

  const [addListing, { loading: addListingLoading }] = useMutation(ADD_LISTING);

  // Update the selected game ID when game title matches
  const handleGameSelect = (game) => {
    setSelectedGameId(game._id);
    setGameTitle(game.title);
  };

  const handleTradeGameSelect = (game) => {
    setTradeForId(game._id);
    setTradeForTitle(game.title);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addListing({
        variables: {
          gameId: selectedGameId,
          listing_type: listingType,
          price: listingType === "trade" ? null : price,
          condition,
          description,
          trade_for: tradeForId || null,
        },
      });
      // Handle successful listing creation (e.g., show success message)
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="marketplace-container">
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form.Group controlId="formListingType">
        <Form.Label>Listing Type</Form.Label>
        <Form.Control
          as="select"
          value={listingType}
          onChange={(e) => setListingType(e.target.value)}
          style={{ color: "white" }}
        >
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
          <option value="trade">Trade</option>
        </Form.Control>
      </Form.Group>

      {/* Game Selection */}
      <Form.Group controlId="formGameTitle">
        <Form.Label className="mt-5">Game</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter game title"
          style={{ color: "white" }}
          value={gameTitle}
          onChange={(e) => setGameTitle(e.target.value)}
        />
        {/* Display matched games */}
        {gameData?.games && gameTitle && (
          <ul>
            {gameData.games.map((game) => (
              <li key={game._id} onClick={() => handleGameSelect(game)}>
                {game.title}
              </li>
            ))}
          </ul>
        )}
      </Form.Group>

      {/* Conditional Fields for Buy/Sell */}
      {(listingType === "buy" || listingType === "sell") && (
        <>
          <Form.Group controlId="formPrice">
            <Form.Label className="mt-5" >Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
        </>
      )}

      {/* Condition is required for all listing types */}
      <Form.Group controlId="formCondition">
        <Form.Label className="mt-5" >Condition</Form.Label>
        <Form.Control
          as="select"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        >
          <option value="new">New</option>
          <option value="like new">Like New</option>
          <option value="very good">Very Good</option>
          <option value="good">Good</option>
          <option value="acceptable">Acceptable</option>
        </Form.Control>
      </Form.Group>

      {/* Description Field */
      <Form.Group controlId="formDescription">
        <Form.Label className="mt-5">Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter a description"
          style={{ color: "white" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>}

      {/* Conditional Fields for Trade */}
      {listingType === "trade" && (
        <>
          <Form.Group controlId="formTradeFor">
            <Form.Label className="mt-5" >Looking to Trade For</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter game title you want to trade for"
              style={{ color: "white" }}
              value={tradeForTitle}
              onChange={(e) => setTradeForTitle(e.target.value)}
            />
            {/* Display matched games */}
            {tradeGameData?.games && tradeForTitle && (
              <ul>
                {tradeGameData.games.map((game) => (
                  <li key={game._id} onClick={() => handleTradeGameSelect(game)}>
                    {game.title}
                  </li>
                ))}
              </ul>
            )}
          </Form.Group>
        </>
      )}

      <Button 
        className="mt-5"
        type="submit"
        disabled={!selectedGameId || (listingType === "trade" && !tradeForId)}
      >
        {addListingLoading ? "Adding Listing..." : "Add Listing"}
      </Button>
    </Form>
    </div>
  );
};

export default ListingForm;
