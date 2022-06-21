
import { ElMessage } from 'element-plus'

export function showError(message: string) {
    ElMessage({ message: message, type: 'error', showClose: true, duration: 8000 });
}

export function isMobileBrowser(): Boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// returns list of allowed admins, these users can see each other's plaques and tokens
export function getAdminWalletAddressList(): string[] {
    const admin_wallet_address_list = [
        "0x9b75874f5313463011e22aDd4540d2b8A24e3958", // jackson
        "0xd8945d98ed4233Cf87cfA4fDCC7a54FE279E8ee7" // nathan
    ];

    return admin_wallet_address_list
}