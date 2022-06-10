
import { ElMessage } from 'element-plus'

export function showError(message: string) {
    ElMessage({ message: message, type: 'error', showClose: true, duration: 8000 });
}