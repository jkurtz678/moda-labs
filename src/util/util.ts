
import { ElMessage } from 'element-plus'

export function showError(message: string) {
    ElMessage({ message: message, type: 'error', showClose: true, duration: 8000 });
}

export function isMobileBrowser(): Boolean{
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}