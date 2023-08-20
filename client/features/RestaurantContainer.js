import React, { useState } from 'react';
import { imageFile } from "./ImgOcrTranslate"
import { menu } from "./TranslationDisplay"

const RestaurantContainer = () => {
    const [description, setDescription] = useState('')
    
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };
    
    const handleEditDescription = () => {
        setDescription(description);
    }

  return (
    <Container>
      {description ? (
        <>
          <Description>{description}</Description>
          <DescriptionButton onClick={handleEditDescription}>Edit Description::</DescriptionButton>
        </>
      ) : (
        <textarea
          placeholder="Enter restaurant description..."
          value={description}
          onChange={handleDescriptionChange}
        />
      )}
      <RestaurantImage src={imageFile} alt="Restaurant" />
      <RestaurantMenu>{menu}</RestaurantMenu>
    </Container>
  );
};

export default RestaurantContainer;