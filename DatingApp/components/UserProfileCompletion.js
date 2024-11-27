import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const UserProfileCompletion = () => {
  // Lấy DATA từ Redux
  const currentUser = useSelector((state) => state.user.currentUser);

  // Data từ profile
  const profileFields = [
    'occupation', 'gender', 'education', 'location', 'height',
    'smoking', 'drinking', 'pets', 'children', 'zodiac', 'religion'
  ];

  // Tính tiến độ hoàn thành
  const calculateProfileCompletion = () => {
    const filledFields = profileFields.filter(
      field => currentUser.profileDetails[field] && currentUser.profileDetails[field] !== 'Add'
    ).length;
    const completion = (filledFields / profileFields.length) * 100;
    return Math.round(completion);
  };

  const [profileCompletion, setProfileCompletion] = useState(calculateProfileCompletion);

  // Cập nhật lại khi thông tin hồ sơ thay đổi
  useEffect(() => {
    setProfileCompletion(calculateProfileCompletion());
  }, [currentUser.profileDetails]);

  return profileCompletion;
};
