// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
const axios = require('axios');
//
//
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }


// Function to send a POST request
async function sendPostRequest() {
    const url = 'http://3.128.33.217:3000/retrieve'; // Replace with your actual endpoint
    const data = {
        username: 'Grandma',
        password: 'INeedHelp',
        email: 'startogaming12@gmail.com',
    };

    try {
      const response = await fetch(url, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
          // body: JSON.stringify(data),
      });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log('Response from server:', responseData);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the function to send the request
sendPostRequest();
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
