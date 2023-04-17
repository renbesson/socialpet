const Pets = [
  {
    _id: {
      $oid: "643bfddfaa3abb81f0911bcd",
    },
    name: "Anna",
    email: "anna@gmail.com",
    type: "Dog",
    species: "Dog",
    age: 2,
    location: "Moncton",
    avatar:
      "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTl8fHBldHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60 ",
  },
  {
    _id: {
      $oid: "643bfe67aa3abb81f0911bce",
    },
    name: "Tibido",
    email: "tibz@gmail.com",
    type: "Cat",
    species: "Cat",
    age: 2,
    location: "Outside Moncton",
    avatar:
      "https://images.unsplash.com/photo-1607923432848-62f872d16daf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODl8fHBldHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
  {
    _id: {
      $oid: "643bfebaaa3abb81f0911bcf",
    },
    name: "Jo",
    email: "jo@gmail.com",
    type: "fish",
    species: "Dog",
    age: 5,
    location: "Halfiax",
    avatar:
      "https://images.unsplash.com/photo-1591608971376-46e64aa7fd19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjR8fHBldHN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60 ",
  },
];

const Posts = [
  {
    _id: {
      $oid: "643c009daa3abb81f0911bd0",
    },
    ownerId: "643bfddfaa3abb81f0911bcd",
    mediaUrl:
      "https://images.unsplash.com/photo-1591608971376-46e64aa7fd19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjR8fHBldHN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60 ",
    content: "Amzaing",
    likedBy: "643bfe67aa3abb81f0911bce",
    comments: " ",
  },
  {
    _id: {
      $oid: "643c05a6aa3abb81f0911bd1",
    },
    ownerId: "643bfebaaa3abb81f0911bcf",
    mediaUrl:
      "https://images.unsplash.com/photo-1560743173-567a3b5658b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODN8fHBldHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    content: "Nice one --> great stuff",
    likedBy: "643bfe67aa3abb81f0911bce",
    comments: " ",
  },
  {
    _id: {
      $oid: "643c23f6aa3abb81f0911bd2",
    },
    ownerId: "643bfe67aa3abb81f0911bce",
    mediaUrl:
      "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTd8fHBldHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    content: "Nice one --> great stuff",
    likedBy: "643bfe67aa3abb81f0911bce",
    comments: " ",
  },
];

// module.exports = { Pets, Posts };
module.exports = { Pets, Posts };
