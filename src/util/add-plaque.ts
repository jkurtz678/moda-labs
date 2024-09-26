import { getPlaqueByID, updatePlaque } from "@/api/plaque";
import { ElMessage, ElMessageBox } from "element-plus";

export async function addPlaqueToAccount(user_id: string, plaque_id: string): Promise<boolean> {
    const plaque = await getPlaqueByID(plaque_id).catch(err => {
        console.log("QrScan.onDecode error - ", err)
        ElMessage({ message: `Error adding loading plaque when trying to add - ${err}`, type: 'error', showClose: true, duration: 12000 });
    })

    if (!plaque) {
        return false;
    }

    const name = await ElMessageBox.prompt(`Give your plaque a name so you can remember it.`, 'Name your plaque', {
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel',
        inputPattern: /\S+/,
        inputErrorMessage: 'Name cannot be empty'
    }).then(res => {
        if (res.action === 'confirm') {
            return res.value
        }
    }).catch(err => {
        console.log("QrScan.onDecode error - ", err)
    })


    if(!name) {
        ElMessage({ message: `QR scan cancelled`, type: 'error', showClose: true, duration: 12000 });
        return false
    }

    plaque.entity.name = name;

    await updatePlaque(plaque_id, { user_id: user_id, name: plaque.entity.name }).then((plaque) => {
        ElMessage({ message: `Connected to plaque ${plaque.entity.name}`, type: 'success', showClose: true, duration: 6000 });
    }).catch(err => {
        ElMessage({ message: `Error adding account to plaque - ${err}`, type: 'error', showClose: true, duration: 12000 });
    })

    return true
}