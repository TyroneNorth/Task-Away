// user utility files.

// User ID generation
//Unique ID based on name and random digitis associated with time of creation

function generateUserId(name) {
  var date = new Date();
  var time = date.getTime();
  var random = Math.floor(Math.random() * 1000000);
  var userId = name + time + random;
  return userId;
}

// Timestamp generation
function createdDateTime() {
  var date = new Date();
  var time = date.getTime();
  return time;
}

usersData = {
  users: [
    {
      uid: generateUserId('Leonne John'),
      name: 'Leonne John',
      username: 'leonnejohn',
      email: 'Leonne.John@imail.com',
      password: 'testPasword! ',
      phone: '+1 (917) 544-3222',
      image: 'https://s3.amazonaws.com/uifaces/faces/twitter/kolage/128.jpg',
      List: [
        {
          id: 1,
          listLabel: 'Shopping List',
          listItems: [
            {
              id: 1,
              itemLabel: 'Milk',
              itemDescription: '2%',
              itemDone: false,
              itemStarred: false,
              createdDateTime: createdDateTime(),
              updatedDateTime: createdDateTime(),
              completedDateTime: createdDateTime(),
            },
            {
              id: 2,
              itemLabel: 'Bread',
              itemDescription: '1 slice',
              itemDone: false,
              itemStarred: false,
              createdDateTime: createdDateTime(),
              updatedDateTime: createdDateTime(),
              completedDateTime: createdDateTime(),
            },
          ],
        },
      ],
    },
    {
      uid: generateUserId('John Doe'),
      name: 'John Doe',
      username: 'johndoe',
      email: 'Jo0hn.Doe@imail.com',
      password: 'testPasword! ',
      phone: '+1 (917) 544-3222',
      image: 'https://s3.amazonaws.com/uifaces/faces/twitter/kolage/128.jpg',
      List: [
        {
          id: 1,
          listLabel: 'Shopping List',
          listItems: [
            {
              id: 1,
              itemLabel: 'Milk',
              itemDescription: '2%',
              itemDone: false,
              itemStarred: false,
              createdDateTime: createdDateTime(),
              updatedDateTime: createdDateTime(),
              completedDateTime: createdDateTime(),
            },
          ],
        },
      ],
    },
  ],
};

//usersData to json
var usersDataJson = JSON.stringify(usersData);
//export to json file
fs.writeFileSync('db/users.json', usersDataJson);
