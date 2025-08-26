const level3 = [
  {
    id: 1,
    question: "You receive an email from your bank asking you to verify your account details by clicking a link. The email looks legitimate but has a few spelling errors. What should you do?",
    options: [
      "Click the link and verify your details immediately",
      "Forward the email to your bank's official support",
      "Ignore the email and delete it",
      "Reply to the email asking for more information"
    ],
    answer: "Forward the email to your bank's official support",
    scenario: "This is a classic phishing attempt. Legitimate banks never ask for sensitive information via email links."
  },
  {
    id: 2,
    question: "Your friend sends you a message on social media with a link to a 'funny video' that requires you to login with your social media credentials. What's the safest approach?",
    options: [
      "Login quickly to watch the video",
      "Check if the link is from a trusted domain before clicking",
      "Message your friend to confirm they sent the link",
      "Report the message as suspicious and don't click the link"
    ],
    answer: "Message your friend to confirm they sent the link",
    scenario: "Your friend's account might be compromised. Always verify before clicking suspicious links."
  },
  {
    id: 3,
    question: "You're using public Wi-Fi at a coffee shop and need to check your bank account balance. What's the most secure method?",
    options: [
      "Use the bank's website directly",
      "Use a VPN connection first",
      "Use the bank's mobile app with cellular data",
      "Wait until you're on a secure network at home"
    ],
    answer: "Use the bank's mobile app with cellular data",
    scenario: "Public Wi-Fi is vulnerable to attacks. Cellular data or VPN provides better security for sensitive transactions."
  },
  {
    id: 4,
    question: "You discover a USB drive in the parking lot with a label 'Confidential - HR Documents'. What should you do?",
    options: [
      "Plug it into your computer to identify the owner",
      "Take it to the lost and found",
      "Format the drive and use it yourself",
      "Hand it to security or IT department without plugging it in"
    ],
    answer: "Hand it to security or IT department without plugging it in",
    scenario: "Unknown USB devices can contain malware. Never plug them into your computer."
  },
  {
    id: 5,
    question: "Your computer shows a pop-up saying 'Your computer is infected! Click here to scan and remove viruses.' What's your response?",
    options: [
      "Click the pop-up to run the scan",
      "Close the pop-up and run your own antivirus software",
      "Restart your computer immediately",
      "Take a screenshot and post it online for help"
    ],
    answer: "Close the pop-up and run your own antivirus software",
    scenario: "This is scareware - fake warnings designed to trick you into installing malware."
  },
  {
    id: 6,
    question: "You receive a call from 'Microsoft Support' saying your computer has issues they need to fix remotely. They sound professional. What do you do?",
    options: [
      "Allow them remote access to help fix the problem",
      "Ask for their employee ID and call Microsoft's official support number to verify",
      "Provide your computer details so they can help",
      "Hang up immediately and block the number"
    ],
    answer: "Ask for their employee ID and call Microsoft's official support number to verify",
    scenario: "Legitimate companies rarely make unsolicited support calls. Always verify through official channels."
  },
  {
    id: 7,
    question: "You're setting up a new online account and the website suggests using security questions. What's the most secure approach?",
    options: [
      "Use common facts like mother's maiden name or pet's name",
      "Create fictional answers that only you would know",
      "Use the same answers for all your accounts for consistency",
      "Skip security questions as they're not important"
    ],
    answer: "Create fictional answers that only you would know",
    scenario: "Common security questions can be researched or guessed. Fictional answers are more secure."
  },
  {
    id: 8,
    question: "Your company announces a data breach that may have exposed employee information. What should you do first?",
    options: [
      "Change your password on the company system immediately",
      "Wait for official instructions from the company",
      "Post about it on social media to warn colleagues",
      "Contact your bank to freeze your accounts"
    ],
    answer: "Change your password on the company system immediately",
    scenario: "In a breach, immediate password changes help prevent unauthorized access to your accounts."
  },
  {
    id: 9,
    question: "You're about to download software from a website. The download button is large and colorful, but there's a smaller 'direct download' link below. Which should you choose?",
    options: [
      "The large colorful button - it's more prominent",
      "The smaller 'direct download' link",
      "Neither - find the software on the official developer's website",
      "Both are probably safe, choose either"
    ],
    answer: "Neither - find the software on the official developer's website",
    scenario: "Download buttons on third-party sites often contain bundled adware or malware. Always download from official sources."
  },
  {
    id: 10,
    question: "You need to share a large file containing sensitive information with a colleague. What's the most secure method?",
    options: [
      "Email it as an attachment",
      "Use a cloud storage service with password protection and expiration date",
      "Upload it to a public file sharing service",
      "Put it on a USB drive and hand it to them"
    ],
    answer: "Use a cloud storage service with password protection and expiration date",
    scenario: "Email attachments can be intercepted. Secure cloud storage with access controls is safer for sensitive files."
  }
];

export default level3;
