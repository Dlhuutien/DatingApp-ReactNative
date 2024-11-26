import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { setUser } from "./redux/userSlice";
import { useDispatch } from "react-redux";
// import userData from "../data/usersData";
import { fetchUserData } from "../data/connectMockAPI";

import { useTranslation } from "react-i18next";


const PhoneSignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    fetchUserData()
      .then(data => {
        setUsersData(data);
      })
      .catch(error => {
        console.error("Failed to fetch users:", error);
      });
  }, []);

  const handlePhoneSignIn = () => {
    console.log("Phone number entered: ", phoneNumber);
    const user = usersData.find((user) => user.phoneNumber === phoneNumber);

    if (user) {
      dispatch(setUser(user));
      navigation.navigate("Profile");
      // console.log("Thanh cong");
    } else {
      alert("Phone number not found!");
    }
  };


  // const handlePhoneSignIn = () => {
  //   console.log("Phone number entered: ", phoneNumber);
  //   const user = userData.find((user) => user.phoneNumber === phoneNumber);

  //   if (user) {
  //     dispatch(setUser(user));
  //     navigation.navigate("Profile");
  //   } else {
  //     alert("Phone number not found!");
  //   }
  // };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <View style={styles.logoContainer}>
            <View
              style={{
                backgroundColor: "#ecdefc",
                padding: 10,
                borderRadius: 70,
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  backgroundColor: "#c194f6",
                  padding: 10,
                  borderRadius: 70,
                }}
              >
                <View style={styles.heartContainer}>
                  <Icon name="heart" size={50} color="white" />
                </View>
              </View>
            </View>
            <Text style={styles.title}>HeartSync</Text>
          </View>

          <Text style={styles.title}>{t("LoginNumber")}</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />

          <TouchableOpacity style={styles.button} onPress={handlePhoneSignIn}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  heartContainer: {
    backgroundColor: "#8023eb",
    padding: 20,
    borderRadius: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 25,
    backgroundColor: "#00C4CC",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default PhoneSignIn;
