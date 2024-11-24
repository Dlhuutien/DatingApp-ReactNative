import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// import usersData from "../data/usersData";
import { useSelector } from "react-redux";
import { fetchUserData } from "../data/connectMockAPI";

export default ChatCard = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(true);

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

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderHeader = () => {
    // Lọc danh sách để loại bỏ người dùng hiện tại
    const filteredUsers = usersData.filter(
      (item) => item.id !== currentUser.id
    );

    return (
      <>
        {/* Search Bar */}
        <View style={styles.searchSection}>
          <TextInput style={styles.searchText} placeholder="Search" />
        </View>

        {/* Matches Section */}
        <TouchableOpacity onPress={() => navigation.navigate("ChatScreen")}>
          <View style={styles.matchesSection}>
            <Text style={styles.matchesTitle}>
              Matches ({filteredUsers.length})
            </Text>
            <FlatList
              data={filteredUsers} // Sử dụng danh sách đã lọc
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("ChatScreen", { item })}
                >
                  <Image source={{uri:item.image}} style={styles.matchProfile} />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </TouchableOpacity>

        {/* Chat Title */}
        <Text style={styles.chatTitle}>Chats</Text>
      </>
    );
  };

  const getTimeAgo = (sentAt) => {
    const now = new Date();
    const sentAtDate = new Date(sentAt); // Chuyển sentAt thành đối tượng Date
    const diffInMilliseconds = now - sentAtDate; // Chênh lệch giữa thời gian hiện tại và sentAt

    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60)); // Chuyển chênh lệch thành phút
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60)); // Chuyển chênh lệch thành giờ
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24)); // Chuyển chênh lệch thành ngày

    const currentYear = now.getFullYear(); // Lấy năm hiện tại
    const sentAtYear = sentAtDate.getFullYear(); // Lấy năm của sentAt

    if (diffInDays > 7) {
      const day = sentAtDate.getDate();
      const month = sentAtDate.getMonth() + 1; // Tháng bắt đầu từ 0
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
    if (item.id === currentUser.id) {
      return null; // Nếu item.id trùng với currentUser.id thì không render item này
    }

    // Kiểm tra nếu người gửi là người dùng hiện tại
    const isCurrentUser =
      item.messages[item.messages.length - 1].senderId === currentUser.id;
    const messageContent = isCurrentUser
      ? `You: ${item.messages[item.messages.length - 1].content}`
      : item.messages[item.messages.length - 1].content;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("ChatScreen", { item })}
      >
        <View style={styles.chatItem}>
          <Image source={{uri:item.image}} style={styles.chatImage} />
          <View style={styles.chatDetails}>
            <View style={styles.chatHeader}>
              {/* <Text style={styles.chatName}>{item.messages[item.messages.length - 1].senderId}</Text> */}
              {/* <Text style={styles.chatName}>{currentUser.id}</Text> */}
              <Text style={styles.chatName}>{item.name}</Text>
              <Text style={styles.chatTime}>
                {getTimeAgo(item.messages[item.messages.length - 1].sentAt)}
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
    // marginRight: 120,
    marginTop: 4,
  },
  chatDetail: {
    color: "#666",
    marginTop: 4,
  },
});
