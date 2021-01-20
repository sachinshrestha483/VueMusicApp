import { ref } from "vue";
import { projectStorage } from "../firebase/config";
import getUser from "./getUser";

const { user } = getUser();

const useStorage = () => {
  const error = ref(null);
  const url = ref(null);
  const filePath = ref(null);

  const uploadImage = async (file) => {
    filePath.value = `covers/${user.value.uid}/${file.name}`; // setting where to store it ....
    const storageRef = projectStorage.ref(filePath.value);

    try {
      const res = await storageRef.put(file);

      url.value = await res.ref.getDownloadURL();

      // if not use await  here then we wiuld be in the trouble  as it is also an asynchronous task
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  const deleteImage = async (path) => {
    // get ref to storage
    const storageRef = projectStorage.ref(path);

    try {
      storageRef.delete();
    } catch (err) {
        console.log(err.message);
      error.value = err.message;
    }
  };

  return { url, filePath, error, uploadImage, deleteImage };
};

export default useStorage;
