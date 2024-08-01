
const cloudname=import.meta.env.VITE_CLOUD_NAME
const uploadset=import.meta.env.VITE_UPLOAD_PRESET
const uploadImageToCloudinary=async(file)=>{
 
    const uploadData=new FormData()
    uploadData.append('file',file)
    uploadData.append('upload_preset',uploadset)
    uploadData.append('cloud_name',cloudname)

    const res=await fetch(`https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,{
        method:'POST',
        body:uploadData
    })

    const data=await res.json()
    return data;
}

export default uploadImageToCloudinary