export const calculateAge = (birthDate) => {
    const [day, month, year] = birthDate.split("/").map((num) => parseInt(num, 10));
    const birth = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();
    
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--; // Nếu chưa qua sinh nhật năm nay thì trừ đi 1 tuổi
    }
    return age;
  };
