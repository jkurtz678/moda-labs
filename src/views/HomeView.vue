<template>
  <el-container style="height: 100%">
    <el-header class="header">
      <div style="display: flex; align-items: center;">
        <h1 style="display: inline-flex;">MoDA</h1>
        <el-icon size="25px" style="margin-left: 10px">
          <UserFilled />
        </el-icon>
        <div style="flex-grow: 1"></div>
        <el-icon size="32px">
          <CirclePlus />
        </el-icon>
      </div>
      <el-tabs>
        <el-tab-pane label="Overview" name="first">User</el-tab-pane>
        <el-tab-pane label="Support" name="second">Support</el-tab-pane>
        <el-tab-pane label="Account" name="Third">Account</el-tab-pane>
      </el-tabs>
    </el-header>
    <el-main style="background-color: #DAD9D7;">
      <PlaqueList></PlaqueList>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
//import Header from '../components/Header.vue'
import PlaqueList from '../components/PlaqueList.vue'

</script>

<style scoped>
.header {
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 30px;
  padding-right: 30px;
  --el-header-height: 100px;
}

.el-main {
  --el-main-padding: 10px;
}

@media only screen and (max-width: 600px) {
  .el-main {
    text-align: center; 
  }
}
</style>
