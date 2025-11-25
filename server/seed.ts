import { db } from "./db";
import { articles, quizzes, quizAttempts, badges, users } from "@shared/schema";
import { eq } from "drizzle-orm";

// Simple hash for demo purposes (use bcrypt in production)
const hashPassword = (password: string) => Buffer.from(password).toString("base64");

const articleData = [
  {
    title: "How to Report Cyber Fraud in India: Complete Guide",
    slug: "how-to-report-cyber-fraud-india",
    category: "data-privacy",
    excerpt: "Step-by-step guide on how to report cyber fraud to Indian authorities and protect yourself from cybercriminals.",
    content: `
      <h2>Understanding Cyber Fraud</h2>
      <p>Cyber fraud is a serious crime where criminals use the internet or digital devices to deceive individuals and steal money, personal information, or data. In India, reporting cyber fraud is crucial for protecting yourself and others.</p>

      <h2>Step-by-Step Guide to Report Cyber Fraud in India</h2>

      <h3>Step 1: Gather Evidence</h3>
      <ul>
        <li>Collect all evidence of the cyber fraud including screenshots of suspicious emails or messages</li>
        <li>Save transaction details showing unauthorized payments</li>
        <li>Keep records of any communication with the fraudster</li>
        <li>Note down the website URL or app name used for fraud</li>
        <li>Save phone numbers or email addresses of the fraudster</li>
      </ul>

      <h3>Step 2: Document All Details</h3>
      <p><strong>Write down the following information:</strong></p>
      <ul>
        <li>Date and time of the fraud</li>
        <li>Amount of money involved</li>
        <li>Method used (email phishing, fake website, SMS scam, dating scam, etc.)</li>
        <li>Contact information of the fraudster if available</li>
        <li>Bank or payment method used</li>
        <li>Any account numbers involved</li>
      </ul>

      <h3>Step 3: Preserve Evidence Safely</h3>
      <p>Do not delete any evidence:</p>
      <ul>
        <li>Save emails in a separate folder</li>
        <li>Take screenshots of websites or messages</li>
        <li>Back up all files to a safe location</li>
        <li>Keep copies of bank statements showing fraudulent transactions</li>
      </ul>

      <h3>Step 4: File Report on National Cyber Crime Portal</h3>
      <p><strong>Visit: https://cybercrime.gov.in/</strong></p>
      <ul>
        <li>Click on "Report" button</li>
        <li>Select the type of cyber crime</li>
        <li>Fill in all required information accurately</li>
        <li>Attach screenshots and evidence</li>
        <li>Submit your complaint</li>
      </ul>

      <h3>Step 5: Get Complaint Number</h3>
      <p>After submission, you will receive:</p>
      <ul>
        <li>A unique complaint number</li>
        <li>Confirmation email with complaint details</li>
        <li>Reference number for future follow-up</li>
        <li>Save all this information for your records</li>
      </ul>

      <h3>Step 6: File FIR (First Information Report) at Police Station</h3>
      <p>For serious cyber fraud cases:</p>
      <ul>
        <li>Visit your nearest Cyber Police Station or local police station</li>
        <li>Bring your complaint number from NCRP portal</li>
        <li>Provide all evidence documents</li>
        <li>File an FIR (First Information Report)</li>
        <li>Get a copy of the FIR for your records</li>
      </ul>

      <h3>Step 7: Notify Your Bank Immediately</h3>
      <p>If financial fraud is involved:</p>
      <ul>
        <li>Call your bank's customer care hotline immediately</li>
        <li>Report unauthorized transactions</li>
        <li>Request to freeze your bank accounts if necessary</li>
        <li>File a complaint with your bank's fraud department</li>
        <li>Request a written acknowledgment of your complaint</li>
        <li>Consider disputing the transactions with your credit card company</li>
      </ul>

      <h3>Step 8: Monitor Your Accounts Regularly</h3>
      <p>After reporting fraud:</p>
      <ul>
        <li>Check your bank account statements frequently</li>
        <li>Monitor credit card transactions daily</li>
        <li>Check credit score on free portals like CIBIL or Experian</li>
        <li>Consider placing a fraud alert with credit bureaus</li>
        <li>Use credit monitoring services if available</li>
      </ul>

      <h2>Important Indian Cyber Crime Reporting Portals</h2>
      <p><strong>National Cyber Crime Reporting Portal (NCRP)</strong></p>
      <ul>
        <li>Website: https://cybercrime.gov.in/</li>
        <li>Available 24/7 for online complaints</li>
        <li>Anonymous reporting option available</li>
        <li>Track complaint status online</li>
      </ul>

      <p><strong>Contact Numbers:</strong></p>
      <ul>
        <li>National Cyber Crime Portal: 1930 (Toll-free)</li>
        <li>Police Emergency: 100</li>
        <li>RBI Anti-Fraud: 155260</li>
      </ul>

      <h2>Rights and Protections</h2>
      <p>When you report cyber fraud in India:</p>
      <ul>
        <li>Your complaint is registered with law enforcement</li>
        <li>Investigation is initiated by cyber police</li>
        <li>You can track your complaint status online</li>
        <li>You're protected under cybercrime laws</li>
        <li>Evidence is preserved for legal proceedings</li>
      </ul>

      <h2>Prevention Tips</h2>
      <p>To avoid cyber fraud in the future:</p>
      <ul>
        <li>Never share your OTP, password, or banking details with anyone</li>
        <li>Verify email addresses carefully before clicking links</li>
        <li>Use strong, unique passwords for each account</li>
        <li>Enable two-factor authentication on all accounts</li>
        <li>Be cautious of unsolicited phone calls or messages</li>
        <li>Use official websites and apps only</li>
      </ul>

      <h2>Support Resources</h2>
      <p>If you need help or support after cyber fraud:</p>
      <ul>
        <li>Contact your local cyber police station</li>
        <li>Call the National Cyber Crime Portal helpline</li>
        <li>Visit https://cybercrime.gov.in/ for resources</li>
        <li>Contact consumer protection departments</li>
      </ul>
    `,
    readTime: 12,
    difficulty: "beginner",
  },
  {
    title: "Understanding Phishing: How to Spot Fake Emails",
    slug: "understanding-phishing-spot-fake-emails",
    category: "phishing",
    excerpt: "Learn to identify and avoid phishing attacks that aim to steal your personal information through deceptive emails.",
    content: `
      <h2>What is Phishing?</h2>
      <p>Phishing is a cybercrime where attackers impersonate legitimate organizations to trick individuals into revealing sensitive information such as passwords, credit card numbers, and personal data.</p>
      
      <h2>Common Signs of Phishing Emails</h2>
      <ul>
        <li><strong>Suspicious sender address:</strong> Check the email address carefully. Phishers often use addresses that look similar to legitimate ones but contain slight variations.</li>
        <li><strong>Urgent language:</strong> Phrases like "Act now!" or "Your account will be suspended" create panic and pressure you to act quickly.</li>
        <li><strong>Generic greetings:</strong> Legitimate companies usually address you by name, while phishing emails often use "Dear Customer" or "Dear User".</li>
        <li><strong>Spelling and grammar errors:</strong> Professional organizations proofread their communications. Multiple errors are a red flag.</li>
        <li><strong>Suspicious links:</strong> Hover over links before clicking. If the URL looks strange or doesn't match the supposed sender, don't click it.</li>
      </ul>
      
      <h2>How to Protect Yourself</h2>
      <p><strong>1. Verify before you trust:</strong> If an email seems suspicious, contact the organization directly using a phone number or website you know is legitimate—not contact information from the suspicious email.</p>
      <p><strong>2. Enable multi-factor authentication:</strong> Even if your password is compromised, MFA adds an extra layer of security.</p>
      <p><strong>3. Keep software updated:</strong> Security updates often patch vulnerabilities that phishers exploit.</p>
      <p><strong>4. Report phishing attempts:</strong> Forward suspicious emails to your IT department or report them to organizations like the FTC.</p>
      
      <h2>What to Do If You Fall Victim</h2>
      <p>If you've clicked a phishing link or provided information:</p>
      <ol>
        <li>Change your passwords immediately</li>
        <li>Monitor your accounts for suspicious activity</li>
        <li>Report the incident to the relevant organizations</li>
        <li>Consider placing a fraud alert on your credit reports</li>
      </ol>
    `,
    readTime: 5,
    difficulty: "beginner",
  },
  {
    title: "Password Security Best Practices",
    slug: "password-security-best-practices",
    category: "passwords",
    excerpt: "Create strong, unique passwords and manage them securely to protect your online accounts from unauthorized access.",
    content: `
      <h2>The Importance of Strong Passwords</h2>
      <p>Passwords are the first line of defense for your online accounts. Weak passwords make it easy for attackers to gain unauthorized access to your sensitive information.</p>
      
      <h2>Creating Strong Passwords</h2>
      <p><strong>Length matters:</strong> Use at least 12 characters. Longer passwords are exponentially harder to crack.</p>
      <p><strong>Mix it up:</strong> Combine uppercase and lowercase letters, numbers, and special characters.</p>
      <p><strong>Avoid predictability:</strong> Don't use common words, personal information, or simple patterns like "12345" or "password".</p>
      <p><strong>Use passphrases:</strong> Consider using a memorable phrase with random words, like "BlueMoon-Dancing-Coffee92!"</p>
      
      <h2>Password Management</h2>
      <ul>
        <li><strong>Unique passwords for each account:</strong> If one account is breached, others remain secure.</li>
        <li><strong>Use a password manager:</strong> Tools like Bitwarden, 1Password, or LastPass generate and securely store strong passwords.</li>
        <li><strong>Enable two-factor authentication (2FA):</strong> Adds an extra security layer beyond just your password.</li>
        <li><strong>Regular updates:</strong> Change passwords periodically, especially for critical accounts.</li>
      </ul>
      
      <h2>Common Mistakes to Avoid</h2>
      <p>❌ <strong>Reusing passwords:</strong> Using the same password across multiple sites is risky.</p>
      <p>❌ <strong>Storing passwords insecurely:</strong> Avoid saving passwords in plain text files or browser auto-fill without additional security.</p>
      <p>❌ <strong>Sharing passwords:</strong> Never share your passwords via email or messaging apps.</p>
      <p>❌ <strong>Using public Wi-Fi for sensitive logins:</strong> Public networks can be intercepted by attackers.</p>
      
      <h2>What to Do If Your Password Is Compromised</h2>
      <ol>
        <li>Change the password immediately</li>
        <li>Check for any unauthorized account activity</li>
        <li>Update passwords for accounts that share the same password</li>
        <li>Enable 2FA if not already active</li>
        <li>Monitor your accounts for suspicious behavior</li>
      </ol>
    `,
    readTime: 6,
    difficulty: "beginner",
  },
  {
    title: "Malware Protection: Defending Against Digital Threats",
    slug: "malware-protection-defending-digital-threats",
    category: "malware",
    excerpt: "Understand different types of malware and learn effective strategies to protect your devices and data.",
    content: `
      <h2>What is Malware?</h2>
      <p>Malware (malicious software) is any software designed to harm, exploit, or otherwise compromise a computer system, network, or user. It comes in many forms and can cause severe damage to your devices and data.</p>
      
      <h2>Types of Malware</h2>
      <p><strong>Viruses:</strong> Attach themselves to legitimate programs and spread when the program is executed.</p>
      <p><strong>Worms:</strong> Self-replicating malware that spreads across networks without user action.</p>
      <p><strong>Trojans:</strong> Disguise themselves as legitimate software but perform malicious actions once installed.</p>
      <p><strong>Ransomware:</strong> Encrypts your files and demands payment for the decryption key.</p>
      <p><strong>Spyware:</strong> Secretly monitors your activities and collects personal information.</p>
      <p><strong>Adware:</strong> Displays unwanted advertisements and can track browsing behavior.</p>
      
      <h2>How Malware Spreads</h2>
      <ul>
        <li>Email attachments from unknown senders</li>
        <li>Malicious website downloads</li>
        <li>Infected USB drives or external devices</li>
        <li>Software vulnerabilities and security holes</li>
        <li>Fake software updates or pop-ups</li>
        <li>Peer-to-peer file sharing networks</li>
      </ul>
      
      <h2>Protection Strategies</h2>
      <p><strong>1. Install and maintain antivirus software:</strong> Use reputable security software and keep it updated.</p>
      <p><strong>2. Keep your OS and software updated:</strong> Security patches fix vulnerabilities that malware exploits.</p>
      <p><strong>3. Be cautious with downloads:</strong> Only download software from official sources.</p>
      <p><strong>4. Use a firewall:</strong> Both hardware and software firewalls add layers of protection.</p>
      <p><strong>5. Regular backups:</strong> Maintain offline backups of important data.</p>
      <p><strong>6. Email vigilance:</strong> Don't open attachments or click links from unknown senders.</p>
      
      <h2>Signs Your Device May Be Infected</h2>
      <ul>
        <li>Slow performance or frequent crashes</li>
        <li>Unexpected pop-ups or ads</li>
        <li>Unknown programs running on startup</li>
        <li>Unusual network activity</li>
        <li>Changed browser homepage or settings</li>
        <li>Disabled antivirus or security software</li>
      </ul>
      
      <h2>Recovery Steps</h2>
      <ol>
        <li>Disconnect from the internet</li>
        <li>Run a full system scan with updated antivirus</li>
        <li>Remove detected threats</li>
        <li>Change your passwords</li>
        <li>Monitor accounts for suspicious activity</li>
        <li>Consider professional help for severe infections</li>
      </ol>
    `,
    readTime: 7,
    difficulty: "intermediate",
  },
  {
    title: "Safe Browsing Habits for Online Security",
    slug: "safe-browsing-habits-online-security",
    category: "safe-browsing",
    excerpt: "Develop secure browsing practices to protect your privacy and avoid online threats while surfing the web.",
    content: `
      <h2>The Importance of Safe Browsing</h2>
      <p>Your web browser is a gateway to the internet, making it a prime target for cybercriminals. Practicing safe browsing habits significantly reduces your risk of encountering malware, phishing, and other online threats.</p>
      
      <h2>Secure Browsing Checklist</h2>
      <p><strong>✓ Use HTTPS:</strong> Look for the padlock icon in the address bar. HTTPS encrypts data between your browser and the website.</p>
      <p><strong>✓ Keep browsers updated:</strong> Updates include critical security patches.</p>
      <p><strong>✓ Use reputable browsers:</strong> Stick with well-known browsers like Chrome, Firefox, Safari, or Edge.</p>
      <p><strong>✓ Clear cookies and cache regularly:</strong> This removes tracking data and temporary files.</p>
      <p><strong>✓ Use private/incognito mode:</strong> For sensitive browsing sessions, though it doesn't make you completely anonymous.</p>
      
      <h2>Browser Extensions and Settings</h2>
      <ul>
        <li><strong>Ad blockers:</strong> Block malicious ads that may contain malware.</li>
        <li><strong>Privacy extensions:</strong> Tools like Privacy Badger or uBlock Origin enhance security.</li>
        <li><strong>Script blockers:</strong> Extensions like NoScript prevent unwanted scripts from running.</li>
        <li><strong>Disable pop-ups:</strong> Configure your browser to block pop-up windows.</li>
        <li><strong>Manage permissions:</strong> Review and limit site permissions for camera, location, and notifications.</li>
      </ul>
      
      <h2>Recognizing Unsafe Websites</h2>
      <p>🚫 <strong>No HTTPS:</strong> Avoid entering sensitive information on non-HTTPS sites.</p>
      <p>🚫 <strong>Poor design:</strong> Legitimate sites usually have professional layouts.</p>
      <p>🚫 <strong>Too-good-to-be-true offers:</strong> Scam sites often promise unrealistic deals.</p>
      <p>🚫 <strong>Excessive ads or pop-ups:</strong> A sign of potentially malicious intent.</p>
      <p>🚫 <strong>Suspicious URLs:</strong> Check for misspellings or unusual domain extensions.</p>
      
      <h2>Public Wi-Fi Safety</h2>
      <p>Public networks are convenient but risky. When using public Wi-Fi:</p>
      <ol>
        <li>Avoid accessing sensitive accounts</li>
        <li>Use a VPN to encrypt your connection</li>
        <li>Disable file sharing</li>
        <li>Turn off automatic Wi-Fi connection</li>
        <li>Forget the network after use</li>
      </ol>
      
      <h2>Download Safety</h2>
      <ul>
        <li>Only download from official websites or app stores</li>
        <li>Verify file authenticity before opening</li>
        <li>Scan downloads with antivirus software</li>
        <li>Be wary of unexpected email attachments</li>
        <li>Check file extensions (avoid .exe from unknown sources)</li>
      </ul>
    `,
    readTime: 6,
    difficulty: "beginner",
  },
  {
    title: "Data Privacy: Protecting Your Personal Information",
    slug: "data-privacy-protecting-personal-information",
    category: "data-privacy",
    excerpt: "Learn how to safeguard your personal data and maintain control over your digital footprint in an increasingly connected world.",
    content: `
      <h2>Understanding Data Privacy</h2>
      <p>Data privacy refers to the protection of personal information from unauthorized access and use. In our digital age, vast amounts of personal data are collected, stored, and shared, making privacy protection more important than ever.</p>
      
      <h2>Types of Personal Data</h2>
      <p><strong>Identifiable information:</strong> Name, address, phone number, email, Social Security number.</p>
      <p><strong>Financial data:</strong> Bank accounts, credit card numbers, transaction history.</p>
      <p><strong>Health information:</strong> Medical records, insurance details, genetic data.</p>
      <p><strong>Digital footprint:</strong> Browsing history, social media activity, location data.</p>
      <p><strong>Biometric data:</strong> Fingerprints, facial recognition, voice patterns.</p>
      
      <h2>Common Data Privacy Risks</h2>
      <ul>
        <li><strong>Data breaches:</strong> Unauthorized access to databases containing personal information.</li>
        <li><strong>Identity theft:</strong> Criminals using your personal data to commit fraud.</li>
        <li><strong>Tracking and profiling:</strong> Companies collecting data to build detailed user profiles.</li>
        <li><strong>Data selling:</strong> Third parties purchasing your information without consent.</li>
        <li><strong>Government surveillance:</strong> Mass data collection programs.</li>
      </ul>
      
      <h2>Protecting Your Privacy Online</h2>
      <p><strong>1. Review privacy settings:</strong> Regularly check and adjust privacy settings on social media and online accounts.</p>
      <p><strong>2. Limit information sharing:</strong> Only provide necessary information when creating accounts.</p>
      <p><strong>3. Read privacy policies:</strong> Understand how companies use your data before agreeing.</p>
      <p><strong>4. Use privacy-focused tools:</strong> Consider services like DuckDuckGo, ProtonMail, or Signal.</p>
      <p><strong>5. Opt out of data collection:</strong> Use tools like "Do Not Track" and opt-out registries.</p>
      <p><strong>6. Encrypt sensitive communications:</strong> Use end-to-end encrypted messaging apps.</p>
      
      <h2>Social Media Privacy</h2>
      <p>Social platforms collect extensive data. Protect yourself by:</p>
      <ul>
        <li>Setting profiles to private</li>
        <li>Limiting who can see your posts and photos</li>
        <li>Being selective about friend/follower requests</li>
        <li>Avoiding oversharing personal details</li>
        <li>Regularly reviewing tagged photos</li>
        <li>Disabling location tracking</li>
      </ul>
      
      <h2>Data Rights and Regulations</h2>
      <p><strong>GDPR (Europe):</strong> Gives individuals control over their personal data.</p>
      <p><strong>CCPA (California):</strong> Provides consumers rights regarding their personal information.</p>
      <p><strong>Your rights typically include:</strong></p>
      <ol>
        <li>Right to access your data</li>
        <li>Right to deletion ("right to be forgotten")</li>
        <li>Right to data portability</li>
        <li>Right to opt-out of data selling</li>
        <li>Right to know what data is collected</li>
      </ol>
      
      <h2>Best Practices</h2>
      <ul>
        <li>Use strong, unique passwords for each account</li>
        <li>Enable two-factor authentication</li>
        <li>Regularly review app permissions on your devices</li>
        <li>Clear cookies and browsing data periodically</li>
        <li>Use a VPN for additional privacy</li>
        <li>Be cautious about public records and directory listings</li>
      </ul>
    `,
    readTime: 8,
    difficulty: "intermediate",
  },
  {
    title: "Social Engineering: Recognizing Manipulation Tactics",
    slug: "social-engineering-recognizing-manipulation-tactics",
    category: "social-engineering",
    excerpt: "Understand how attackers use psychological manipulation to exploit human behavior and learn to defend against these tactics.",
    content: `
      <h2>What is Social Engineering?</h2>
      <p>Social engineering is the art of manipulating people into divulging confidential information or performing actions that compromise security. Unlike technical hacking, social engineering exploits human psychology rather than system vulnerabilities.</p>
      
      <h2>Common Social Engineering Techniques</h2>
      <p><strong>Pretexting:</strong> Creating a fabricated scenario to obtain information. Example: Someone posing as IT support asking for your password.</p>
      <p><strong>Baiting:</strong> Offering something enticing to trick victims. Example: Free USB drives in parking lots loaded with malware.</p>
      <p><strong>Phishing:</strong> Fraudulent emails or messages appearing to be from trusted sources.</p>
      <p><strong>Vishing (Voice Phishing):</strong> Phone calls from scammers pretending to be legitimate organizations.</p>
      <p><strong>Tailgating:</strong> Following authorized personnel into restricted areas.</p>
      <p><strong>Quid Pro Quo:</strong> Offering a service in exchange for information. Example: "Free tech support" asking for credentials.</p>
      
      <h2>Psychological Principles Exploited</h2>
      <ul>
        <li><strong>Authority:</strong> People tend to comply with those who appear to be in positions of authority.</li>
        <li><strong>Urgency:</strong> Creating time pressure prevents careful consideration.</li>
        <li><strong>Trust:</strong> Appearing trustworthy or leveraging existing relationships.</li>
        <li><strong>Fear:</strong> Threatening negative consequences to prompt action.</li>
        <li><strong>Greed:</strong> Offering rewards or benefits that seem too good to refuse.</li>
        <li><strong>Curiosity:</strong> Exploiting natural human inquisitiveness.</li>
      </ul>
      
      <h2>Real-World Examples</h2>
      <p><strong>The CEO Fraud:</strong> An email appearing to be from a company executive requesting an urgent wire transfer.</p>
      <p><strong>Tech Support Scam:</strong> A call claiming your computer has viruses and offering to "fix" it remotely.</p>
      <p><strong>LinkedIn Recruiter:</strong> Fake job offers used to extract personal information.</p>
      <p><strong>Charity Scams:</strong> Fraudulent donation requests following disasters.</p>
      
      <h2>Red Flags to Watch For</h2>
      <p>🚩 Requests for sensitive information via email or phone</p>
      <p>🚩 Pressure to act quickly without time to verify</p>
      <p>🚩 Unusual requests from known contacts</p>
      <p>🚩 Offers that seem too good to be true</p>
      <p>🚩 Unsolicited contact requesting personal details</p>
      <p>🚩 Requests to bypass normal procedures</p>
      
      <h2>Defense Strategies</h2>
      <p><strong>1. Verify identities:</strong> Always confirm requests through known channels, not contact information provided in suspicious messages.</p>
      <p><strong>2. Be skeptical:</strong> Question unusual requests, especially those involving money or sensitive data.</p>
      <p><strong>3. Don't overshare:</strong> Limit personal information shared on social media and public platforms.</p>
      <p><strong>4. Follow protocols:</strong> Adhere to organizational security policies and procedures.</p>
      <p><strong>5. Educate yourself:</strong> Stay informed about latest social engineering tactics.</p>
      <p><strong>6. Report suspicious activity:</strong> Alert your IT or security team about potential attacks.</p>
      
      <h2>Organizational Protection</h2>
      <ul>
        <li>Implement security awareness training</li>
        <li>Establish clear verification procedures</li>
        <li>Create a culture of security consciousness</li>
        <li>Use multi-factor authentication</li>
        <li>Regularly test employees with simulated attacks</li>
        <li>Develop incident response protocols</li>
      </ul>
    `,
    readTime: 7,
    difficulty: "advanced",
  },
];

