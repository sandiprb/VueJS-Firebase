<template>
  <div>
    Welcome <br/>
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
</template>

<script>
  import auth from '../firebase'

  export default {
    data () {
      return {

      }
    },
    methods: {
      fileUploadChange: function (e) {
        let file = e.target.files[0]
        auth.fileUpload(file, '/images', function (err, res) {
          if (err) {
            alert('Some error occurred!')
            console.log(err)
            return
          }
          console.log(res)
        })
      },
      logout: function () {
        auth.logout()
      }
    }
  }
</script>
