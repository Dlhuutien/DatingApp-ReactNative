import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import { useTranslation } from "react-i18next";

export default SignInScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  //Chuyển đến đăng nhập bằng số điện thoại
  const handlePhoneSignIn = () => {
    navigation.navigate("PhoneSignIn");
  };
  const handleChangeLan = () => {
    navigation.navigate("Settings");
  };

  // const changeLanguage = (lang) => {
  //   i18n.changeLanguage(lang); // Thay đổi ngôn ngữ
  // };

  return (
    <View style={styles.container}>
      {/* Logo */}
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
        <Text style={styles.subtitle}>
          Where Hearts Connect, Love Finds Its Sync.
        </Text>
      </View>

      {/* Buttons */}
      <TouchableOpacity style={[styles.button, styles.appleButton]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name="logo-apple" size={20} color="white" />
          <Text style={styles.buttonText}>{t("AppleLogin")}</Text>
          {/* {t('AppleLogin')} */}
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.facebookButton]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name="logo-facebook" size={20} color="white" />
          <Text style={styles.buttonText}>{t("FacebookLogin")}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.phoneButton]}
        onPress={handlePhoneSignIn}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name="id-card-outline" size={20} color="white" />
          <Text style={styles.buttonText}>{t("PhoneLogin")}</Text>
        </View>
      </TouchableOpacity>

      {/* Footer Text */}
      <Text style={styles.footerText}>
        By signing up you agree to our{" "}
        <Text style={styles.link}>Terms and Conditions</Text>
        {"\n"}
        See how we use your data in our{" "}
        <Text style={styles.link}>Privacy Policy</Text>.
      </Text>

      <TouchableOpacity
        style={[styles.button, styles.phoneButton]}
        onPress={handleChangeLan}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name="id-card-outline" size={20} color="white" />
          <Text style={styles.buttonText}>Change Language</Text>
        </View>
      </TouchableOpacity>

      {/* Language Switcher Buttons */}
      {/* <View style={styles.languageButtons}>
        <TouchableOpacity onPress={() => changeLanguage('vi')} style={styles.languageButton}>
          <Text style={styles.buttonText}>{t('Switch to Vietnamese')}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => changeLanguage('en')} style={styles.languageButton}>
          <Text style={styles.buttonText}>{t('Switch to English')}</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
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
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginTop: 5,
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 10,
  },
  appleButton: {
    backgroundColor: "#000",
  },
  facebookButton: {
    backgroundColor: "#3b5998",
  },
  phoneButton: {
    backgroundColor: "#00C4CC",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  footerText: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
  link: {
    color: "#007AFF",
  },

  languageButtons: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  languageButton: {
    backgroundColor: "#ecdefc",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 5,
    width: "80%",
  },
});
