import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { UserProfileCompletion } from "./UserProfileCompletion";
import { calculateAge } from "./redux/calculateAge";

export default SubscriptionCard = () => {
  const [selectedTab, setSelectedTab] = useState("Plans");
  const navigation = useNavigation();
  const { t } = useTranslation();
  const profileCompletion = UserProfileCompletion();

  //Lấy DATA từ Redux
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleEdit = () => {
    navigation.navigate("UserEditCard");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: currentUser.image }}
          style={styles.profilePicture}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>
            {currentUser.name}, {calculateAge(currentUser.age)}
          </Text>
          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={handleEdit}
          >
            <Text style={styles.editProfileButtonText}>
              {t("Edit your profile")}
            </Text>
          </TouchableOpacity>
          <Text style={styles.completionText}>
            {profileCompletion}% {t("Complete")}
          </Text>
        </View>
      </View>

      {/* Verification Section */}
      <View style={styles.verificationSection}>
        <Text style={styles.verificationText}>{t("VerificationPrompt")}</Text>
        <TouchableOpacity>
          <Text style={styles.verifyLink}>{t("VerifyNow")}</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabSection}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "Plans" && styles.activeTab,
          ]}
          onPress={() => setSelectedTab("Plans")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "Plans" && styles.activeTabText,
            ]}
          >
            Plans
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "Safety" && styles.activeTab,
          ]}
          onPress={() => setSelectedTab("Safety")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "Safety" && styles.activeTabText,
            ]}
          >
            Safety
          </Text>
        </TouchableOpacity>
      </View>

      {/* Premium Plan */}
      {selectedTab === "Plans" && (
        <View style={styles.premiumSection}>
          <Text style={styles.premiumTitle}>{t("PremiumTitle")}</Text>
          <Text style={styles.premiumDescription}>
            {t("PremiumDescription")}
          </Text>
          <TouchableOpacity style={styles.upgradeButton}>
            <Text style={styles.upgradeButtonText}>{t("UpgradePrice")}</Text>
          </TouchableOpacity>

          <View style={styles.featuresTable}>
            {/* Header Row */}
            <View style={styles.tableRow}>
              <Text style={[styles.tableHeader, { flex: 3 }]}>
                {t("What's included")}
              </Text>
              <Text style={[styles.tableHeader, { flex: 1 }]}>{t("Free")}</Text>
              <Text style={[styles.tableHeader, { flex: 1 }]}>
                {t("Premium")}
              </Text>
            </View>

            {/* Data Row 1 */}
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 3 }]}>
                {t("Unlimited swipes")}
              </Text>
              <Text style={styles.tableCell}>✔</Text>
              <Text style={styles.tableCell}>✔</Text>
            </View>

            {/* Data Row 2 */}
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 3 }]}>
                {t("Advanced filters")}
              </Text>
              <Text style={styles.tableCell}>✔</Text>
              <Text style={styles.tableCell}>✔</Text>
            </View>

            {/* Data Row 3 */}
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 3 }]}>
                {t("Remove ads")}
              </Text>
              <Text style={styles.tableCell}>✘</Text>
              <Text style={styles.tableCell}>✔</Text>
            </View>

            {/* Data Row 4 */}
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 3 }]}>
                {t("Undo accidental left swipes")}
              </Text>
              <Text style={styles.tableCell}>✘</Text>
              <Text style={styles.tableCell}>✔</Text>
            </View>

            {/* Data Row 5 */}
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 3 }]}>
                {t("Push your profile to more viewers")}
              </Text>
              <Text style={styles.tableCell}>✘</Text>
              <Text style={styles.tableCell}>✔</Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  editProfileButton: {
    marginTop: 4,
    padding: 4,
  },
  editProfileButtonText: {
    color: "#00aaff",
  },
  completionText: {
    marginTop: 4,
    fontSize: 14,
    color: "#666",
  },
  verificationSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f0f0f0",
    marginVertical: 8,
  },
  verificationText: {
    fontSize: 14,
    color: "#555",
  },
  verifyLink: {
    color: "#00aaff",
    fontSize: 14,
    marginTop: 4,
  },
  tabSection: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#00aaff",
  },
  tabText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabText: {
    color: "#00aaff",
    fontWeight: "bold",
  },
  premiumSection: {
    padding: 16,
    alignItems: "center",
  },
  premiumTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00aaff",
  },
  premiumDescription: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginVertical: 8,
  },
  upgradeButton: {
    backgroundColor: "#00aaff",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  upgradeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  //Table
  featuresTable: {
    width: "100%",
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tableHeader: {
    fontSize: 12,
    fontWeight: "bold",
  },
  tableCell: {
    fontSize: 12,
    flex: 1,
  },
});
