import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const ChatScreen = ({ route }) => {
  const { item } = route.params;

  const currentUser = useSelector((state) => state.user.currentUser);
  const navigation = useNavigation();
  const [showMiniGameInvite, setShowMiniGameInvite] = useState(false);
  // Lưu trữ tin nhắn
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState(item.messages || []);

  // const [allMessages, setAllMessages] = useState([]);
  // useEffect(() => {
  //   // Gộp và sắp xếp các tin nhắn theo thời gian từ item.messages
  //   const mergedMessages = item.messages
  //     .sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt)); // Sắp xếp theo thời gian
  //   setAllMessages(mergedMessages);
  // }, [item]); // Cập nhật khi item thay đổi

  const toggleMiniGameInvite = () => {
    setShowMiniGameInvite(!showMiniGameInvite);
  };

  const sendMessage = async () => {
    // Kiểm tra tin nhắn trống
    if (!messageText.trim()) return;

    // Lấy id mới dựa trên ID lớn nhất trong messages
    const newId =
      item.messages.length > 0
        ? Math.max(...item.messages.map((msg) => msg.id)) + 1
        : 1;

    const newMessage = {
      id: newId,
      content: messageText,
      sentAt: new Date().toISOString(),
      senderId: currentUser.id, // Id của người gửi
    };

    // Cập nhật mảng messages của item
    const updatedItem = {
      ...item,
      messages: [...item.messages, newMessage], // Thêm tin nhắn mới vào mảng messages
    };

    try {
      // Gửi yêu cầu PUT để cập nhật tin nhắn vào MockAPI
      const response = await fetch(
        `https://6742e26fb7464b1c2a62f2eb.mockapi.io/User/${item.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          // Gửi toàn bộ item đã cập nhật, bao gồm cả tin nhắn mới
          body: JSON.stringify(updatedItem),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Message sent successfully:", data);
        // Cập nhật danh sách tin nhắn trong trạng thái
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessageText(""); // Xóa nội dung nhập
      } else {
        console.error("Message sending failed:", response.statusText);
      }
    } catch (error) {
      console.error("Message sending error:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          {/* Header */}
          <View style={styles.header}>
            {/* Hàng đầu: Nút back, call và ellipsis */}
            <View style={styles.topRow}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Icon name="arrow-back-outline" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.callButton}>
                <Icon name="videocam-outline" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon
                  name="ellipsis-vertical-outline"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>

            {/* Hàng thứ hai: Thông tin cá nhân */}
            <View style={styles.profileInfo}>
              <Image source={{ uri: item.image }} style={styles.profileImage} />
              <View style={styles.textContainer}>
                <Text style={styles.name}>
                  {item.name}, {item.age}{" "}
                  <Icon name="checkmark-circle" size={16} color="skyblue" />
                </Text>
                <Text style={styles.subText}>{item.profileDetails.gender}</Text>
                <Text style={styles.jobTitle}>
                  {item.profileDetails.occupation}
                </Text>
              </View>
            </View>
          </View>

          {/* Message Container */}
          <ScrollView
            style={styles.messageContainer}
            contentContainerStyle={{ paddingBottom: 20 }}
            keyboardShouldPersistTaps="handled"
          >
            {messages.map((message) => {
              // Kiểm tra xem tin nhắn là của người dùng hiện tại hay của item
              const isSentByCurrentUser = message.senderId === currentUser.id;
              const isReceivedByCurrentUser = message.senderId === item.id;

              return (
                <View
                  key={message.id}
                  style={
                    isSentByCurrentUser ? styles.sentMessage : 
                    isReceivedByCurrentUser ? styles.receivedMessage
                    : null
                  }
                >
                  <Text style={styles.messageText}>{message.content}</Text>
                  <Text style={styles.timeText}>
                    {new Date(message.sentAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </View>
              );
            })}
          </ScrollView>

          {/* Mini-Game Invite */}
          {showMiniGameInvite && (
            <TouchableOpacity style={styles.miniGameInvite}>
              <Icon name="bulb-outline" size={24} color="skyblue" />
              <Text style={styles.inviteText}>
                Invite your match to play a mini-game. Break the ice and find
                out if you both sync on a deeper level.
              </Text>
            </TouchableOpacity>
          )}

          {/* Message Input */}
          <View style={styles.inputContainer}>
            <TouchableOpacity>
              <Icon name="image-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleMiniGameInvite}>
              <Icon name="bulb-outline" size={24} color="skyblue" />
            </TouchableOpacity>
            <TextInput
              placeholder="Type a message..."
              style={styles.input}
              value={messageText} // Gắn giá trị tin nhắn
              onChangeText={setMessageText} // Cập nhật khi người dùng nhập
            />
            <TouchableOpacity>
              <Icon name="happy-outline" size={24} color="gray" />
            </TouchableOpacity>
            {/* Gửi tin nhăn */}
            <TouchableOpacity onPress={sendMessage}>
              <Icon name="send" size={24} color="skyblue" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 30,
  },
  header: {
    padding: 10,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  profileImage: {
    width: 60,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 14,
    color: "gray",
  },
  jobTitle: {
    fontSize: 14,
    color: "gray",
  },
  callButton: {
    padding: 10,
    marginLeft: 250,
  },
  messageContainer: {
    flex: 1,
    padding: 10,
  },
  message: {
    borderRadius: 15,
    padding: 10,
    marginVertical: 5,
    maxWidth: "75%",
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#00bfff",
    borderRadius: 15,
    padding: 10,
    marginVertical: 5,
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#f0f0f0",
    borderRadius: 15,
    padding: 10,
    marginVertical: 5,
  },
  messageText: {
    color: "white",
    fontSize: 16,
  },
  timeText: {
    fontSize: 12,
    color: "white",
    alignSelf: "flex-end",
    marginTop: 5,
  },
  miniGameInvite: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0f7ff",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  inviteText: {
    color: "gray",
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 5,
  },
});

export default ChatScreen;
