/**
 * Format length of funding from days to a human-readable format
 */
export const formatLengthOfFunding = (days: number): string => {
  if (days < 30) return `${days} days`;
  if (days < 365) return `${Math.round(days / 30)} months`;
  return `${Math.round(days / 365)} years`;
};

/**
 * Get the appropriate CSS classes for a risk score
 */
export const getRiskScoreColor = (score: string): string => {
  switch (score) {
    case 'Low':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'High':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  }
}; 