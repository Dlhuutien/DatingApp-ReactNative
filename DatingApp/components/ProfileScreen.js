import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import ProfileCard from "./ProfileCard";
import SubscriptionCard from "./SubscriptionCard";
import ChatCard from "./ChatCard";

const ProfileScreen = () => {
  const navigation = useNavigation();
  // Mặc định hiển thị ProfileCard
  const [activeCard, setActiveCard] = useState("profile");
  const [activeIcon, setActiveIcon] = useState("heart");

  // State for showing the options menu
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const handlePersonPress = () => {
    setActiveCard("user");
    setActiveIcon("person");
  };

  const handleHeartPress = () => {
    setActiveCard("profile");
    setActiveIcon("heart");
  };

  const handleBookmarkPress = () => {
    setActiveCard("match");
    setActiveIcon("bookmark");
  };

  const handleSendPress = () => {
    setActiveCard("chat");
    setActiveIcon("chatbubble-ellipses");
  };

  const handleOptionsPress = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };

  const handleLogout = () => {
    navigation.navigate("SignIn");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Filters")}>
          <Icon name="reorder-three" size={30} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="refresh" size={30} style={{ marginRight: 40 }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>HeartSync</Text>
        <TouchableOpacity onPress={handleOptionsPress}>
          <Icon name="options" style={styles.iconOption} size={30} />
        </TouchableOpacity>
      </View>

      <View style={styles.progressBar}>
        <View style={styles.progressIndicator} />
      </View>

      {/* Hiển thị card */}
      <View style={styles.cardContainer}>
        {activeCard === 'user' && <SubscriptionCard />}
        {activeCard === 'profile' && <ProfileCard />}
        {activeCard === 'chat' && <ChatCard />}
      </View>

      {/* Footer Navigation */}
      <View style={styles.footerNav}>
        <TouchableOpacity onPress={handlePersonPress}>
          <Icon
            name="person-outline"
            size={30}
            color={activeIcon === "person" ? "#0a92d6" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleHeartPress}>
          <Icon
            name="heart-outline"
            size={30}
            color={activeIcon === "heart" ? "#0a92d6" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleBookmarkPress}>
          <Icon
            name="bookmark-outline"
            size={30}
            color={activeIcon === "bookmark" ? "#0a92d6" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSendPress}>
          <Icon
            name="chatbubble-ellipses-outline"
            size={30}
            color={activeIcon === "chatbubble-ellipses" ? "#0a92d6" : "black"}
          />
        </TouchableOpacity>
      </View>

      {/* Modal Options Menu */}
      <Modal
        visible={isOptionsVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsOptionsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Options</Text>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <Text style={styles.logoutButtonText}>Log out</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsOptionsVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
  iconOption: {
    backgroundColor: "#c8f9ff",
    padding: 6,
    borderRadius: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 50,
  },
  progressBar: {
    height: 3,
    backgroundColor: "#c8f9ff",
    marginHorizontal: 50,
    borderRadius: 5,
    marginTop: 10,
  },
  progressIndicator: {
    width: "50%",
    height: "100%",
    backgroundColor: "#00C4CC",
    borderRadius: 5,
  },
  footerNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: "#E0E0E0",
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#00C4CC",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  closeButton: {
    padding: 10,
    marginTop: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#00C4CC",
  },
});

export default ProfileScreen;
