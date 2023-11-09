import { signInWithEmailAndPassword } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../dbConfig";
//import { doForwardGeocode, doReverseGeocode } from "./locationService";


const login = async (email, password) => {
  let isLoggedIn = false;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    isLoggedIn = true;
    console.log(`User ${auth.currentUser?.uid} logged in`);
  } catch (err) {
    console.log(`Error when signing in user: ${err}`);
  }

  return isLoggedIn;
};

const logout = async () => {
  let isLoggedOut = false;

  try {
    const userUid = auth.currentUser?.uid;
    await auth.signOut();
    isLoggedOut = true;
    navigation.navigate('Onboarding');
    console.log(`User (uid: ${userUid}) logged out`);
  } catch (err) {
    console.error(
      `Error when signing user (uid: ${auth.currentUser.uid} out: ${err}`
    );
  }

  return isLoggedOut;
};

const getAllFavorites = async () => {
    try {
      const allFavorites = [];
      const q = query(
        collection(db, 'favorite'), 
        where("ownerUid", "==", auth.currentUser.uid)
      );
  
      const favoriteSnap = await getDocs(q)
      
      favoriteSnap.forEach((doc) => {
        const favorite = {
          favoriteId: doc.id, 
          ...doc.data(),
        };
        allFavorites.push(favorite);
      });
  
      return allFavorites;
    } catch (err) {
      console.log(`Error when getting all favorites: ${err}`);
      return [];
    }
  };
  

const checkIfHotelIsFavorite = async (hotel_id) => {
    try {
      const q = query(
        collection(db, 'favorite'),
        where('hotel_id', '==', hotel_id)
      );
  
      const querySnapshot = await getDocs(q);
      console.log(!querySnapshot.empty)

      return !querySnapshot.empty;

    } catch (error) {
      console.error('Error checking favorite status:', error);
      return false;
    }
  };

const addFavorite = async (hotel) => {
    try {
      console.log(
        `Adding favorite to Listings with user uid [${auth.currentUser.uid}]`
      );
      const ownerUid = auth.currentUser.uid;
      const favoriteCollection = collection(db, 'favorite');
  
      const hotelData = {
        ownerUid: auth.currentUser.uid,
        hotel_id: hotel.hotel_id,
        hotel_name: hotel.hotel_name,
        city: hotel.city,
        country: hotel.country,
        photo1: hotel.photo1,
        star_rating: hotel.star_rating,
        number_of_reviews: hotel.number_of_reviews,
        overview: hotel.overview,
        rates_from: hotel.rates_from,
        // Add other relevant fields here
      };
  
      const addedDoc = await addDoc(favoriteCollection, hotelData);
      console.log(`Documented added. Ref: ${addedDoc.id}`);
      return { isAdded: true, docId: addedDoc.id };
    } catch (err) {
      console.error(
        `Failed to add listing to user [uid: ${auth.currentUser?.uid}]. ${err}`
      );
      return { isAdded: false, error: err.message };
    }
  };

  const removeFavorite = async (hotel_id) => {
    try {
      console.log(
        `Removing favorite from Favorites with user uid [${auth.currentUser.uid}]`
      );
  
      // Query the "favorite" collection to find the document with matching hotelName
      const q = query(
        collection(db, 'favorite'),
        where('hotel_id', '==', hotel_id)
      );
  
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const favoriteId = querySnapshot.docs[0].id;
        const favoriteRef = doc(db, 'favorite', favoriteId);
        await deleteDoc(favoriteRef);
  
        console.log(`Favorite with ID ${favoriteId} removed.`);
        return { isRemoved: true };
      } else {
        console.log(`No favorite with hotelName ${hotelName} found.`);
        return { isRemoved: false, error: 'Favorite not found' };
      }
    } catch (error) {
      console.error(`Error removing favorite: ${error}`);
      return { isRemoved: false, error: error.message };
    }
  };
  

// const getRenterInfoByBooking = async (booking) => {
//   try {
//     const docRef = doc(db, DbConstants.COLLECTION_USERS, booking.renterUid);
//     const snapshot = await getDoc(docRef);
//     return snapshot.data();
//   } catch (err) {
//     console.log(
//       `Unable to get renterInfo on booking ${booking.id}. Error: ${err}`
//     );
//   }
// };

const getUserAllBookingsDocs = async () => {
  const allBookings = [];
  const allListings = await getAllListings();

  for (const listing of allListings) {
    const userBookingsQuery = query(
      collection(db, 'bookings'),
      where("listingId", "==", listing.listingId)
    );

    const bookingDocs = await getDocs(userBookingsQuery);

    bookingDocs.forEach((doc) => {
      const docData = doc.data();
      const booking = {
        id: doc.id,
        vehicle: listing,
        ...docData,
      };
      allBookings.push(booking);
    });
  }

  for (const [index, booking] of allBookings.entries()) {
    const renterInfo = await getRenterInfoByBooking(booking);
    allBookings[index] = {
      ...booking,
      renterInfo: renterInfo,
    };
  }

  console.log(`All user bookings retrieved. Count: ${allBookings.length}`)
  console.log(`All user bookings: ${JSON.stringify(allBookings, null, 2)}`)

  return allBookings;
};

// const updateBookingStatus = async (bookingId, isApproving) => {
//   const bookingStatus = isApproving
//     ? Label.STATUS_CONFIRMED
//     : Label.STATUS_REJECTED;
//   const booking = doc(db, DbConstants.COLLECTION_BOOKINGS, bookingId);

//   try {
//     if (isApproving) {
//       const refNum = Math.random().toString(36).slice(2, 8).toUpperCase();

//       await updateDoc(booking, {
//         status: bookingStatus,
//         referenceCode: refNum,
//       });
//     } else {
//       await updateDoc(booking, {
//         status: bookingStatus,
//       });
//     }
//     console.log(
//       `Status of booking (id: ${bookingId}) changed to ${bookingStatus}`
//     );

//     return { isUpdated: true, bookingStatus: bookingStatus };
//   } catch (err) {
//     console.error(`Error when confirming booking: ${err}`);
//     return { isUpdated: false, error: err };
//   }
// };

const addBooking = async (vehicle, formInput) => {
  try {
    console.log(
      `Adding listing to Listings with user uid [${auth.currentUser.uid}]`
    );
    const ownerUid = auth.currentUser.uid;

    // new schema: Listings / Bookings collection
    const listingCollection = collection(db, 'bookings');

    const city = postalAddress.city;

    const listing = {
      name: vehicle.name,
      images: vehicle.images,
      seat: parseInt(formInput.seat),
      fuel: formInput.fuel,
      year: parseInt(formInput.year),
      licensePlate: formInput.licensePlate,
      pickupLocation: {
        address: formInput.pickupAddress,
        coordinates: coordinates,
        city: city,
      },
      rentalPrice: parseFloat(formInput.rentalPrice),
      make: vehicle.make,
      model: vehicle.model,
      ownerUid: ownerUid,
    };

    const addedDoc = await addDoc(listingCollection, listing);
    console.log(`Documented added. Ref: ${addedDoc.id}`);
    console.log(`Listing: ${JSON.stringify(listing, null, 2)}`);
    return { isAdded: true, docId: addedDoc.id };
  } catch (err) {
    console.error(
      `Failed to add listing to user [uid: ${auth.currentUser?.uid}]. ${err}`
    );
    return { isAdded: false, error: err.message };
  }
};

export {
  login,
  logout,
  addFavorite,
  getAllFavorites,
  checkIfHotelIsFavorite,
  removeFavorite,
  getUserAllBookingsDocs,
  addBooking,
};
