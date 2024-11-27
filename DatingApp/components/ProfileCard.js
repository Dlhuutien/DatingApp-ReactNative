import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { fetchUserData } from "../data/connectMockAPI";
import axios from 'axios';

export default UserCard = () => {
  const [usersData, setUsersData] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  // Tạo ref cho ScrollView
  const scrollViewRef = useRef(null);

  //Lấy DATA từ Redux
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    fetchUserData()
      .then((data) => {
        const filteredData = data.filter(
          (user) =>
            //Lọc user hiện tại
            user.id !== currentUser.id &&
            //Lọc user chưa matches với user hiện tại
            !user.matches.includes(currentUser.id)
        );
        setUsersData(filteredData);
      })
      .catch((error) => console.error("Failed to fetch users:", error));
  }, [currentUser.id]);

  // Hàm xử lý khi nhấn vào nút close
  const handleClose = () => {
    if (currentUserIndex < usersData.length - 1) {
      // Chuyển sang người dùng tiếp theo
      setCurrentUserIndex(currentUserIndex + 1);
    } else {
      // Quay lại người dùng đầu tiên khi hết danh sách
      setCurrentUserIndex(0);
    }
    // Cuộn lại đầu trang
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  // Nếu không có dữ liệu người dùng, hiển thị thông báo
  if (usersData.length === 0) {
    return <Text>Loading...</Text>;
  }

  // Lấy người dùng matches hiện tại
  const currentUserMatches = usersData[currentUserIndex];

  const handleMatch = async () => {
    try {
      // Cập nhật danh sách matches của currentUser
      const updatedCurrentUser = {
        ...currentUser,
        matches: [...currentUser.matches, currentUserMatches.id], 
        // Thêm currentUserMatches.id vào matches của currentUser
      };
  
      // Cập nhật danh sách matches của currentUserMatches
      const updatedCurrentUserMatches = {
        ...currentUserMatches,
        matches: [...currentUserMatches.matches, currentUser.id], 
      // Thêm currentUser.id vào matches của currentUserMatches
      };
  
      // Gửi yêu cầu PUT để cập nhật currentUser
      await axios.put(`https://6742e26fb7464b1c2a62f2eb.mockapi.io/User/${currentUser.id}`, updatedCurrentUser);
  
      // Gửi yêu cầu PUT để cập nhật currentUserMatches
      await axios.put(`https://6742e26fb7464b1c2a62f2eb.mockapi.io/User/${currentUserMatches.id}`, updatedCurrentUserMatches);
  
      // Chuyển sang currentUserMatch tiếp theo
      handleClose();
    } catch (error) {
      console.error("Error updating matches:", error);
    }
  };
  

  return (
    <ScrollView style={styles.container} ref={scrollViewRef}>
      {/* Profile Image */}
      <ImageBackground
        source={{ uri: currentUserMatches.image }}
        style={styles.profileImage}
        imageStyle={{ borderRadius: 10 }}
      >
        <View style={styles.userInfo}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.userName}>
              {currentUserMatches.name}, {currentUserMatches.age}
            </Text>
            <Icon
              name="shield-checkmark"
              size={30}
              style={{ color: "#0a92d6" }}
            />
          </View>
          <Text style={styles.userGender}>
            {currentUserMatches.profileDetails.gender}
          </Text>
          <Text style={styles.userOccupation}>
            {currentUserMatches.profileDetails.occupation}
          </Text>
        </View>
      </ImageBackground>

      {/* Location */}
      <View style={styles.locationContainer}>
        <Icon name="location-outline" size={20} color="#F47C7C" />
        <Text style={styles.locationText}>2.0 kilometers away</Text>
      </View>
      <Text style={styles.locationCity}>
        {currentUserMatches.profileDetails.location}
      </Text>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About me {currentUser.id}</Text>
        <Text style={styles.sectionContent}>
          {currentUserMatches.aboutMe || "This user has not added a bio."}
        </Text>
      </View>

      {/* Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My details</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detail}>
            {currentUserMatches.profileDetails.height}
          </Text>
          <Text style={styles.detail}>
            Zodiac: {currentUserMatches.profileDetails.zodiac}
          </Text>
          <Text style={styles.detail}>
            Zeligion: {currentUserMatches.profileDetails.religion}
          </Text>
        </View>
      </View>

      {/* Interest Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>I enjoy</Text>
        <View style={styles.interestsContainer}>
          <Text style={styles.interest}>Classical Music & Art</Text>
          <Text style={styles.interest}>Thriller Films</Text>
          <Text style={styles.interest}>Nature</Text>
          <Text style={styles.interest}>Baking</Text>
          <Text style={styles.interest}>Asian Food</Text>
          <Text style={styles.interest}>Mathematics & Technology</Text>
        </View>
      </View>

      {/* Languages Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>I communicate in</Text>
        <View style={styles.languagesContainer}>
          <Text style={styles.language}>English (Native)</Text>
          <Text style={styles.language}>Spanish (Fluent)</Text>
          <Text style={styles.language}>Tagalog (Verbal)</Text>
          <Text style={styles.language}>Mandarin Chinese (Verbal)</Text>
        </View>
      </View>

      {/* Photos Section */}
      <View style={styles.photosContainer}>
        <Image source={require("../assets/HuwTien.jpg")} style={styles.photo} />
        <Image source={require("../assets/HuwTien.jpg")} style={styles.photo} />
        <Image source={require("../assets/HuwTien.jpg")} style={styles.photo} />
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleClose}>
          <Icon name="close" size={30} color="#F47C7C" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleMatch}>
          <Icon name="checkmark" size={30} color="#4CAF50" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileImage: {
    height: 400,
    margin: 20,
    borderRadius: 10,
    justifyContent: "flex-end",
  },
  userInfo: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  userGender: {
    fontSize: 14,
    color: "purple",
    backgroundColor: "#95ccdc",
    padding: 5,
    borderRadius: 10,
    marginRight: 150,
  },
  userOccupation: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  locationText: {
    color: "#F47C7C",
    marginLeft: 5,
  },
  locationCity: {
    textAlign: "center",
    color: "#00C4CC",
    fontSize: 16,
  },
  section: {
    margin: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionContent: {
    fontSize: 14,
    marginTop: 5,
  },
  detailsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  detail: {
    backgroundColor: "#e0f7fa",
    padding: 5,
    margin: 5,
    borderRadius: 10,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  interest: {
    backgroundColor: "#e0f7fa",
    padding: 5,
    margin: 5,
    borderRadius: 10,
  },
  languagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  language: {
    backgroundColor: "#e0f7fa",
    padding: 5,
    margin: 5,
    borderRadius: 10,
  },
  photosContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
  },
  actionButton: {
    width: 60,
    height: 60,
    backgroundColor: "#f0f0f0",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
