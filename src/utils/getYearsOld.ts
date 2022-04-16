function getYearsOld() {
  const now = new Date();

  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDay = now.getDate();

  const birthYear = 2002;
  const birthMonth = 10;
  const birthDay = 2;

  const yearsOld = currentYear - birthYear;
  const monthDiff = currentMonth - birthMonth;
  const daysDiff = currentDay - birthDay;

  if(monthDiff < 0 || (monthDiff === 0 && daysDiff < 0)) {
    return yearsOld - 1;
  };

  return yearsOld;
};

export { getYearsOld };