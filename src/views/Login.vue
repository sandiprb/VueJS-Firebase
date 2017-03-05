<template>
  <div class="container">
    <div class="row">
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
              <a href="#SignUp"  class="btn btn-link pull-right">New User? SignUp Here</a>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import toastr from 'toastr'

  export default {
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
    },
    methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
