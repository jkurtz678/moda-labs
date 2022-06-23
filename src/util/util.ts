
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
        "0xd8945d98ed4233Cf87cfA4fDCC7a54FE279E8ee7", // nathan
        "0x2ee434a49C4C5A254669d05E1602c656017bAC1f", // ryan
        "0x0599B2ddEF49E3Ef6b11a5969cBB9aDE7fA614dd", // genevieve?
        "0xEa53074F2972F2EE9C00410b127e107F29c7D4E3" // caroline
    ];

    return admin_wallet_address_list
}