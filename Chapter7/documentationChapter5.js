//Challenge Chapter 5
//John Tri Putra Sihombing
//Binar Academy X Kampus Merdeka
const { Collection, Item, Header } = require("postman-collection");
const fs = require("fs");

// create collection
const postmanCollection = new Collection({
  info: {
    name: "Dokumentasi API",
  },
  item: [],
});

//register user game
const postmanRequestRegister = new Item({
  name: "Register User Game",
  request: {
    header: {
      "Content-type": "application/json",
    },
    url: "http://localhost:3000/users/auth/register",
    method: "POST",
    body: {
      mode: "raw",
      raw: JSON.stringify({
        username: "binaracademy42",
        password: "binar123",
      }),
    },
    auth: null,
  },
});

//login user game
const postmanRequestLogin = new Item({
  name: "Login User Game",
  request: {
    header: {
      "Content-type": "application/json",
    },
    url: "http://localhost:3000/users/auth/login",
    method: "POST",
    body: {
      mode: "raw",
      raw: JSON.stringify({
        username: "binaracademy42",
        password: "binar123",
      }),
    },
    auth: null,
  },
});

//Show User Game
const postmanShowUser = new Item({
  name: "Show User Game",
  request: {
    header: {
      "Content-type": "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInVzZXJuYW1lIjoiam9obnNpaG9tYmluZyIsInBhc3N3b3JkIjoiJDJiJDEwJEtLV25JbDRZR2I3TTFnVGdhbjVYNU9FdTM2LmZJTkR1MzJ4amViYnRONkJlUlkwb2pmQi5TIiwiaWF0IjoxNjY0OTM3NTI2fQ.0n6g-A_tolPKniZyMaIJ2Hgyw-M8VC2qdRsiuxcdxBU",
    },
    url: "http://localhost:3000/users/show",
    method: "GET",
    auth: null,
  },
});

//Show User Game By Id
const postmanShowUserById = new Item({
  name: "Show User Game By Id",
  request: {
    header: {
      "Content-type": "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInVzZXJuYW1lIjoiam9obnNpaG9tYmluZyIsInBhc3N3b3JkIjoiJDJiJDEwJEtLV25JbDRZR2I3TTFnVGdhbjVYNU9FdTM2LmZJTkR1MzJ4amViYnRONkJlUlkwb2pmQi5TIiwiaWF0IjoxNjY0OTM3NTI2fQ.0n6g-A_tolPKniZyMaIJ2Hgyw-M8VC2qdRsiuxcdxBU",
    },
    url: "http://localhost:3000/users/show/1",
    method: "GET",
    auth: null,
  },
});

//Update user game by id
const postmanUpdateUser = new Item({
  name: "Update User",
  request: {
    header: {
      "Content-type": "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInVzZXJuYW1lIjoiam9obnNpaG9tYmluZyIsInBhc3N3b3JkIjoiJDJiJDEwJEtLV25JbDRZR2I3TTFnVGdhbjVYNU9FdTM2LmZJTkR1MzJ4amViYnRONkJlUlkwb2pmQi5TIiwiaWF0IjoxNjY0OTM3NTI2fQ.0n6g-A_tolPKniZyMaIJ2Hgyw-M8VC2qdRsiuxcdxBU",
    },
    url: "http://localhost:3000/users/update/1",
    method: "POST",
    body: {
      mode: "raw",
      raw: JSON.stringify({
        username: "johnsihombing123",
        password: "sihombinggg123",
      }),
    },
    auth: null,
  },
});

//delete user game
const postmanDeleteUser = new Item({
  name: "Delete User",
  request: {
    header: {
      "Content-type": "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInVzZXJuYW1lIjoiam9obnNpaG9tYmluZyIsInBhc3N3b3JkIjoiJDJiJDEwJEtLV25JbDRZR2I3TTFnVGdhbjVYNU9FdTM2LmZJTkR1MzJ4amViYnRONkJlUlkwb2pmQi5TIiwiaWF0IjoxNjY0OTM3NTI2fQ.0n6g-A_tolPKniZyMaIJ2Hgyw-M8VC2qdRsiuxcdxBU",
    },
    url: "http://localhost:3000/users/delete/1",
    method: "DELETE",
    body: {
      mode: "raw",
      raw: JSON.stringify({
        id: "value id",
      }),
    },
    auth: null,
  },
});

