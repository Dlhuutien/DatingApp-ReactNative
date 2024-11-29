import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  KeyboardAvoidingView, 
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// import usersData from "../data/usersData";
import { useSelector } from "react-redux";
import { fetchUserData, fetchMessages } from "../data/connectMockAPI";
import { useTranslation } from "react-i18next";

export default ChatCard = () => {
  const { t } = useTranslation();
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // Thêm trạng thái tìm kiếm


  const [usersData, setUsersData] = useState([]);
  const [messagesData, setMessagesData] = useState([]);

  useEffect(() => {
    // Tải dữ liệu người dùng
    fetchUserData()
      .then((data) => setUsersData(data))
      .catch((error) => console.error("Failed to fetch users:", error));

    // Tải dữ liệu tin nhắn
    fetchMessages()
      .then((data) => setMessagesData(data))
      .catch((error) => console.error("Failed to fetch messages:", error));
  }, []);

  const getLastMessage = (userId) => {
    // Lọc tin nhắn của user hiện tại với user khác
    const userMessages = messagesData.filter(
      (msg) =>
        (msg.senderId === currentUser.id && msg.receiverId === userId) ||
        (msg.receiverId === currentUser.id && msg.senderId === userId)
    );
    // Tin nhắn cuối cùng
    return userMessages[userMessages.length - 1]; 
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  const renderHeader = () => {
   const matchedUsers = usersData.filter(
      (item) =>
        item.id !== currentUser.id &&
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        currentUser.matches?.includes(item.id)
    );
  
  
    return (
      <>
        {/* Search Bar */}
        <View style={styles.searchSection}>
          <TextInput style={styles.searchText} placeholder={t("Search")}  value={searchQuery}
            onChangeText={setSearchQuery}/>
        </View>
  
        {/* Matches Section */}
        <View style={styles.matchesSection}>
          <Text style={styles.matchesTitle}>
            {t("Matches")} ({matchedUsers.length})
          </Text>
          <FlatList
            // Sử dụng danh sách đã match
            data={matchedUsers} 
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("ChatScreen", { item })}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.matchProfile}
                />
                {/* Hiển thị tên người match
                <Text style={styles.matchName}>{item.name}</Text> */}
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
  
        {/* Chat Title */}
        <Text style={styles.chatTitle}>{t("Chats")}</Text>
      </>
    );
  };
  
  const getTimeAgo = (sentAt) => {
    const now = new Date();
    // Chuyển sentAt thành đối tượng Date
    const sentAtDate = new Date(sentAt);
    // Chênh lệch giữa thời gian hiện tại và sentAt
    const diffInMilliseconds = now - sentAtDate;

    // Chuyển chênh lệch thành phút
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    // Chuyển chênh lệch thành giờ
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    // Chuyển chênh lệch thành ngày
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    // Lấy năm hiện tại
    const currentYear = now.getFullYear();
    // Lấy năm của sentAt
    const sentAtYear = sentAtDate.getFullYear();

    if (diffInDays > 7) {
      const day = sentAtDate.getDate();
      // Tháng bắt đầu từ 0
      const month = sentAtDate.getMonth() + 1;
      // Kiểm tra nếu không phải năm hiện tại thì thêm năm vào
      if (sentAtYear !== currentYear) {
        return `${day < 10 ? "0" + day : day}/${
          month < 10 ? "0" + month : month
        }/${sentAtYear}`;
      }
      return `${day < 10 ? "0" + day : day}/${
        month < 10 ? "0" + month : month
      }`;
    } else if (diffInDays > 0) {
      return `${diffInDays} ngày trước`;
    } else if (diffInHours > 0) {
      return `${diffInHours} giờ trước`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} phút trước`;
    } else {
      return "Vừa xong";
    }
  };

  const renderChatItem = ({ item }) => {
    const lastMessage = getLastMessage(item.id);
    if (!lastMessage) return null;

    const isCurrentUser = lastMessage.senderId === currentUser.id;
    const messageContent = isCurrentUser
      ? `You: ${lastMessage.content}`
      : lastMessage.content;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("ChatScreen", { item })}
      >
         <View style={styles.chatItem}>
           <Image source={{ uri: item.image }} style={styles.chatImage} />
           <View style={styles.chatDetails}>
             <View style={styles.chatHeader}>
               <Text style={styles.chatName}>{item.name}</Text>
               <Text style={styles.chatTime}>
                 {getTimeAgo(lastMessage.sentAt)}
               </Text>
             </View>
             <Text style={styles.chatDetail}>{messageContent}</Text>
           </View>
         </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={usersData}
      renderItem={renderChatItem}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  searchSection: {
    padding: 10,
    paddingHorizontal: 150,
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    marginHorizontal: 15,
  },
  searchText: {
    fontSize: 16,
    color: "#aaa",
  },
  matchesSection: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  matchesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  matchProfile: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginHorizontal: 8,
    backgroundColor: "#eee",
  },
  chatTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginTop: 24,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  chatImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  chatDetails: {
    flex: 1,
    justifyContent: "center",
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  chatName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  chatTime: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 4,
  },
  chatDetail: {
    color: "#666",
    marginTop: 4,
  },
});
