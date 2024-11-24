import React from "react";
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

export default UserCard = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Profile Image */}
      <ImageBackground
        source={require("../assets/HuwTien.jpg")}
        style={styles.profileImage}
        imageStyle={{ borderRadius: 10 }}
      >
        <View style={styles.userInfo}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.userName}>HuwTien, 21</Text>
            <Icon
              name="shield-checkmark"
              size={30}
              style={{ color: "#0a92d6", marginTop: 6 }}
            />
          </View>
          <Text style={styles.userGender}>he/ his/ his</Text>
          <Text style={styles.userOccupation}>
            Studying: software engineering
          </Text>
        </View>
      </ImageBackground>

      {/* Location */}
      <View style={styles.locationContainer}>
        <Icon name="location-outline" size={20} color="#F47C7C" />
        <Text style={styles.locationText}>2.0 kilometers away</Text>
      </View>
      <Text style={styles.locationCity}>Go Vap, Ho Chi Minh city</Text>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About me</Text>
        <Text style={styles.sectionContent}>
          It would be wonderful to meet someone who appreciates the arts and
          enjoys exploring the vibrant culture of the city. I value
          open-mindedness, good communication, and a shared passion for
          classical music and fine arts. Also, mother of 2 cats ;)
        </Text>
      </View>

      {/* Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My details</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detail}>175 cm</Text>
          <Text style={styles.detail}>Non-smoker</Text>
          <Text style={styles.detail}>Cat lover</Text>
          <Text style={styles.detail}>Master degree</Text>
          <Text style={styles.detail}>Want two</Text>
          <Text style={styles.detail}>Occasionally</Text>
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
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="close" size={30} color="#F47C7C" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
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
