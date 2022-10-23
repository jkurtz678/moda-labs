<template>
    <el-container style="display: flex; justify-content: center;">
        <el-card class="login-card">
            <template #header>
                <div class="card-header" style="display: inline-block">
                    <span>Sign Up For MoDA Labs</span>
                </div>

            </template>
            <el-form ref="form_ref" :model="form" :rules="rules" label-position="left" label-width="140px"
                @keyup.enter.native="submit(form_ref)">
                <el-form-item label="Username" prop="email">
                    <el-input v-model="form.email" />
                </el-form-item>
                <el-form-item label="Password" prop="password">
                    <el-input v-model="form.password" type="password" show-password />
                </el-form-item>
                <el-form-item label="Confirm Password" prop="confirm_password">
                    <el-input v-model="form.confirm_password" type="password" show-password />
                </el-form-item>
                <el-button @click="submit(form_ref)" color="#000000" :loading="loading" style="width: 100%">Sign Up
                </el-button>
                <div>
                    <el-button type="primary" link @click="router.push('login')" style="width: 100%; margin-top: 15px;">
                        Return to login</el-button>
                </div>
            </el-form>
        </el-card>
    </el-container>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { auth } from "@/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { showError } from "@/util/util";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from 'element-plus'
import { createAccount } from "@/api/account";
import type { Account } from "@/types/types";
import { useAccountStore } from "@/stores/account";
import { useRoute, useRouter } from "vue-router";

const account_store = useAccountStore();

const loading = ref(false);
const form_ref = ref<FormInstance>();
const router = useRouter();

const validatePass = (rule: any, value: any, callback: any) => {
    if (value != form.value.password) {
        return callback(new Error("Passwords do not match"));
    } else {
        callback();
    }
}
const rules = ref<FormRules>({
    email: [
        { required: true, message: "Please input your email", trigger: "blur" },
        { type: "email", message: "Please input a valid email", trigger: "blur" },
    ],
    password: [
        { required: true, message: "Please input your password", trigger: "blur" },
        { min: 6, message: "Password must be at least 6 characters", trigger: "blur" },
    ],
    confirm_password: [
        { required: true, message: "Please input your password", trigger: "blur" },
        { min: 6, message: "Password must be at least 6 characters", trigger: "blur" },
        { validator: validatePass, trigger: 'blur' },
    ],
});

interface SignUpForm {
    email: string;
    password: string;
    confirm_password: string;
}

const form = ref<SignUpForm>({
    email: "",
    password: "",
    confirm_password: "",
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

    // create firebase auth account
    loading.value = true;
    try {
        const user_credential = await createUserWithEmailAndPassword(auth, form.value.email, form.value.password)
        const account = await createAccount(user_credential.user.uid, { email: user_credential.user.email } as Partial<Account>)
        account_store.setAccount(account);
        ElMessage({
            type: 'success',
            message: 'Successfully created an account',
        })
        router.push({ name: "home" });
    } catch (err: any) {
        err.code === "auth/email-already-in-use" ? showError("Email already in use") : showError(err.message);
    } finally {
        loading.value = false;
    }
}

</script>

<style scoped>
.login-card {
    max-width: 500px;
    padding-top: 20px;
    padding-bottom: 20px;
    border: 0px;
    margin-top: 80px;
}
</style>