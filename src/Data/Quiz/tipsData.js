// Personalized cyber safety tips based on demographics
export const demographicTips = {
  Student: [
    "Be cautious about what you share on social media - future employers and colleges may see it",
    "Use strong, unique passwords for your school accounts and social media",
    "Never share your login credentials with friends, even if they promise to help with homework",
    "Be wary of phishing emails pretending to be from your school or teachers",
    "Use privacy settings on social media to control who can see your posts and information",
    "Think twice before posting photos or personal information online - once it's out there, it's hard to remove",
    "Use a VPN when connecting to public Wi-Fi at school or coffee shops",
    "Keep your devices updated with the latest security patches"
  ],
  
  // Removed Homemaker and Senior Citizen tips
  
  Professional: [
    "Use a password manager to create and store strong, unique passwords for work accounts",
    "Enable two-factor authentication on all work-related accounts",
    "Be cautious of phishing emails targeting your company or industry",
    "Use a VPN when working from public places or traveling",
    "Regularly back up important work files to secure cloud storage",
    "Keep your work devices updated with the latest security patches",
    "Be careful about what work information you share on social media",
    "Use encrypted communication tools for sensitive work discussions"
  ],
  
  Others: [
    "Use strong, unique passwords for all your online accounts",
    "Enable two-factor authentication whenever possible",
    "Be cautious of suspicious emails and links - when in doubt, don't click",
    "Keep your devices and software updated with the latest security patches",
    "Use a password manager to help you remember complex passwords",
    "Be careful about what personal information you share online",
    "Use different passwords for different websites and services",
    "Regularly review your privacy settings on social media platforms"
  ]
};

// Get random tips for a specific demographic
export const getRandomTips = (demographic, count = 3) => {
  const tips = demographicTips[demographic] || demographicTips['Others'];
  const shuffled = [...tips].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Get all tips for a specific demographic
export const getAllTips = (demographic) => {
  return demographicTips[demographic] || demographicTips['Others'];
};
