import React from 'react';
import RestaurantContainer from '/RestaurantContainer';


const userPageComponent = () => {


  // Sort the restaurants based on the timestamp in descending order
  const sortedRestaurants = restaurants.sort((a, b) => b.timestamp - a.timestamp);

  return (
    <PageWrapper>
      <UserPage userIconUrl={userIconUrl} userName={userName} />
      {sortedRestaurants.map(restaurant => (
        <RestaurantContainer
          key={restaurant.id}
          description={restaurant.description}
          imageUrl={restaurant.imageFile}
          menu={restaurant.menu}
        />
      ))}
    </PageWrapper>
  );
};

export default userPageComponent;