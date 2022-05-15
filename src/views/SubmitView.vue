<template>
  <div class="submit">
    <h1>SUBMIT TO MODA ARCHIVES</h1>
    <el-form
      label-position="left"
      label-width="75px"
      style="max-width: 600px"
    >
      <el-form-item
        label="Name"
        style="max-width: 400px"
      >
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item
        label="Artist"
        style="max-width: 400px"
      >
        <el-input v-model="form.artist" />
      </el-form-item>
      <el-form-item label="Description">
        <el-input
          v-model="form.description "
          type="textarea"
        />
      </el-form-item>
      <el-form-item label="Public Link">
        <el-input v-model="form.public_link" />
      </el-form-item>
      <el-form-item>
        <el-button @click="submit(form)">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { createTokenMeta } from "@/api/token-meta";
import type { TokenMeta } from "@/types/types";
export default {
  data() {
    return {
      form: this.defaultForm()
    };
  },
  methods: {
    submit(token: TokenMeta) {
      createTokenMeta(token)
        .then((r) => {
          this.form = this.defaultForm();
          alert("Successfully submitted token");
        })
        .catch((err) => {
          alert(err);
        });
    },
    defaultForm() {
      return {
        name: "",
        artist: "",
        description: "",
        public_link: "",
      };
    }
  },
};
</script>

<style>
</style>
