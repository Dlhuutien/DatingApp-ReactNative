import React, { useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ProgressBar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
// import usersData from "../data/usersData";
import { updateProfileDetails } from "./redux/userSlice";
import { updateUserProfile } from "../data/connectMockAPI";
import { UserProfileCompletion } from "./UserProfileCompletion";
import { useTranslation } from "react-i18next";

export default ProfileEditCard = () => {
  const { t } = useTranslation();
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const profileCompletion = UserProfileCompletion();

  const [occupationModalVisible, setOccupationModalVisible] = useState(false);
  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const [educationModalVisible, setEducationModalVisible] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [heightModalVisible, setHeightModalVisible] = useState(false);
  const [smokingModalVisible, setSmokingModalVisible] = useState(false);
  const [drinkingModalVisible, setDrinkingModalVisible] = useState(false);
  const [petsModalVisible, setPetsModalVisible] = useState(false);
  const [childrenModalVisible, setChildrenModalVisible] = useState(false);
  const [zodiacModalVisible, setZodiacModalVisible] = useState(false);
  const [religionModalVisible, setReligionModalVisible] = useState(false);

  // Dữ liệu trong modal
  const occupations = ["Student", "Engineer", "Teacher", "Doctor", "Designer", "Other"];
  const genders = ["Male", "Female", "Other"];
  const educations = ["High School", "Bachelor", "Master", "PhD", "Other"];
  const locations = ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Cần Thơ", "Other"];
  const heights = ["Below 100cm", "101cm - 150cm", "151cm - 170cm", "Above 170cm"];
  const yesNoOptions = ["Yes", "No"];
  const zodiacSigns = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
  const religions = ["None", "Christianity", "Buddhism", "Hinduism", "Islam", "Judaism", "Other"];
  const drinks = ["No", "Occasionally", "Socially", "Frequently"];
  const pet = ["No", "Dog", "Cat", "Bird", "Fish", "Other"];
  const child = ["Don't want", "Want one", "Want two"];

  //Lấy data từ MockAPI
  const [occupation, setOccupation] = useState(currentUser.profileDetails.occupation || "Add");
  const [gender, setGender] = useState(currentUser.profileDetails.gender || "Add");
  const [education, setEducation] = useState(currentUser.profileDetails.education || "Add");
  const [location, setLocation] = useState(currentUser.profileDetails.location || "Add");
  const [height, setHeight] = useState(currentUser.profileDetails.height || "Add");
  const [smoking, setSmoking] = useState(currentUser.profileDetails.smoking || "Add");
  const [drinking, setDrinking] = useState(currentUser.profileDetails.drinking || "Add");
  const [pets, setPets] = useState(currentUser.profileDetails.pets || "Add");
  const [children, setChildren] = useState(currentUser.profileDetails.children || "Add");
  const [zodiac, setZodiac] = useState(currentUser.profileDetails.zodiac || "Add");
  const [religion, setReligion] = useState(currentUser.profileDetails.religion || "Add");

  const handleCloseModal = async (setModalVisible, field, value) => {
    try {
      const updatedProfileDetails = { [field]: value };
  
      // Gọi API để cập nhật server
      await updateUserProfile(currentUser.id, {
        ...currentUser.profileDetails,
        ...updatedProfileDetails,
      });
  
      // Cập nhật Redux state
      dispatch(updateProfileDetails(updatedProfileDetails));
      console.log("Update complete", value);

      // Tính toán lại tiến độ hoàn thành profile
      profileCompletion;
      // Đóng modal
      setModalVisible(false);
    } catch (error) {
      console.error("Error updating profile detail:", error);
    }
  };


  // State for managing 'I enjoy' section
  const [enjoyments, setEnjoyments] = useState(currentUser.profileDetails.enjoyments || []);
  const [showEnjoymentsModal, setShowEnjoymentsModal] = useState(false);

  const [communicates, setCommunicates] = useState(currentUser.profileDetails.communicates || []);
  const [showCommunicatesModal, setShowCommunicatesModal] = useState(false);

  // List of popular enjoyments (You can customize this list)
  const popularEnjoyments = [
    "Sci-fi movies", "Coffee brewing", "Trekking", "Cooking", "Gaming", "Reading",
    "Traveling", "Photography", "Music", "Sports"
  ];
  const popularCommunicates = [
    "English", "Vietnamese", "Chinese", "Japanese", "Korean", "Spanish", "French", 
    "German", "Russian", "Hindi", "Arabic"
  ];
  

  const handleAddEnjoyment = (enjoyment) => {
    if (!enjoyments.includes(enjoyment)) {
      const updatedEnjoyments = [...enjoyments, enjoyment];
      setEnjoyments(updatedEnjoyments);
      handleSaveProfile("enjoyments", updatedEnjoyments); 
    }
    setShowEnjoymentsModal(false); 
  };
  
  const handleAddCommunicate = (communicate) => {
    if (!communicates.includes(communicate)) {
      setCommunicates([...communicates, communicate]);
      const updatedCommunicates = [...communicates, communicate];
      setEnjoyments(updatedCommunicates);
      handleSaveProfile("communicates", updatedCommunicates); 
    }
    setShowCommunicatesModal(false);
  };

  const handleSaveProfile = async (fieldName, fieldValue) => {
    try {
      // Cập nhật MockAPI
      await updateUserProfile(currentUser.id, {
        ...currentUser.profileDetails,
        [fieldName]: fieldValue,
      });
  
      // Cập nhật Redux state
      // Cập nhật Redux state với fieldName và fieldValue
      dispatch(updateProfileDetails({ [fieldName]: fieldValue }));
      console.log(`${fieldName} updated successfully:`, fieldValue);
    } catch (error) {
      console.error(`Error updating ${fieldName}:`, error);
    }
  };

  // State để lưu nội dung nhập vào
  const [aboutMe, setAboutMe] = useState(currentUser.profileDetails.aboutMe || ""); 
  const handleAboutMeChange = (text) => {
    setAboutMe(text);  // Cập nhật nội dung khi người dùng gõ
    saveToMockAPI(text);  // Lưu vào MockAPI mỗi lần thay đổi
  };

  const saveToMockAPI = async (aboutMeText) => {
    try {
      const updatedUser = await updateUserProfile(currentUser.id,{
        ...currentUser.profileDetails,
        aboutMe: aboutMeText,
      });
      dispatch(updateProfileDetails({  aboutMe: aboutMeText }));
      console.log("Updated user profile:", updatedUser);
    } catch (error) {
      console.log("Error saving profile:", error);
    }
  };


  const [activeItem, setActiveItem] = useState(null); // Quản lý mục đang được nhấn
  const [inputValue, setInputValue] = useState(''); // Quản lý giá trị nhập vào
  const linkedAccounts = {
    Instagram: currentUser.profileDetails.instagram || "",
    Facebook: currentUser.profileDetails.facebook || "",
    Twitter: currentUser.profileDetails.twitter || ""
  };


  const handlePress = (item) => {
    // Chuyển trạng thái khi người dùng nhấn vào một mục
    setActiveItem(item === activeItem ? null : item);
    setInputValue(linkedAccounts[item] || "");
  };

  const handleInputChange = (text) => {
    setInputValue(text);
    saveToMockAPILink(activeItem, text); // Lưu vào MockAPI mỗi lần thay đổi
  };
  const saveToMockAPILink = async (platform, link) => {
    try {
      const updatedUser = await updateUserProfile(currentUser.id, {
        ...currentUser.profileDetails,
        [platform.toLowerCase()]: link, // Cập nhật dữ liệu cho từng nền tảng
      });

      dispatch(updateProfileDetails({
        [platform.toLowerCase()]: link
      }));

      console.log(`Updated ${platform} link:`, updatedUser);
    } catch (error) {
      console.log("Error saving profile:", error);
    }
  };
  

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScrollView>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-back" size={25} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{t("Edit profile")}</Text>
      </View>

      {/* Profile Completion */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {t("Profile completion")}: {profileCompletion}%
        </Text>
        <ProgressBar
          progress={profileCompletion / 100}
          color="#00C4CC"
          style={styles.progressBar}
        />
      </View>

      {/* Photos Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t("Photos")}</Text>
        <Text style={styles.subText}>
          {t("The main photo is how you appear to others on the swipe view.")}
        </Text>
        <View style={styles.photoGrid}>
          <Image
            source={{uri: currentUser.image}}
            style={styles.photo}
          />
          <TouchableOpacity style={styles.photoPlaceholder}>
            <Icon name="add" size={40} color="#ccc" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.photoPlaceholder}>
            <Icon name="add" size={40} color="#ccc" />
          </TouchableOpacity>
        </View>
      </View>

      {/* About Me Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t("About me")}</Text>
        <TextInput
          style={styles.textArea}
          placeholder={t("ShareBioPlaceholder")}
          multiline
          // Liên kết với state
          value={aboutMe}  
          // Gọi hàm mỗi khi người dùng gõ
          onChangeText={handleAboutMeChange}  
        />
      </View>

      {/* My Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t("My details")}</Text>
        {[
          ["Occupation", occupationModalVisible, setOccupationModalVisible, occupation, setOccupation, occupations],
          ["Gender & Pronouns", genderModalVisible, setGenderModalVisible, gender, setGender, genders],
          ["Education", educationModalVisible, setEducationModalVisible, education, setEducation, educations],
          ["Location", locationModalVisible, setLocationModalVisible, location, setLocation, locations],
        ].map(([label, modalVisible, setModalVisible, value, setValue, options], index) => (
          <TouchableOpacity
            key={index}
            style={styles.detailRow}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.detailText}>{label}</Text>
            <Text style={styles.detailAction}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Additional Details */}
      <View style={styles.section}>
        <Text style={{ color: "#aaa" }}>{t("Most people also want to know:")}</Text>
        {[
          ["Height", heightModalVisible, setHeightModalVisible, height, setHeight, heights],
          ["Smoking", smokingModalVisible, setSmokingModalVisible, smoking, setSmoking, yesNoOptions],
          ["Drinking", drinkingModalVisible, setDrinkingModalVisible, drinking, setDrinking, drinks],
          ["Pets", petsModalVisible, setPetsModalVisible, pets, setPets, pet],
          ["Children", childrenModalVisible, setChildrenModalVisible, children, setChildren, child],
          ["Zodiac sign", zodiacModalVisible, setZodiacModalVisible, zodiac, setZodiac, zodiacSigns],
          ["Religion", religionModalVisible, setReligionModalVisible, religion, setReligion, religions]
        ].map(([label, modalVisible, setModalVisible, value, setValue, options], index) => (
          <TouchableOpacity
            key={index}
            style={styles.detailRow}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.detailText}>{label}</Text>
            <Text style={styles.detailAction}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>
       {/* Modals for all fields */}
       {[
        [occupationModalVisible, setOccupationModalVisible, occupations, setOccupation, 'occupation'],
        [genderModalVisible, setGenderModalVisible, genders, setGender, 'gender'],
        [educationModalVisible, setEducationModalVisible, educations, setEducation, 'education'],
        [locationModalVisible, setLocationModalVisible, locations, setLocation, 'location'],
        [heightModalVisible, setHeightModalVisible, heights, setHeight, 'height'],
        [smokingModalVisible, setSmokingModalVisible, yesNoOptions, setSmoking, 'smoking'],
        [drinkingModalVisible, setDrinkingModalVisible, drinks, setDrinking, 'drinking'],
        [petsModalVisible, setPetsModalVisible, pet, setPets, 'pets'],
        [childrenModalVisible, setChildrenModalVisible, child, setChildren, 'children'],
        [zodiacModalVisible, setZodiacModalVisible, zodiacSigns, setZodiac, 'zodiac'],
        [religionModalVisible, setReligionModalVisible, religions, setReligion,'religion']
      ].map(([modalVisible, setModalVisible, options, setValue, field], index) => (
        <Modal
          key={index}
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{t("Select")} {options[0]}</Text>
              <FlatList
                data={options}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.optionItem}
                    onPress={() => {
                      setValue(item);
                      handleCloseModal(setModalVisible, field, item);
                    }}
                  >
                    <Text style={styles.optionText}>{item}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item}
              />
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalCloseText}>{t("Close")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ))}

       {/* I Enjoy Section */}
       <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t("I enjoy")}</Text>
        <Text style={styles.subText}>
        {t("IEnjoySubText")}
        </Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setShowEnjoymentsModal(true)}>
          <Text style={styles.addButtonText}>{t("Add Enjoyment")}</Text>
        </TouchableOpacity>
        <View style={styles.tags}>
          {enjoyments.map((item, index) => (
            <Text key={index} style={styles.tag}>{item}</Text>
          ))}
        </View>
      </View>

      {/* Modal for selecting enjoyment */}
      <Modal
        visible={showEnjoymentsModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowEnjoymentsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t("Select Enjoyment")}</Text>
            <FlatList
              data={popularEnjoyments}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.optionItem} onPress={() =>handleAddEnjoyment(item)}>
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowEnjoymentsModal(false)}
            >
              <Text style={styles.modalCloseText}>{t("Close")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Language Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t("I communicate in")}</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setShowCommunicatesModal(true)}>
          <Text style={styles.addButtonText}>{t("Add Language")}</Text>
        </TouchableOpacity>
        <View style={styles.tags}>
          {communicates.map((item, index) => (
            <Text key={index} style={styles.tag}>{item}</Text>
          ))}
        </View>
      </View>
      <Modal
        visible={showCommunicatesModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCommunicatesModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t("Select Language")}</Text>
            <FlatList
              data={popularCommunicates}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.optionItem} onPress={() => handleAddCommunicate(item)}>
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowCommunicatesModal(false)}
            >
              <Text style={styles.modalCloseText}>{t("Close")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Linked Accounts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t("Linked accounts")}</Text>
        {["Instagram", "Facebook", "Twitter"].map((item, index) => (
          <View key={index}>
            <TouchableOpacity 
              style={styles.detailRow} 
              onPress={() => handlePress(item)}
            >
              <Text style={styles.detailText}>{item}</Text>
              <Text style={styles.detailAction}>
              {activeItem === item && inputValue !== "" ? inputValue : linkedAccounts[item] || "Add"}
              </Text>
            </TouchableOpacity>

            {/* Hiển thị TextInput khi nhấn vào mục */}
            {activeItem === item && (
              <TextInput 
                style={styles.textInput}
                value={inputValue}
                onChangeText={handleInputChange}
                placeholder={`Enter ${item} link`}
              />
            )}
          </View>
        ))}
      </View>
    </ScrollView>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 15,
  },
  progressBar: {
    height: 6,
    borderRadius: 5,
    marginVertical: 10,
  },
  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  detailText: {
    fontSize: 16,
    color: "#333",
  },
  detailAction: {
    fontSize: 16,
    color: "#00C4CC",
  },
  textInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 10,
    paddingLeft: 10,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "#e0f7f9",
    color: "#00C4CC",
    padding: 8,
    borderRadius: 15,
    margin: 5,
    fontSize: 14,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  optionItem: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
  },
  modalCloseButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#00C4CC",
    borderRadius: 5,
  },
  modalCloseText: {
    color: "#fff",
    textAlign: "center",
  },
  //Button
  addButton: {
    backgroundColor: "#00C4CC",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },

});
