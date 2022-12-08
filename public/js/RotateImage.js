/**
* Rotates rgba-Image
* @param {ImageData} imageData
* @param {Number} angle
* @return {ImageData} rotatedArray
*/

export function rotateImage(imageData,angle){
    const validAngles = [0,90,180,270,360,-90,-180,-270]
    let rotatedArray
    const anglePresent = validAngles.includes(angle)
    if(validAngles.includes(angle)){
        if(angle === 90 || angle === -270){
            rotatedArray = rotate90(imageData)
        }else if(angle === 180 || angle === -180){
            let rotated90 = rotate90(imageData)
            rotatedArray = rotate90(rotated90)
        }else if(angle === -90 || angle === 270){
            let rotated901 = rotate90(imageData)
            let rotated180 = rotate90(rotated901)
            rotatedArray = rotate90(rotated180)
        }else{
            rotatedArray = convertArrayToImageData(imageData.data,imageData.width)
        }
        return rotatedArray
    }else{
        console.log("Invalid Angle.Angle must be any of these values"+validAngles)
    }
}

/**
* Displays Rotated Image on Canvas rgba-Image
* @param {ImageData} imageData
*/

export function displayRoatedImage(imageData){
    const rotatedImageCanvas = document.getElementById('rotatedImage')
    const rotatedCTX = rotatedImageCanvas.getContext('2d');
    rotatedCTX.putImageData(imageData,20, 20)
}

/**
* Creates an rgba-image
* @param {ImageData} imageData
*/

  export function createImage(width,height){
    const canvas = document.getElementById("canvas");
    console.log(canvas);
    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(width, height);

     // Fill the array with RGBA values
     for (let i = 0; i < imageData.data.length; i += 4) {
        // Percentage in the x direction, times 255
        let x = (i % (4*width)) / (4*height) * 255;
        // Percentage in the y direction, times 255
        let y = Math.ceil(i / (4*width)) / height * 255;
    
        // Modify pixel data
        imageData.data[i + 0] = x;        // R value
        imageData.data[i + 1] = y;        // G value
        imageData.data[i + 2] = 255 - x;  // B value
        imageData.data[i + 3] = 255;      // A value
    }
    console.log(imageData);
    ctx.putImageData(imageData, 20, 20);
    return imageData
  }

/**
* Rotates the image to 90 degree
* @param {ImageData} imageData
* @return {ImageData} rotatedImageData
*/
export function rotate90(imageData) {
    const width = imageData.width
    const height = imageData.height
    const rotatedArray = []
    for (let x = 0; x < width; x += 1) {
        for (let y = height - 1; y >= 0; y -= 1) {
            const index = ( x + y * width ) * 4
            rotatedArray.push(imageData["data"][index])
            rotatedArray.push(imageData["data"][index + 1])
            rotatedArray.push(imageData["data"][index + 2])
            rotatedArray.push(imageData["data"][index + 3])
        }
    }
    const rotatedImageData = convertArrayToImageData(rotatedArray,height,width)
    return rotatedImageData   
}

/**
* Converts Array to image data
* @param {Array} rotatedArray
* @param {width} width
* @param {height} height
* @return {ImageData} rotatedImageData
*/

export function convertArrayToImageData(rotatedArray, width,height){
    const arr =  new Uint8ClampedArray(rotatedArray)
    const rotatedImageData = new ImageData(arr,width,height);
    return rotatedImageData
}