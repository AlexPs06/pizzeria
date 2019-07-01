import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyBSbLG168um753gJdmE-QItUU8EeWfE128",
  authDomain: "pizzeria-firebase.firebaseapp.com",
  databaseURL: "https://pizzeria-firebase.firebaseio.com",
  projectId: "pizzeria-firebase",
  storageBucket: "",
  messagingSenderId: "318527811974",
  appId: "1:318527811974:web:7324c62662f08bee"
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.usePublicVapidKey("BIzrnFVjacOco8ZzJ8DADw6WTNyFxBQzi5ZGAoErLP7XaLV_W2lTpfysydisEURPcPep1TfXbf8AW3U8Vdioh9c")
messaging.requestPermission().then(()=>{
  console.log("persmiso concedido")
  messaging.getToken().then((token)=>{
    console.log(token)
  });
}).catch((err)=>{
  console.log(err)
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
