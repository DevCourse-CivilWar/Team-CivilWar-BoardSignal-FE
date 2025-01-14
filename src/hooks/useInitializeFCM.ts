import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/messaging';

import { API_BASE_URL, FCM_TOKEN_API_URL } from '@/constants/apiRoutes';
import {
  STORAGE_KEY_ACCESS_TOKEN,
  STORAGE_KEY_FCM_TOKEN,
} from '@/constants/storageKeys';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;
const accessToken = localStorage.getItem(STORAGE_KEY_ACCESS_TOKEN);
const isLoggedIn = !!accessToken;

const initializeFirebase = () => {
  firebase.apps.length
    ? firebase.app()
    : firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();
  messaging.getToken({ vapidKey: VAPID_KEY }).then(updateFCMToken);
};

const updateFCMToken = (issuedFCMToken: string) => {
  const savedFCMToken = localStorage.getItem(STORAGE_KEY_FCM_TOKEN);
  if (issuedFCMToken && savedFCMToken !== issuedFCMToken) {
    axios.post(
      `${API_BASE_URL}${FCM_TOKEN_API_URL}`,
      {
        token: issuedFCMToken,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}}`,
        },
      },
    );
    localStorage.setItem(STORAGE_KEY_FCM_TOKEN, issuedFCMToken);
  }
};

const useInitializeFCM = () => {
  if (!isLoggedIn) {
    return;
  }
  initializeFirebase();
};

export default useInitializeFCM;
