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
import axios from "axios";
import IconMaterial from "react-native-vector-icons/MaterialIcons";
import { useTranslation } from "react-i18next";
import { calculateAge } from "./redux/calculateAge";

export default MatchCard = () => {
  const [usersData, setUsersData] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const { t } = useTranslation();

  // Tạo ref cho ScrollView
  const scrollViewRef = useRef(null);

  //Lấy DATA từ Redux
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    fetchUserData()
      .then((data) => {
        const filteredData = data.filter(
          (user) =>
            // Loại user hiện tại
            user.id !== currentUser.id &&
            // Loại user đã matches với user hiện tại
            !currentUser.matches.includes(user.id) &&
            // Kiểm tra user có matchWait chứa id của user hiện tại
            user.matchWait.includes(currentUser.id)
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
    return <Text style={{alignItems:"center", justifyContent:"center", marginHorizontal:25, textAlign:"center"}}>{t("Be proactive in finding people who are compatible with you")}</Text>;
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
      await axios.put(
        `https://6742e26fb7464b1c2a62f2eb.mockapi.io/User/${currentUser.id}`,
        updatedCurrentUser
      );

      // Gửi yêu cầu PUT để cập nhật currentUserMatches
      await axios.put(
        `https://6742e26fb7464b1c2a62f2eb.mockapi.io/User/${currentUserMatches.id}`,
        updatedCurrentUserMatches
      );

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
              {currentUserMatches.name}, {calculateAge(currentUserMatches.age)}
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
      {/* <View style={styles.locationContainer}>
        <Icon name="location-outline" size={20} color="#F47C7C" />
        <Text style={styles.locationText}>2.0 kilometers away</Text>
      </View> */}
      <Text style={styles.locationCity}>
        {currentUserMatches.profileDetails.location}
      </Text>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t("About me")}</Text>
        <Text style={styles.sectionContent}>
          {currentUserMatches.profileDetails.aboutMe ||
            t("This user has not added a bio.")}
        </Text>
      </View>

      {/* Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t("My details")}</Text>
        <View style={styles.detailsContainer}>
          {currentUserMatches.profileDetails.height && (
            <View style={styles.detail}>
              <IconMaterial name="straighten" size={25} />
              <Text>{currentUserMatches.profileDetails.height}</Text>
            </View>
          )}

          {currentUserMatches.profileDetails.education && (
            <View style={styles.detail}>
              <IconMaterial name="school" size={25} />
              <Text>{currentUserMatches.profileDetails.education}</Text>
            </View>
          )}

          {currentUserMatches.profileDetails.zodiac && (
            <View style={styles.detail}>
              <Icon name="sparkles-outline" size={25} />
              <Text>Zodiac: {currentUserMatches.profileDetails.zodiac}</Text>
            </View>
          )}

          {currentUserMatches.profileDetails.religion && (
            <View style={styles.detail}>
              <IconMaterial name="church" size={25} />
              <Text>
                Religion: {currentUserMatches.profileDetails.religion}
              </Text>
            </View>
          )}

          {currentUserMatches.profileDetails.smoking && (
            <View style={styles.detail}>
              <IconMaterial
                name="smoking-rooms"
                size={25}
                style={{ marginBottom: 5 }}
              />
              <Text>{currentUserMatches.profileDetails.smoking}</Text>
            </View>
          )}

          {currentUserMatches.profileDetails.pets && (
            <View style={styles.detail}>
              <Icon name="paw-outline" size={20} />
              <Text>{currentUserMatches.profileDetails.pets} lover</Text>
            </View>
          )}

          {currentUserMatches.profileDetails.children && (
            <View style={styles.detail}>
              <IconMaterial name="child-friendly" size={25} />
              <Text>{currentUserMatches.profileDetails.children}</Text>
            </View>
          )}

          {currentUserMatches.profileDetails.drinking && (
            <View style={styles.detail}>
              <IconMaterial name="local-drink" size={25} />
              <Text>{currentUserMatches.profileDetails.drinking}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Interest Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t("I enjoy")}</Text>
        <View style={styles.interestsContainer}>
          {currentUserMatches.profileDetails.enjoyments &&
            currentUserMatches.profileDetails.enjoyments.map(
              (enjoyment, index) => (
                <Text key={index} style={styles.interest}>
                  {enjoyment}
                </Text>
              )
            )}
        </View>
      </View>

      {/* Languages Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t("I communicate in")}</Text>
        <View style={styles.interestsContainer}>
          {currentUserMatches.profileDetails.communicates &&
            currentUserMatches.profileDetails.communicates.map(
              (communicate, index) => (
                <Text key={index} style={styles.interest}>
                  {communicate}
                </Text>
              )
            )}
        </View>
      </View>

      {/* Photos Section */}
      <View style={styles.photosContainer}>
        <Image source={{uri : currentUserMatches.image}} style={styles.photo} />
        <Image source={{uri : currentUserMatches.image}} style={styles.photo} />
        <Image source={{uri : currentUserMatches.image}} style={styles.photo} />
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
    width: 350,
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
    flexDirection: "row", // Đặt chiều ngang cho các phần tử con
    alignItems: "center", // Căn giữa theo chiều dọc
    justifyContent: "center", // Căn giữa theo chiều ngang
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
