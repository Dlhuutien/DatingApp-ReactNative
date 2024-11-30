import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";

const SignUp = ({ route }) => {
  const { t } = useTranslation();
  // Lấy số điện thoại từ PhoneSignIn
  const { phoneNumber } = route.params;
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const navigation = useNavigation();

  const handleDateInput = (input) => {
    // Chỉ nhập 2 ký tự cho ngày, 2 cho tháng và 4 cho năm
    if (input.length === 2 || input.length === 5) {
      // Tự động chèn dấu "/" sau khi nhập đủ 2 ký tự cho ngày hoặc tháng
      input = input + "/";
    }
    // Nếu nhập đủ 6 ký tự và chưa có "/" ở phần ngày hoặc tháng
    if (input.length === 2 && !input.includes("/")) {
      input = "20/" + input; // Tự động thêm 20 vào phần ngày
    }

    // Giới hạn độ dài cho phép
    if (input.length <= 10) {
      setAge(input);
    }
  };

  const handleSignUp = async () => {
    if (!username || !age || !verificationCode) {
      alert(t("Please fill in all the information!"));
      return;
    }

    // Chuyển từ DD/MM/YYYY sang dạng YYYY/MM/DD
    const [day, month, year] = age.split("/").map((num) => parseInt(num, 10));

    // Kiểm tra định dạng ngày tháng có hợp lệ không
    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900) {
      alert(t("Please enter a valid date!"));
      return;
    }

    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    const ageInYears = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    // Nếu ngày sinh chưa đủ 18 tuổi
    if (
      ageInYears < 18 ||
      (ageInYears === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))
    ) {
      alert(t("You must be at least 18 years old to sign up."));
      return;
    }

    const newUser = {
      name: username,
      age,
      phoneNumber,
      image: "https://raw.githubusercontent.com/Dlhuutien/DatingApp-ReactNative/main/DatingApp/assets/NotImage.jpg",
      matches: [],
      matchWait: [],
      profileDetails: {},
    };

    try {
      const response = await fetch(
        "https://6742e26fb7464b1c2a62f2eb.mockapi.io/User",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      if (response.ok) {
        alert(t("Sign-up successful!"));
        navigation.navigate("PhoneSignIn");
      } else {
        alert(t("Error during sign-up. Please try again."));
      }
    } catch (error) {
      console.error("Error:", error);
      alert(t("Something went wrong. Please try again."));
    }
  };

  const handleSendVerificationCode = () => {
    // Tự động điền mã xác nhận vào "Verification Code"
    setVerificationCode("290820");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.innerContainer}>
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
          <Text style={styles.title}>{t("Create New Account")}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("Username")}
            value={username}
            onChangeText={setUsername}
          />
          <View style={styles.phoneContainer}>
            <TextInput
              style={[styles.input, styles.phoneInput]}
              placeholder="Phone Number"
              value={phoneNumber}
              // Không cho sửa số điện thoại
              editable={false}
            />
            <TouchableOpacity
              style={styles.buttonSend}
              onPress={handleSendVerificationCode}
            >
              <Text style={styles.buttonText}>
                {t("Send Verification Code")}
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/YYYY"
            value={age}
            onChangeText={handleDateInput}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Verification Code"
            value={verificationCode}
            onChangeText={setVerificationCode}
          />
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </ScrollView>
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
    flexGrow: 1,
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
    marginVertical: 5,
    fontSize: 16,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  phoneInput: {
    flex: 1,
    marginRight: 10,
  },
  buttonSend: {
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: "#00C4CC",
    alignItems: "center",
    paddingHorizontal: 20,
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

export default SignUp;