const quizData = [
  {
    title: "Phishing Basics Quiz",
    category: "phishing",
    difficulty: "beginner",
    questions: [
      {
        question: "What is the main goal of a phishing attack?",
        options: [
          "To slow down your internet connection",
          "To steal personal information or login credentials",
          "To install antivirus software",
          "To improve email security"
        ],
        correctAnswer: 1,
        explanation: "Phishing attacks aim to trick people into revealing sensitive information like passwords, credit card numbers, or other personal data."
      },
      {
        question: "Which of these is a common sign of a phishing email?",
        options: [
          "Personalized greeting with your full name",
          "Official company email address",
          "Urgent language creating pressure to act immediately",
          "Professional formatting and no spelling errors"
        ],
        correctAnswer: 2,
        explanation: "Phishing emails often use urgent language to create panic and pressure you into acting without thinking carefully."
      },
      {
        question: "What should you do if you receive a suspicious email asking for your password?",
        options: [
          "Reply with your password if it looks official",
          "Click the link to verify it's legitimate",
          "Delete it and report it to IT/security team",
          "Forward it to all your contacts"
        ],
        correctAnswer: 2,
        explanation: "Never provide your password via email. Delete suspicious emails and report them to your IT or security team."
      },
      {
        question: "How can you check if a link in an email is suspicious?",
        options: [
          "Click it to see where it goes",
          "Hover over it to preview the actual URL",
          "Ask the sender if it's safe",
          "Links in emails are always safe"
        ],
        correctAnswer: 1,
        explanation: "Hovering over a link shows you the actual URL before clicking. If it looks strange or doesn't match the supposed sender, don't click it."
      },
      {
        question: "What is 'spear phishing'?",
        options: [
          "Phishing attacks that target fish",
          "Generic phishing emails sent to many people",
          "Targeted phishing attacks personalized for specific individuals",
          "Phishing attacks using spear weapons"
        ],
        correctAnswer: 2,
        explanation: "Spear phishing is a targeted attack customized for a specific person or organization, making it harder to detect than generic phishing."
      }
    ]
  },
  {
    title: "Password Security Quiz",
    category: "passwords",
    difficulty: "beginner",
    questions: [
      {
        question: "What is the recommended minimum length for a strong password?",
        options: [
          "6 characters",
          "8 characters",
          "12 characters",
          "20 characters"
        ],
        correctAnswer: 2,
        explanation: "Security experts recommend passwords be at least 12 characters long. Longer passwords are exponentially harder to crack."
      },
      {
        question: "Which password is the strongest?",
        options: [
          "password123",
          "JohnDoe1990",
          "Tr0ub4dor&3",
          "BlueMoon-Dancing-Coffee92!"
        ],
        correctAnswer: 3,
        explanation: "The passphrase using random words with numbers and symbols is strongest. It's long, complex, and harder to guess than common patterns."
      },
      {
        question: "Why should you use different passwords for different accounts?",
        options: [
          "It's easier to remember multiple passwords",
          "If one account is breached, others remain secure",
          "Websites require it by law",
          "It makes your accounts slower to access"
        ],
        correctAnswer: 1,
        explanation: "Using unique passwords prevents a single breach from compromising all your accounts. If one password is leaked, your other accounts stay protected."
      },
      {
        question: "What is two-factor authentication (2FA)?",
        options: [
          "Using two different passwords",
          "An additional security step beyond your password",
          "Logging in from two different devices",
          "Having two email addresses"
        ],
        correctAnswer: 1,
        explanation: "2FA adds an extra layer of security by requiring a second form of verification (like a code from your phone) in addition to your password."
      },
      {
        question: "What's the best way to manage many complex passwords?",
        options: [
          "Write them all in a notebook",
          "Use the same password for everything",
          "Store them in a text file on your computer",
          "Use a reputable password manager"
        ],
        correctAnswer: 3,
        explanation: "Password managers securely store and generate strong passwords. They're much safer than physical notes or reusing passwords."
      }
    ]
  },
  {
    title: "Malware Protection Quiz",
    category: "malware",
    difficulty: "intermediate",
    questions: [
      {
        question: "What is ransomware?",
        options: [
          "Software that speeds up your computer",
          "Malware that encrypts your files and demands payment",
          "A type of antivirus program",
          "Free software downloads"
        ],
        correctAnswer: 1,
        explanation: "Ransomware locks or encrypts your files and demands payment (usually in cryptocurrency) for the decryption key."
      },
      {
        question: "Which of these is NOT a common way malware spreads?",
        options: [
          "Email attachments from unknown senders",
          "Infected USB drives",
          "Updating your operating system",
          "Downloading pirated software"
        ],
        correctAnswer: 2,
        explanation: "Updating your operating system is actually a protection against malware, as updates patch security vulnerabilities."
      },
      {
        question: "What should you do first if you suspect your computer is infected?",
        options: [
          "Restart your computer",
          "Disconnect from the internet",
          "Delete all your files",
          "Send an email to everyone in your contacts"
        ],
        correctAnswer: 1,
        explanation: "Disconnecting from the internet prevents malware from spreading to other devices or sending your data to attackers."
      },
      {
        question: "What is a Trojan horse in cybersecurity?",
        options: [
          "A large wooden horse used in ancient battles",
          "Malware disguised as legitimate software",
          "A type of firewall",
          "An encryption method"
        ],
        correctAnswer: 1,
        explanation: "Like the ancient Greek story, a Trojan appears legitimate but contains malicious code that executes once installed."
      },
      {
        question: "Why is keeping your software updated important for malware protection?",
        options: [
          "Updates make your computer faster",
          "Updates add new features",
          "Updates patch security vulnerabilities",
          "Updates change the color scheme"
        ],
        correctAnswer: 2,
        explanation: "Software updates often include security patches that fix vulnerabilities exploited by malware. Running outdated software leaves you exposed."
      }
    ]
  },
  {
    title: "Social Engineering Quiz",
    category: "social-engineering",
    difficulty: "advanced",
    questions: [
      {
        question: "What is the primary target of social engineering attacks?",
        options: [
          "Computer hardware",
          "Network firewalls",
          "Human psychology and behavior",
          "Antivirus software"
        ],
        correctAnswer: 2,
        explanation: "Social engineering exploits human psychology—trust, fear, curiosity—rather than technical vulnerabilities in systems."
      },
      {
        question: "You receive a call from someone claiming to be from IT support asking for your password to 'fix a problem.' What should you do?",
        options: [
          "Provide your password immediately",
          "Ask for their employee ID and verify through official channels",
          "Give them a fake password",
          "Hang up and ignore it"
        ],
        correctAnswer: 1,
        explanation: "Verify the caller's identity through official company channels. Legitimate IT will never ask for your password."
      },
      {
        question: "What is 'pretexting' in social engineering?",
        options: [
          "Sending text messages with links",
          "Creating a fabricated scenario to obtain information",
          "Reading text before publishing",
          "Using encryption on text files"
        ],
        correctAnswer: 1,
        explanation: "Pretexting involves creating a false scenario or identity to manipulate victims into divulging information or performing actions."
      },
      {
        question: "Which psychological principle do attackers exploit when they create urgent deadlines?",
        options: [
          "Greed",
          "Curiosity",
          "Fear and pressure",
          "Authority"
        ],
        correctAnswer: 2,
        explanation: "Creating urgency prevents victims from thinking carefully. Time pressure makes people more likely to comply without verification."
      },
      {
        question: "What is 'tailgating' in the context of physical security?",
        options: [
          "Following someone's car too closely",
          "Unauthorized access by following authorized personnel",
          "Reading someone's emails over their shoulder",
          "Copying someone's work"
        ],
        correctAnswer: 1,
        explanation: "Tailgating is when an unauthorized person follows an authorized person into a restricted area, exploiting politeness or inattention."
      }
    ]
  }
];

