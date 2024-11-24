import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const ProfileCard = () => {
  return (
    <ImageBackground
      source={require("../assets/HuwTien.jpg")}
      style={styles.profileCard}
      imageStyle={{ borderRadius: 10 }}
    >
      <Text style={styles.instructionText}>Swipe right if you like</Text>
      <Text style={styles.instructionSubText}>
        If the person also swipes right on you, it’s a match and you can connect.
      </Text>

      <View style={styles.divider} />
      <Text style={styles.instructionText}>Swipe left to pass</Text>
      <Text style={styles.instructionSubText}>
        If the person is not your cup of tea, simply pass. It’s that easy!
      </Text>

      {/* User Info */}
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
        <Text style={styles.userOccupation}>Studying: software engineering</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  profileCard: {
    margin: 20,
    height: 630,
    borderRadius: 10,
    padding: 20,
    justifyContent: "center",
  },
  instructionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  instructionSubText: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    marginTop: 5,
  },
  divider: {
    height: 1,
    backgroundColor: "#fff",
    marginVertical: 10,
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
});

export default ProfileCard;
