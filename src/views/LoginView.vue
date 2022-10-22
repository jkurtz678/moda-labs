<template>
    <el-container style="display: flex; align-items: center; flex-direction: column;">
        <el-card class="login-card" style="margin-top: 80px;">
            <template #header>
                <el-image :src="getImageUrl('logo.png')"
                    style="height: 170px; width: 170px; margin: auto; display: block;"></el-image>
                <div class="card-header">
                    <span>Login to MoDA Labs</span>
                </div>
            </template>
            <el-form ref="form_ref" :model="form" :rules="rules" label-position="left" label-width="110px"
                @keyup.enter.native="submit(form_ref)">
                <el-form-item label="Email" prop="email">
                    <el-input v-model="form.email" />
                </el-form-item>
                <el-form-item label="Password" prop="password">
                    <el-input v-model="form.password" type="password" />
                </el-form-item>
                <div style="display:flex; justify-content: space-between;">
                    <el-button @click="submit(form_ref)" :loading="loading">Login</el-button>
                    <el-button type="primary" link @click="router.push('forgot-password')">Forgot Password?</el-button>
                </div>
            </el-form>
        </el-card>
        <div style="margin-top: 20px;">Don't have an account?
            <el-button type="primary" link @click="router.push('sign-up')">
                Sign Up
            </el-button>
        </div>
    </el-container>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { auth } from "@/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { showError } from "@/util/util";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from "vue-router";

const loading = ref(false);
const form_ref = ref<FormInstance>();
const router = useRouter();
const route = useRoute();

const rules = ref<FormRules>({
    email: [
        { required: true, message: "Please input your email", trigger: "blur" },
        { type: "email", message: "Please input a valid email", trigger: "blur" },
    ],
    password: [
        { required: true, message: "Please input your password", trigger: "blur" },
        { min: 6, message: "Password must be at least 6 characters", trigger: "blur" },
    ],
});

interface LoginForm {
    email: string;
    password: string;
}

const form = ref<LoginForm>({
    email: "",
    password: "",
});

// load email from local storage on mounted
onMounted(() => {
    const email = localStorage.getItem("saved_email");
    if (email) {
        form.value.email = email;
    }
});

const submit = async (form_el: FormInstance | undefined) => {
    if (!form_el) {
        showError(`Error finding form element`);
        return;
    }
    const valid = await form_el.validate((v) => v);
    if (!valid) {
        return;
    }

    loading.value = true;
    signInWithEmailAndPassword(auth, form.value.email, form.value.password)
        .then((userCredential) => {

            localStorage.setItem("saved_email", form.value.email);
            if (route.query.redir && typeof route.query.redir === 'string') {
                window.location.assign(route.query.redir);
                return
            }
            router.push({ name: "home" });
        }).catch((error) => {
            if (error.code === 'auth/user-not-found') {
                ElMessage({
                    type: 'error',
                    message: 'User not found',
                })
            } else if (error.code === 'auth/wrong-password') {
                ElMessage({
                    type: 'error',
                    message: 'Wrong password',
                })
            } else {
                showError(error.message);
            }
        }).finally(() => {
            loading.value = false;
        });
}

const getImageUrl = (filename: string) => {
    return new URL(`../assets/${filename}`, import.meta.url).href
}

</script>

<style scoped>
.login-card {
    max-width: 500px;
    padding-top: 20px;
    padding-bottom: 20px;
    border: 0px;
    margin-top: 80px;
    min-width: 350px;
}
</style>