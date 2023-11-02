import { signInWithEmailAndPassword } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
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
    const allListings = [];
    const q = query(
      collection(db, 'bookings'),
      where("ownerUid", "==", auth.currentUser.uid)
    );

    const listingSnap = await getDocs(q)
    
    listingSnap.forEach((doc) => {
      const listing = {
        listingId: doc.id,
        ...doc.data(),
      };
      allListings.push(listing);
    });

    console.debug(`All listings retrieved. Count: ${allListings.length}`)

    return allListings;
  } catch (err) {
    console.log(`Error when getting all listings: ${err}`);
    return [];
  }
};

const addFavorite = async (hotel) => {
    try {
      console.log(
        `Adding favorite to Listings with user uid [${auth.currentUser.uid}]`
      );
      const ownerUid = auth.currentUser.uid;
      const favoriteCollection = collection(db, 'favorite');
      console.log(hotel)
  
      const hotelData = {
        hotelName: hotel.hotelName,
        city: hotel.city,
        starRating: hotel.starRating,
        numberOfReviews: hotel.numberOfReviews,
        overview: hotel.overview,
        ratesFrom: hotel.ratesFrom,
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
  getUserAllBookingsDocs,
  addBooking,
};
