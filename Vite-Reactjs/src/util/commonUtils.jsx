import { Buffer } from 'buffer';
const commonUtil = {
    bufferToBase64: (buffer) => {
        const imageBuffer = Buffer.from(buffer);
        return `data:image/png;base64,${imageBuffer.toString('base64')}`;
    },
    convertBase64ToFile: (base64, filename) => {
        const arr = base64.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }
}
export default commonUtil;
