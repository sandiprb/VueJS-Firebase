<template>
  <div class="container">
    <div class="row" v-if="!user">
      <div class="col-sm-4 col-sm-offset-4">
        <div class="panel panel-default">
          <div class="panel-heading">
            Login
          </div>
          <div class="panel-body">
            <form action="" @submit.prevent="login">
              <div class="form-group">
                <input type="email" required="required" name="email" v-model="newUser.email" class="form-control" value="" placeholder="Email">
              </div>
              <div class="form-group">
                <input type="password" required="required" name="pass" v-model="newUser.pass" class="form-control" value="" placeholder="Password">
              </div>
              <input type="submit" value="Login" class="btn btn-primary btn-block" />
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      Welcome {{user.email}} <br/>
      <a href="javascript:;" @click="logout" class="btn btn-link">Logout</a>
      <div class="row">
        <div class="col-sm-4 col-sm-offset-4">
          <form action="" accept-charset="utf-8" @submit.prevent="addPhoto" class="form-inline">
            <div class="form-group">
              <label for="photo">
                Upload file
                <input type="file" class="form-control" id="elemFileUpload" @change="fileUploadChange"/>
              </label>
              <input type="submit" name="Submit" class="btn btn-primary">
            </div>
          </form>
          <br/>
          <br/>
        </div>
      </div>
      <div v-if="employees">
        <employees-list v-bind:employees="employees"></employees-list>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import toastr from 'toastr'
  import firebaseConfig from '../firebaseConfig'
  import employeesList from './employeeList.vue'

  const app = firebase.initializeApp(firebaseConfig)
  const auth = firebase.auth()
  const storage = firebase.storage()
  const storageRef = storage.ref()
  const db = app.database()

  export default {
    components: {
      'employees-list': employeesList
    },
    data () {
      return {
        newUser: {
          email: '',
          pass: ''
        },
        user: null,
        employees: '',
        newFile: ''
      }
    },
    created: function () {
      auth.onAuthStateChanged(firebaseUser => {
        this.user = firebaseUser && firebaseUser
        if (firebaseUser) {
          let employeesRef = db.ref('employees')
          employeesRef.on('value', snapshot => {
            snapshot && snapshot.val() && (this.employees = snapshot.val())
          }, err => {
            console.log(err)
          })
        }
      })
    },
    methods: {
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
      fileUploadChange: function (e) {
        this.newFile = e.target.files[0]
      },
      addPhoto: function () {
        if (!this.newFile) {
          alert('Please select a file to upload')
          return
        }
        let file = this.newFile
        let uploadTask = storageRef.child(`images/${file.name}`).put(file)
        uploadTask.on('state_changed', function (snapshot) {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
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
          console.log(error)
        }, success => {
          let downloadURL = uploadTask.snapshot.downloadURL
          toastr.success(downloadURL, 'File uploaded successfully', '')
          document.getElementById('elemFileUpload').value = ''
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
