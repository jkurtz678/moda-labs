<template>
  <div class="submit">
    <h1>SUBMIT TO MODA ARCHIVES</h1>
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="75px"
      style="max-width: 600px"
    >
      <el-form-item
        label="Name"
        style="max-width: 400px"
        prop="name"
      >
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item
        label="Artist"
        style="max-width: 400px"
        prop="artist"
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
        <el-button @click="submit(formRef)">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { createTokenMeta } from "@/api/token-meta";
import type { TokenMeta } from "@/types/types";

const formRef = ref<FormInstance>();
const form = reactive<TokenMeta>({
  name: "",
  artist: "",
  description: "",
  public_link: "",
});
const rules = reactive<FormRules>({
  name: [{ required: true, message: "Required", trigger: "blur" }],
  artist: [{ required: true, message: "Required", trigger: "blur" }],
});

const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    console.log("SubmitView.vue Submit - formRef is null");
    return;
  }
  const valid = await formEl.validate((v) => v);
  if (!valid) {
    console.log("FORM NOT VALID");
    return;
  }
  createTokenMeta(form)
    .then((r) => {
      formEl.resetFields();
      alert("Successfully submitted token");
    })
    .catch((err) => {
      alert(err);
    });
};
</script>

<style>
</style>
