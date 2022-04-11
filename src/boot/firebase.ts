import { boot } from 'quasar/wrappers'

// firebase
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
import firebaseConfig from '../firebase-config'
import { getFirestore } from 'firebase/firestore'

import { getDatabase } from 'firebase/database';



export default boot(({ }) => {
  initializeApp(firebaseConfig)
  getStorage()
  getAuth()
  getDatabase()
  getFirestore()

})

