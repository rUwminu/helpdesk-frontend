import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBEs8YYiUMhc1vbe-zm5WGIsgMFz252MYE',
  authDomain: 'helpdesk-bff5c.firebaseapp.com',
  projectId: 'helpdesk-bff5c',
  storageBucket: 'helpdesk-bff5c.appspot.com',
  messagingSenderId: '555229723734',
  appId: '1:555229723734:web:46497e2d8644ebba34cff7',
  measurementId: 'G-74TW3GY6SY',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const storage = getStorage(app)
const analytics = getAnalytics(app)

export default storage
