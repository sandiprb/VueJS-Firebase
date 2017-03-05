import firebase from 'firebase'
import config from './config'

firebase.initializeApp(config)
const auth = firebase.auth()
const storage = firebase.storage()
const storageRef = storage.ref()
// const db = app.database()

export default {
  auth: auth,

  login: function (user = {email: '', password: ''}, callback) {
    if (!user.email || !user.password) {
      callback('Invalid email or password', null)
      return
    }
    const promise = auth.signInWithEmailAndPassword(user.email, user.password)
    promise.catch(e => console.log(e))
  },

  logout: function (callback) {
    auth.signOut()
    .then(function () {
      callback && callback()
    }, function (error) {
      console.log(error)
    })
  },

  signUp: function (user = {email: '', password: ''}, callback) {
    console.log(user)
    if (!user.email || !user.password) {
      callback('Invalid user ', null)
      return
    }
    auth.createUserWithEmailAndPassword(user.email, user.password).catch(error => {
      callback(error, '')
    })
  },

  fileUpload: function (file, path = '/', callback) {
    if (!file) {
      alert('Please select a file to upload')
      return
    }

    let uploadTask = storageRef.child(`images/${file.name}`).put(file)
    uploadTask.on('state_changed', function (snapshot) {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log('Upload is ' + progress + '% done')
    }, error => {
      callback(error, null)
    }, success => {
      let downloadURL = uploadTask.snapshot.downloadURL
      callback && callback(null, downloadURL)
    })
  },

  updateProfile (updatedProfile, callback) {
    let user = auth.currentUser
    user.updateProfile({
      displayName: updatedProfile.displayName,
      photoURL: updatedProfile.photoURL
    }).then((res) => {
      callback && callback(null, res)
    }, error => {
      callback && callback(error, null)
    })
  },

  verifyEmail (callback) {
    auth.currentUser.sendEmailVerification().then((success) => {
      callback && callback(null, success)
    }, error => {
      callback && callback(error, null)
    })
  }
}
