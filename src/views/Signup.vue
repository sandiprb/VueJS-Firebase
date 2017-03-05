<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-4 col-sm-offset-4">
        <div class="panel panel-default">
          <div class="panel-heading">
            Sign Up
          </div>
          <div class="panel-body">
            <form action="" @submit.prevent="signup">
              <div class="form-group">
                <input type="text" placeholder="Name" class="form-control" required="required"
                title="Please enter your name" v-model="newUser.name" />
              </div>
              <div class="form-group">
                <input type="email" placeholder="Email" class="form-control" required="required"
                title="Please enter your email" v-model="newUser.email" />
              </div>
              <div class="form-group">
                <input type="password" placeholder="Enter six digit password" class="form-control" required="required"
                title="Please enter six digit password" v-model="newUser.pass" />
              </div>
              <input type="submit" value="Sign up" class="btn btn-primary btn-block" />
              <a href="#Login"  class="btn btn-link">Already Registered? Login Here</a>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import DB from '../firebase'

  export default {
    data () {
      return {
        newUser: {
          name: 'Sandip',
          email: 'baradiya.sandip@gmail.com',
          pass: '123456'
        },
        newFile: ''
      }
    },
    created: function () {
    },
    methods: {
      signup: function () {
        let user = {
          email: this.newUser.email,
          password: this.newUser.pass
        }
        DB.signUp(user, (err, res) => {
          if (err) {
            alert(err.message)
            console.log(err)
            return
          }
          console.log(res)
        })
      }
    }
  }
</script>