//create user biodata
const postmanCreateBiodata = new Item({
  name: "Create User Biodata",
  request: {
    header: {
      "Content-type": "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInVzZXJuYW1lIjoiam9obnNpaG9tYmluZyIsInBhc3N3b3JkIjoiJDJiJDEwJEtLV25JbDRZR2I3TTFnVGdhbjVYNU9FdTM2LmZJTkR1MzJ4amViYnRONkJlUlkwb2pmQi5TIiwiaWF0IjoxNjY0OTM3NTI2fQ.0n6g-A_tolPKniZyMaIJ2Hgyw-M8VC2qdRsiuxcdxBU",
    },
    url: "http://localhost:3000/biodata/create",
    method: "POST",
    body: {
      mode: "raw",
      raw: JSON.stringify({
        id_user: 10,
        name: "John Tri Sihombing",
        email: "sihombing42@gmail.com",
        address: "Medan",
        phone: "08534333999",
      }),
    },
    auth: null,
  },
});

//show user biodata
const postmanShowBiodata = new Item({
  name: "Show User Biodata",
  request: {
    header: {
      "Content-type": "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInVzZXJuYW1lIjoiam9obnNpaG9tYmluZyIsInBhc3N3b3JkIjoiJDJiJDEwJEtLV25JbDRZR2I3TTFnVGdhbjVYNU9FdTM2LmZJTkR1MzJ4amViYnRONkJlUlkwb2pmQi5TIiwiaWF0IjoxNjY0OTM3NTI2fQ.0n6g-A_tolPKniZyMaIJ2Hgyw-M8VC2qdRsiuxcdxBU",
    },
    url: "http://localhost:3000/biodata/show",
    method: "GET",
    auth: null,
  },
});

//show user biodata by id
const postmanShowBiodataByid = new Item({
  name: "Show User Biodata By Id",
  request: {
    header: {
      "Content-type": "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInVzZXJuYW1lIjoiam9obnNpaG9tYmluZyIsInBhc3N3b3JkIjoiJDJiJDEwJEtLV25JbDRZR2I3TTFnVGdhbjVYNU9FdTM2LmZJTkR1MzJ4amViYnRONkJlUlkwb2pmQi5TIiwiaWF0IjoxNjY0OTM3NTI2fQ.0n6g-A_tolPKniZyMaIJ2Hgyw-M8VC2qdRsiuxcdxBU",
    },
    url: "http://localhost:3000/biodata/show/2",
    method: "GET",
    auth: null,
  },
});

//update user biodata
const postmanUpdateUserBiodata = new Item({
  name: "Update User Biodata",
  request: {
    header: {
      "Content-type": "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInVzZXJuYW1lIjoiam9obnNpaG9tYmluZyIsInBhc3N3b3JkIjoiJDJiJDEwJEtLV25JbDRZR2I3TTFnVGdhbjVYNU9FdTM2LmZJTkR1MzJ4amViYnRONkJlUlkwb2pmQi5TIiwiaWF0IjoxNjY0OTM3NTI2fQ.0n6g-A_tolPKniZyMaIJ2Hgyw-M8VC2qdRsiuxcdxBU",
    },
    url: "http://localhost:3000/biodata/update/1",
    method: "PATCH",
    body: {
      mode: "raw",
      raw: JSON.stringify({
        id_user: 10,
        name: "John Sihombing",
        email: "sihombing4242@gmail.com",
        address: "Kota Medan",
        phone: "08534333999",
      }),
    },
    auth: null,
  },
});

//delete user biodata
const postmanDeleteUserBiodata = new Item({
  name: "Delete User Biodata",
  request: {
    header: {
      "Content-type": "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInVzZXJuYW1lIjoiam9obnNpaG9tYmluZyIsInBhc3N3b3JkIjoiJDJiJDEwJEtLV25JbDRZR2I3TTFnVGdhbjVYNU9FdTM2LmZJTkR1MzJ4amViYnRONkJlUlkwb2pmQi5TIiwiaWF0IjoxNjY0OTM3NTI2fQ.0n6g-A_tolPKniZyMaIJ2Hgyw-M8VC2qdRsiuxcdxBU",
    },
    url: "http://localhost:3000/biodata/delete/1",
    method: "DELETE",
    body: {
      mode: "raw",
      raw: JSON.stringify({
        id: "value id",
      }),
    },
    auth: null,
  },
});

//create user history
const postmanCreateUserHistory = new Item({
  name: "Create User History",
  request: {
    header: {
      "Content-type": "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInVzZXJuYW1lIjoiam9obnNpaG9tYmluZyIsInBhc3N3b3JkIjoiJDJiJDEwJEtLV25JbDRZR2I3TTFnVGdhbjVYNU9FdTM2LmZJTkR1MzJ4amViYnRONkJlUlkwb2pmQi5TIiwiaWF0IjoxNjY0OTM3NTI2fQ.0n6g-A_tolPKniZyMaIJ2Hgyw-M8VC2qdRsiuxcdxBU",
    },
    url: "http://localhost:3000/history/create",
    method: "POST",
    body: {
      mode: "raw",
      raw: JSON.stringify({
        id_user: 10,
        time_list: 100,
        score: 120,
      }),
    },
    auth: null,
  },
});

