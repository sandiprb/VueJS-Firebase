<template>
  <div>
    <div>
      Welcome {{user.email}}<br/>
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
    </div>
    <div class="row">
      <div class="col-sm-8">
        <div class="panel panel-default">
          <div class="panel-heading">
            Edit Profile
          </div>
          <div class="panel-body">
            <div class="row">
              <!-- left column -->
              <div class="col-md-4 col-sm-6 col-xs-12">
                <div class="text-center">
                  <img v-bind:src="user.photoURL" class="avatar img-circle img-thumbnail" alt="avatar" />
                  <div v-if="isProfileEditMode">
                    <h6>Upload a different photo...</h6>
                    <input type="file" class="text-center center-block well well-sm" @change="fileUploadChange" />
                  </div>
                </div>
              </div>
              <!-- edit form column -->
              <div class="col-md-8 col-sm-6 col-xs-12 personal-info">

                <!-- Verify email alert -->
                <div class="alert alert-info alert-dismissable clearfix" v-if="!user.emailVerified">
                  <a class="panel-close close" data-dismiss="alert">×</a>
                  <i class="fa fa-coffee"></i>
                  Your Email is not verified!
                  <button @click="verifyEmail" class="btn btn-success pull-right">Verify Now</button>
                </div>

                <h3 class="text-left">
                  Personal info
                  <button @click="toggleProfileEdit" class="btn btn-link"><i class="glyphicon glyphicon-pencil"></i></button>
                </h3>

                <form class="form-horizontal" role="form" @submit.prevent="updateProfile">
                  <div class="form-group">
                    <label class="col-lg-1 control-label">Name</label>
                    <div class="col-lg-8">
                      <input class="form-control"  type="text" v-bind:disabled="!isProfileEditMode" v-model="profile.displayName" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-lg-1 control-label">Email:</label>
                    <div class="col-lg-8">
                      <input class="form-control" type="text" v-bind:disabled="!isProfileEditMode" v-model="profile.email" />
                    </div>
                  </div>
                  <div class="form-group" v-if="isProfileEditMode">
                    <div class="col-md-6 pull-right">
                      <input class="btn btn-primary" value="Save Changes" type="submit">
                      <span></span>
                      <input class="btn btn-default" value="Cancel" type="reset">
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import auth from '../firebase'

  export default {
    data () {
      return {
        user: this.$store.getters.user,
        isProfileEditMode: false,
        profile: {
          displayName: this.$store.getters.user.displayName,
          email: this.$store.getters.user.email,
          photoURL: this.$store.getters.user.photoURL,
          newPhoto: {
            file: {}
          }
        }
      }
    },
    created () {
      // console.log(auth.auth.currentUser)
    },
    methods: {
      fileUploadChange (e) {
        let file = e.target.files[0]
        this.profile.newPhoto.file = file
      },
      updateProfile () {
        let file = this.profile.newPhoto.file;
        auth.fileUpload(file, '/images', (err, res) => {
          if (err) {
            alert('Some error occurred!')
            console.log(err)
            return
          }
          this.profile.photoURL = res
          this.$store.dispatch('PROFILEUPDATE', this.profile)
        })
      },
      toggleProfileEdit () {
        this.isProfileEditMode = !this.isProfileEditMode
      },
      logout () {
        this.$store.dispatch('LOGOUT')
      },
      verifyEmail () {
        auth.verifyEmail((err, success) => {
          if (err) {
            alert(err)
            return
          }
          console.log(success)
        })
      }
    }
  }
</script>

<style type="text/css" media="screen">
  .p-0{
    padding: 0;
  }
  label{
    text-align: left;
    display: block;
  }
</style>
