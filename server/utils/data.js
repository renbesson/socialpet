const Pets = [
  {
    name: "Anna",
    email: "anna@gmail.com",
    password: "$2a$10$VM35l839cEbwR75FpMTu.OpDsFORU2go4vrs3xtOIsnGhOV87Bjwe",
    type: "Dog",
    species: "Dog",
    age: 2,
    location: "Moncton",
    avatar:
      "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTl8fHBldHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60 ",
  },
  {
    name: "Tibido",
    email: "tibz@gmail.com",
    password: "$2a$10$VM35l839cEbwR75FpMTu.OpDsFORU2go4vrs3xtOIsnGhOV87Bjwe",
    type: "Cat",
    species: "Cat",
    age: 2,
    location: "Outside Moncton",
    avatar:
      "https://images.unsplash.com/photo-1607923432848-62f872d16daf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODl8fHBldHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Jo",
    email: "jo@gmail.com",
    password: "$2a$10$VM35l839cEbwR75FpMTu.OpDsFORU2go4vrs3xtOIsnGhOV87Bjwe",
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
    ownerId: "643e082c2cacee0e5ce34a0a",
    mediaUrl:
      "https://images.unsplash.com/photo-1591608971376-46e64aa7fd19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjR8fHBldHN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60 ",
    content: "Amzaing",

    comments: " ",
  },
  {
    ownerId: "643bfebaaa3abb81f0911bcf",
    mediaUrl:
      "https://images.unsplash.com/photo-1560743173-567a3b5658b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODN8fHBldHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    content: "Nice one --> great stuff",

    comments: " ",
  },
  {
    ownerId: "643e082c2cacee0e5ce34a0b",
    mediaUrl:
      "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTd8fHBldHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    content: "Nice one --> great stuff",

    comments: " ",
  },
];

module.exports = { Pets, Posts };
