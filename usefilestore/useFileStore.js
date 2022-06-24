const useFileStore = (file, UPLOAD_PRESET, CLOUD_NAME) => {

    const FORM_DATA = new FormData();
    FORM_DATA.append("file", file);
    FORM_DATA.append("upload_preset", UPLOAD_PRESET);

    const CLOUD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  return { FORM_DATA, CLOUD_URL };
}

export default useFileStore;