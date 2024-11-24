const usersData = [
  {
    id: 1,
    name: "HuwTien",
    age:"22",
    phoneNumber: "0386474751",
    image: require("../assets/HuwTien.jpg"),
    profileDetails: {
      occupation: "Engineer",
      gender: "Male",
      education: "Bachelor",
      location: "New York",
      height: "170cm",
      zodiac: "Aries",
      religion: "None",
    },
    messages: [
      {
        id: 1,
        content: "Hello!",
        sentAt: "2024-11-18T10:30:00Z",
        senderId: 1,  // ID của người gửi (HuwTien)
        receiverId: 2,  // ID của người nhận (Kio)
      },
      {
        id: 2,
        content: "Khưa khưa!",
        sentAt: "2024-11-18T10:31:00Z",
        senderId: 1,  // ID của người gửi (HuwTien)
        receiverId: 2,  // ID của người nhận (Kio)
      },
    ],
  },
  {
    id: 2,
    name: "Kio",
    age:"22",
    phoneNumber: "03",
    image: require("../assets/HuwTien2.jpg"),
    profileDetails: {
      occupation: "Designer",
      gender: "Female",
      education: "Master",
      location: "Los Angeles",
      height: "165cm",
      zodiac: "Taurus",
      religion: "Christianity",
    },
    messages: [
      {
        id: 1,
        content: "Hi there!",
        sentAt: "2024-10-18T11:00:00Z",
        senderId: 2,  // ID của người gửi (Kio)
        receiverId: 1,  // ID của người nhận (HuwTien)
      },
      {
        id: 2,  
        content: "Khưa khưa!",
        sentAt: "2024-10-18T11:01:00Z",
        senderId: 2,  // ID của người gửi (Kio)
        receiverId: 1,  // ID của người nhận (HuwTien)
      },
    ],
  },
  {
    id: 3,
    name: "HuwTienNe",
    age:"21",
    phoneNumber: "0386474752",
    image: require("../assets/HuwTien.jpg"),
    profileDetails: {
      occupation: "Engineer",
      gender: "Male",
      education: "Bachelor",
      location: "New York",
      height: "170cm",
      zodiac: "Aries",
      religion: "None",
    },
    messages: [
      {
        id: 1,
        content: "Hello!",
        sentAt: "2024-11-18T10:30:00Z",
        senderId: 1,  // ID của người gửi (HuwTien)
        receiverId: 2,  // ID của người nhận (Kio)
      },
    ],
  },
];

export default usersData;
