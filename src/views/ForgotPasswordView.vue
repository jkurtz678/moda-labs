<template>
    <el-container style="display: flex; justify-content: center;">
        <el-card class="login-card" style="margin-top: 80px;">
            <template #header>
                <div class="card-header">
                    <span>Forgot Password</span>
                </div>
            </template>
            <el-form ref="form_ref" :model="form" :rules="rules" label-position="left" label-width="75px"
                @keyup.enter.native="submit(form_ref)">
                <div style="margin-bottom: 30px;">Enter your email address and we'll send you a link to reset your
                    password.</div>
                <el-form-item label="Email" prop="email">
                    <el-input v-model="form.email" type="email" />
                </el-form-item>
                <div style="display: flex; justify-content: space-between; margin-top: 30px;">
                    <el-button @click="submit(form_ref)" :loading="loading">Send Reset Password Email</el-button>
                    <el-button type="primary" link @click="router.push('login')">Return to Login</el-button>
                </div>
            </el-form>
        </el-card>
    </el-container>

</template>

<script lang="ts" setup>
import { showError } from '@/util/util';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { ref } from 'vue';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from "@/firebaseConfig";
import router from '@/router';

const loading = ref(false);
const rules = ref<FormRules>({
    email: [
        { required: true, message: "Please input your email", trigger: "blur" },
        { type: "email", message: "Please input a valid email", trigger: "blur" },
    ],
});

const form_ref = ref<FormInstance>();

interface ResetPasswordForm {
    email: string;
}

const form = ref<ResetPasswordForm>({
    email: ""
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
    const actionCodeSettings = {
        url: `${window.location.origin}/#/login`,
        handleCodeInApp: true
    };
    sendPasswordResetEmail(auth, form.value.email, actionCodeSettings).then(() => {
        ElMessage({
            type: 'success',
            message: 'Sent reset password email',
        })
    }).catch((error) => {
        showError(error.message);
    }).finally(() => {
        loading.value = false;
    });
}
</script>

<style scoped>
.login-card {
    max-width: 500px;
    padding-top: 20px;
    padding-bottom: 20px;
    border: 0px;
    margin-top: 80px;
    width: 400px;
}
</style>