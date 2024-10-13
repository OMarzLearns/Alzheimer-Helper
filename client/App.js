const axios = require('axios');

function main() {

  // deleter();
  // createUser();
  // getUsers();
  // getUserById();
  // writeBook();
  sendEmail();
}

async function deleter() {
  try {
    const response = fetch('http://3.128.33.217:3000/deleteUsers', {
        method: 'POST',
    });
  } catch (error) {
      console.error('Error:', error);
  }
}

async function createUser() {
    const url = 'http://3.128.33.217:3000/signup'; // Replace with your actual endpoint
    var data = {
        username: 'Grandpa',
        password: 'password123',
        email: 'startogaming12@gmail.com',
        score: 50,
        subject: 'Grandpa Joe',
    };

    try {
      const response1 = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      });
      var data = {
          username: 'Grandma',
          password: 'password123',
          email: 'startogaming12@gmail.com',
          score: 80,
          subject: 'Grammie',
      };

      const response2 = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      });


        if (!response1.ok || !response2.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        // const responseData1 = await response1.json();
        // const responseData2 = await response2.json();
        console.log('Created users.');
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getUsers() {
    const url = 'http://3.128.33.217:3000/retrieve'; // Replace with your actual endpoint

    try {
      const response = await fetch(url, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
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

async function getUserById() {
    const url = 'http://3.128.33.217:3000/getId/1'; // Replace with your actual endpoint

    try {
      const response = await fetch(url, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
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

async function writeBook() {
    const url = 'http://3.128.33.217:3000/updateSum/1'; // Replace with your actual endpoint
    const data = {
        text: 'Today is Saturday. I brush my teeth, I made my bed, and I said hi to my neighbor, Jacob. I love my kids: Freddie, Monique, and Erin.'
    };

    try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        // const responseData = await JSON.parse(response.json());
        // console.log('Response from server:', responseData);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function sendEmail() {
    const url = 'http://3.128.33.217:3000/sendEmail/2'; // Replace with your actual endpoint
    const data = {
      email: 'startogaming12@gmail.com',
      score: 50,
      subject: 'Grandpa Joe',
        };

    try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        // const responseData = await JSON.parse(response.json());
        console.log('Sent email!');
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
