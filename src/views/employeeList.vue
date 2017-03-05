<template v-if="employees !== null">
  <div class="container">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Gender</th>
          <th>Email</th>
          <th>Department</th>
          <th>Join Date</th>
          <th class="text-center">Delete</th>
        </tr>
      </thead>
      <tbody v-if="employees">
        <tr v-for="employee in employeesComputed">
          <td>{{ employee.id }}</td>
          <td>{{ employee.first_name  + " " + employee.last_name}}</td>
          <td>{{ employee.gender }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.department }}</td>
          <td>{{ employee.join_date }}</td>
          <td class="text-center"> <span class="glyphicon glyphicon-trash cursor__pointer" @click="removeEmployee(employee)"></span></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    props: {
      employees: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        employeesComputed: []
      }
    },
    created: function () {
      this.employeesComputed = this.employees && this.employees.filter(Boolean)
    },
    watch: {},
    methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
