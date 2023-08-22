import React, { useState, useEffect }from 'react';
import { db } from '../firebase';
import { doc, getDoc } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';

const UserPageComponent = () => {

  //Menus are stored as an array with an object inside
  //User info is set as state
  const [restaurants, setRestaurants] = useState([])
  const [user, setUser] = useState(null);

  //User info from auth
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
        setUser(currentUser);
    });
    // This will unsubscribe the listener when the component unmounts
    return () => unsubscribe();
}, []);

  //Fetch menu on user state change
  useEffect(() =>{
    const fetchMenu = async () =>{
      if (user){
        const userDocRef = doc(db, 'users', user.uid);
        //Getting doc based on userId
        const docSnapshot = await getDoc(userDocRef);
        //.exist() check for anything related to the user
        if(docSnapshot.exists()){
          //Contains all stored menus
          const userData = docSnapshot.data()

          if (userData.menus){
            // Sort the menus by date most recent first
            const sortedMenus = userData.menus.sort((a, b) => b.time.toDate() - a.time.toDate());

            // Empty object to organize menus by day
            let organizedByDay = {};

            //Each menu is converted to ISO string, then pushed to the object above
            sortedMenus.forEach(menu => {
              const date = menu.time.toDate()
              .toISOString()
              .split('T')[0]
              //If there's no saved menus to push
              if (!organizedByDay[date]){
                organizedByDay[date] = [];
              }
              organizedByDay[date].push(menu);
            });
            setRestaurants(organizedByDay)
          }
        }
      }
    };

    //Actually calling fetch menu since we're doing an anonymous functions
    fetchMenu()
    //Rerenders anytime something in user state changes.
  }, [user])

  //Ugly but gets the job done
  return (
    <div className='Resturant-menus'>
        {restaurants && Object.keys(restaurants).length > 0 ? (
            <div className='container'>
                {Object.keys(restaurants).map(date => (
                    <div key={date}>
                        <h3>{date}</h3>
                        {restaurants[date].map((restaurant, index) => (
                            <div key={index}>
                                {restaurant.menuHtml}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        ) : (
            <div className='empty-message'>No restaurants available.</div>
        )}
    </div>
);
        }

export default UserPageComponent;
