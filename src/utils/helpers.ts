export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('en-GB', { month: 'short' });
  const year = date.getFullYear();

  const ordinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  return `${day}${ordinalSuffix(day)} ${month}, ${year}`;
};

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
};

export const getInitials = (firstName?: string, lastName?: string): string => {
  if (!firstName && !lastName) return '?';

  const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
  const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';

  return `${firstInitial}${lastInitial}`;
};

export const getMaxDate = () => {
  const today = new Date();
  const maxDate = new Date(today.setFullYear(today.getFullYear() - 18));
  return maxDate.toISOString().split('T')[0];
};
