// firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getMessaging  ,  getToken} from 'firebase/messaging'; 
import { getFirestore } from 'firebase/firestore';  

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgvhe8SFjfvLGakEN6ZFRD8qKrGvh7A9A",
  authDomain: "myclass-6cf84.firebaseapp.com",
  projectId: "myclass-6cf84",
  storageBucket: "myclass-6cf84.appspot.com",
  messagingSenderId: "520136229549",
  appId: "1:520136229549:web:73a8c2529e61a8aa817c24",
  measurementId: "G-6LXQP37V9P"
};



const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const messaging = getMessaging(app); 
const db = getFirestore(app);  
export { storage, messaging, db };


export const genarateToken = async()=>{

  const permisson =   await Notification.requestPermission();
  console.log(permisson);
  if(permisson === "granted")
  {
    const token = await  getToken(messaging, { vapidKey: 'BL4VlbgV3uxI7oYGQUTfy_lJHnpSvtRa6bFp4CoZcdWsjlZAvB2pxFNYeAKeQQZcSpEveof8HIMatrwecLstdtc' });
    console.log("message token: ",token);

  const response =   await fetch('http://localhost/api/alert/save-token' , {
      method: "POST",
      headers: {
       
        "Content-Type": "application/json",
      },
      body: JSON.stringify({token})
    },
   )
  if(!response.ok)
  {
    throw console.error("error something");
    
  }else{
    const data = await response.json();
    console.log(data);
    console.log(data.tokenId);
    sessionStorage.setItem('notifyToken' , data.tokenId);
  }

    
  }
}
