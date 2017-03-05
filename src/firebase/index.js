import firebase from 'firebase'
import config from './config'

firebase.initializeApp(config)
const auth = firebase.auth()
const storage = firebase.storage()
const storageRef = storage.ref()
// const db = app.database()

export default {
  auth: auth,
  login: function () {
    const promise = auth.signInWithEmailAndPassword(this.newUser.email, this.newUser.pass)
    promise.catch(e => console.log(e))
  },
  logout: function () {
    auth.signOut()
    .then(function () {
      console.log('logged out')
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
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          console.log('Upload is paused')
          break
        case firebase.storage.TaskState.RUNNING:
          console.log('Upload is running')
          break
      }
    }, error => {
      callback(error, null)
    }, success => {
      let downloadURL = uploadTask.snapshot.downloadURL
      callback && callback(null, downloadURL)
    })
  }
}
