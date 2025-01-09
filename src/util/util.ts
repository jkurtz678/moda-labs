
import type { FirestoreDocument, Plaque } from '@/types/types';
import { ElMessage } from 'element-plus'

export function showError(message: string) {
    ElMessage({ message: message, type: 'error', showClose: true, duration: 8000 });
}

export function isMobileBrowser(): Boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// deprecated: use getAdminEmailList
// returns list of allowed admins, these users can see each other's plaques and tokens
export function getAdminUserIDList(): string[] {
    const admin_user_id_list = [
        "0x9b75874f5313463011e22aDd4540d2b8A24e3958", // jackson
        "0xd8945d98ed4233Cf87cfA4fDCC7a54FE279E8ee7", // nathan
        "0x2ee434a49C4C5A254669d05E1602c656017bAC1f", // ryan
        "0x0599B2ddEF49E3Ef6b11a5969cBB9aDE7fA614dd", // genevieve?
        "0xEa53074F2972F2EE9C00410b127e107F29c7D4E3" // caroline
    ];

    return admin_user_id_list
}

// returns list of emails of admin users
export function getAdminEmailList(): string[] {
    return [
        "jkurtz678@gmail.com",
        "natemohler@ucla.edu",
        "natemohleriv@gmail.com",
        "ruben@eastsideled.com",
        "juliaschell@ucla.edu",
        "carolinepgluck@gmail.com",
        "contact.projekt.blank@gmail.com"
    ];
}

export function isPlaqueOnline(plaque: FirestoreDocument<Plaque>) {
    if(!plaque.entity.last_check_in_time) {
        return false;
      }
    
    
      const now = new Date();
      const last_check_in = plaque.entity.last_check_in_time.seconds
      const time_diff = (now.getTime()/1000) - last_check_in
      const hours_diff = time_diff / (60 * 60);
      return hours_diff < 2
}

export function isLocalStorageSupported(): boolean{
    try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        return true;
    } catch(e) {
        return false;
    }
}

export function mediaSizeDisplay(media_size: number) {
    const kb = 1000;
    const mb = kb * 1000;
    const gb = mb * 1000;
  
    if (media_size < kb) {
      return `${media_size} B`;
    } else if (media_size < mb) {
      return `${(media_size / kb).toFixed(2)} KB`;
    } else if (media_size < gb) {
      return `${(media_size / mb).toFixed(2)} MB`;
    } else {
      return `${(media_size / gb).toFixed(2)} GB`;
    }
}