const badgeData = [
  {
    name: "First Steps",
    description: "Complete your first quiz",
    icon: "Zap",
    requirement: "Complete 1 quiz",
  },
  {
    name: "Quiz Master",
    description: "Score 100% on a quiz",
    icon: "Star",
    requirement: "Score 100% on any quiz",
  },
  {
    name: "Persistent Learner",
    description: "Complete 10 quizzes",
    icon: "BookOpen",
    requirement: "Complete 10 quizzes",
  },
  {
    name: "Top Performer",
    description: "Maintain 90% average score",
    icon: "Trophy",
    requirement: "Average score of 90%+",
  },
  {
    name: "Security Expert",
    description: "Read all articles",
    icon: "Shield",
    requirement: "View all articles",
  },
  {
    name: "Incident Reporter",
    description: "File an incident report",
    icon: "AlertTriangle",
    requirement: "Submit incident report",
  },
  {
    name: "Community Champion",
    description: "Rank in top 10 leaderboard",
    icon: "Users",
    requirement: "Top 10 leaderboard",
  },
  {
    name: "Cyber Guardian",
    description: "Complete intermediate & advanced quizzes",
    icon: "Lock",
    requirement: "Complete all difficulty levels",
  },
];

export async function seedDatabase() {
  try {
    console.log("🌱 Starting database seed...");

    // Clear existing data
    await db.delete(quizAttempts);
    await db.delete(articles);
    await db.delete(quizzes);

    // Seed demo user for local auth if it doesn't exist
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, "test@example.com"),
    });
    
    if (!existingUser && process.env.USE_LOCAL_AUTH === "true") {
      console.log("👤 Creating demo user for local auth...");
      await db.insert(users).values({
        email: "test@example.com",
        firstName: "Test",
        profileImageUrl: hashPassword("test123"), // Store hashed password temporarily
      });
      console.log("✅ Demo user created (test@example.com / test123)");
    }

    // Seed articles
    console.log("📚 Seeding articles...");
    for (const article of articleData) {
      await db.insert(articles).values(article);
    }
    console.log(`✅ Seeded ${articleData.length} articles`);

    // Seed quizzes
    console.log("🧠 Seeding quizzes...");
    for (const quiz of quizData) {
      await db.insert(quizzes).values(quiz);
    }
    console.log(`✅ Seeded ${quizData.length} quizzes`);

    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}