//show user history
const postmanShowUserHistory = new Item({
  name: "Show User History",
  request: {
    header: {
      "Content-type": "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInVzZXJuYW1lIjoiam9obnNpaG9tYmluZyIsInBhc3N3b3JkIjoiJDJiJDEwJEtLV25JbDRZR2I3TTFnVGdhbjVYNU9FdTM2LmZJTkR1MzJ4amViYnRONkJlUlkwb2pmQi5TIiwiaWF0IjoxNjY0OTM3NTI2fQ.0n6g-A_tolPKniZyMaIJ2Hgyw-M8VC2qdRsiuxcdxBU",
    },
    url: "http://localhost:3000/history/show",
    method: "GET",
    auth: null,
  },
});

//show user history by id
const postmanShowUserHistoryByid = new Item({
  name: "Show User History By Id",
  request: {
    header: {
      "Content-type": "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInVzZXJuYW1lIjoiam9obnNpaG9tYmluZyIsInBhc3N3b3JkIjoiJDJiJDEwJEtLV25JbDRZR2I3TTFnVGdhbjVYNU9FdTM2LmZJTkR1MzJ4amViYnRONkJlUlkwb2pmQi5TIiwiaWF0IjoxNjY0OTM3NTI2fQ.0n6g-A_tolPKniZyMaIJ2Hgyw-M8VC2qdRsiuxcdxBU",
    },
    url: "http://localhost:3000/history/show/10",
    method: "GET",
    auth: null,
  },
});

//update user history
const postmanUpdateUserHistory = new Item({
  name: "Update User History",
  request: {
    header: {
      "Content-type": "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInVzZXJuYW1lIjoiam9obnNpaG9tYmluZyIsInBhc3N3b3JkIjoiJDJiJDEwJEtLV25JbDRZR2I3TTFnVGdhbjVYNU9FdTM2LmZJTkR1MzJ4amViYnRONkJlUlkwb2pmQi5TIiwiaWF0IjoxNjY0OTM3NTI2fQ.0n6g-A_tolPKniZyMaIJ2Hgyw-M8VC2qdRsiuxcdxBU",
    },
    url: "http://localhost:3000/history/update/10",
    method: "PATCH",
    body: {
      mode: "raw",
      raw: JSON.stringify({
        id_user: 11,
        time_list: 130,
        score: 150,
      }),
    },
    auth: null,
  },
});

const postmanDeleteUserHistory = new Item({
  name: "Delete User History",
  request: {
    header: {
      "Content-type": "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInVzZXJuYW1lIjoiam9obnNpaG9tYmluZyIsInBhc3N3b3JkIjoiJDJiJDEwJEtLV25JbDRZR2I3TTFnVGdhbjVYNU9FdTM2LmZJTkR1MzJ4amViYnRONkJlUlkwb2pmQi5TIiwiaWF0IjoxNjY0OTM3NTI2fQ.0n6g-A_tolPKniZyMaIJ2Hgyw-M8VC2qdRsiuxcdxBU",
    },
    url: "http://localhost:3000/history/delete/1",
    method: "DELETE",
    body: {
      mode: "raw",
      raw: JSON.stringify({
        id: "value id",
      }),
    },
    auth: null,
  },
});

//user game
postmanCollection.items.add(postmanRequestRegister);
postmanCollection.items.add(postmanRequestLogin);
postmanCollection.items.add(postmanShowUser);
postmanCollection.items.add(postmanShowUserById);
postmanCollection.items.add(postmanUpdateUser);
postmanCollection.items.add(postmanDeleteUser);

//biodata
postmanCollection.items.add(postmanCreateBiodata);
postmanCollection.items.add(postmanShowBiodata);
postmanCollection.items.add(postmanShowBiodataByid);
postmanCollection.items.add(postmanUpdateUserBiodata);
postmanCollection.items.add(postmanDeleteUserBiodata);

//history
postmanCollection.items.add(postmanCreateUserHistory);
postmanCollection.items.add(postmanShowUserHistory);
postmanCollection.items.add(postmanShowUserHistoryByid);
postmanCollection.items.add(postmanUpdateUserHistory);
postmanCollection.items.add(postmanDeleteUserHistory);

// convert to json
const collectionJSON = postmanCollection.toJSON();

//export to file
fs.writeFile("./collection.json", JSON.stringify(collectionJSON), (err) => {
  if (err) console.log(err);
  console.log("file saved");
});
