// 图片压缩
export default async ({picUrl, imgWidth, imgHeight})=>{

    let newCanvas = document.createElement('canvas');
    let ctx = newCanvas.getContext('2d');
    let newImg = new Image();
    newImg.src = picUrl;

    try {
        await new Promise((resolve, reject) => {
            newImg.onload = resolve;
            newImg.onerror = reject;
        })
        //设置画布大小
        newCanvas.height = imgHeight;
        newCanvas.width = imgWidth;
        //画布初始化
        ctx.clearRect(0, 0, imgWidth, imgHeight);
        ctx.drawImage(newImg, 0, 0, imgWidth, imgHeight);
        return newCanvas.toDataURL(1);
    }
    catch (err) {
        alert(err);
    }
}



