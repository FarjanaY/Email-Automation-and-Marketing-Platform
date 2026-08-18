//External Imports
import {
  Mail,
  Newspaper,
  Tag,
  MessageSquareText,
  CircleDot,
  Star,
  Phone,
  AlignLeft,
  Upload,
  MessageSquare,
  TrendingUp,
  CalendarCheck,
  MessageCircle,
  ClipboardList,
  MonitorPlay,
  ListPlus,
  Briefcase,
  UserPlus,
  LogIn,
} from "lucide-react";

export const EMAIL_TEMPLATES = [
  {
    key: "welcome",
    name: "Welcome Email",
    icon: Mail,
    subject: "Welcome to Email Automation & Marketing Platform!",
    blocks: {
      paragraphs: [
        "Welcome to our community! We're excited to have you here.",
        "Here's everything you need to know to get started and make the most of your experience.",
      ],
      image: {
        url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800",
      },
      button: { text: "Get Started", href: "https://example.com/get-started" },
    },
  },
  {
    key: "newsletter",
    name: "Newsletter",
    icon: Newspaper,
    subject: "This Week's Top Picks",
    heading: "Your Weekly Digest",
    body: "Catch up on the latest updates, tips, and stories handpicked just for you.",
    cta: "Read More",
    blocks: {
      paragraphs: [
        "Here's your weekly roundup of the best stories, tips, and updates from our community.",
        "Don't miss this week's featured articles and upcoming events below.",
      ],
      image: {
        url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800",
      },
      button: {
        text: "Read the Full Newsletter",
        href: "https://example.com/newsletter",
      },
    },
  },
  {
    key: "promotional",
    name: "Promotional",
    icon: Tag,
    subject: "Limited Time Offer Inside",
    heading: "Save 20% Today Only",
    body: "Don't miss out — grab this exclusive discount before it disappears.",
    cta: "Shop Now",
    blocks: {
      paragraphs: [
        "For a limited time, enjoy 20% off your next order with our exclusive promo.",
        "Hurry — this offer ends soon and applies to your entire purchase.",
      ],
      image: {
        url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
      },
      button: {
        text: "Shop Now",
        href: "https://example.com/shop-now",
      },
    },
  },
];

export const QUICK_ADD_FIELDS = [
  {
    icon: MessageSquareText,
    buttonLabel: "Add Text Block",
    label: "Text Block",
    placeholder: "Enter text",
    fieldType: "Short Text",
  },
  {
    icon: CircleDot,
    buttonLabel: "Add Single Response",
    label: "Single Response",
    placeholder: "Your answer",
    fieldType: "Short Text",
  },
  {
    icon: Star,
    buttonLabel: "Add Rating",
    label: "Rating",
    placeholder: "Rate 1-5",
    fieldType: "Numeric Input",
  },
  {
    icon: Phone,
    buttonLabel: "Add Phone Number",
    label: "Phone Number",
    placeholder: "+1 234 567 8900",
    fieldType: "Short Text",
  },
  {
    icon: AlignLeft,
    buttonLabel: "Add Short Answer",
    label: "Short Answer",
    placeholder: "Your answer",
    fieldType: "Short Text",
  },
  {
    icon: Upload,
    buttonLabel: "Add File Upload",
    label: "File Upload",
    placeholder: "Choose a file",
    fieldType: "Short Text",
  },
];

export const FORM_TEMPLATES = [
  {
    key: "newsletter-signup",
    name: "Newsletter Signup",
    icon: Mail,
    popular: true,
    fields: [
      {
        label: "Full Name",
        fieldType: "Short Text",
        placeholder: "Enter your name",
        required: true,
      },
      {
        label: "Email",
        fieldType: "Email",
        placeholder: "you@example.com",
        required: true,
      },
      {
        label: "I agree to receive marketing emails",
        fieldType: "Agree",
        required: true,
      },
    ],
  },
  {
    key: "contact-us",
    name: "Contact Us",
    icon: MessageSquare,
    popular: true,
    fields: [
      {
        label: "Full Name",
        fieldType: "Short Text",
        placeholder: "Enter your name",
        required: true,
      },
      {
        label: "Email",
        fieldType: "Email",
        placeholder: "you@example.com",
        required: true,
      },
      {
        label: "Phone Number",
        fieldType: "Short Text",
        placeholder: "+1 234 567 8900",
        required: false,
      },
      {
        label: "Message",
        fieldType: "Paragraph",
        placeholder: "How can we help you?",
        required: true,
      },
    ],
  },
  {
    key: "lead-generation",
    name: "Lead Generation",
    icon: TrendingUp,
    popular: true,
    fields: [
      {
        label: "Full Name",
        fieldType: "Short Text",
        placeholder: "Enter your name",
        required: true,
      },
      {
        label: "Work Email",
        fieldType: "Email",
        placeholder: "you@company.com",
        required: true,
      },
      {
        label: "Company Name",
        fieldType: "Short Text",
        placeholder: "Enter company name",
        required: true,
      },
      {
        label: "Phone Number",
        fieldType: "Short Text",
        placeholder: "+1 234 567 8900",
        required: false,
      },
      {
        label: "What are you interested in?",
        fieldType: "Paragraph",
        placeholder: "Tell us a bit more",
        required: false,
      },
    ],
  },
  {
    key: "event-registration",
    name: "Event Registration",
    icon: CalendarCheck,
    fields: [
      {
        label: "Full Name",
        fieldType: "Short Text",
        placeholder: "Enter your name",
        required: true,
      },
      {
        label: "Email",
        fieldType: "Email",
        placeholder: "you@example.com",
        required: true,
      },
      {
        label: "Phone Number",
        fieldType: "Short Text",
        placeholder: "+1 234 567 8900",
        required: false,
      },
      {
        label: "Number of Guests",
        fieldType: "Numeric Input",
        placeholder: "e.g. 2",
        required: true,
      },
      {
        label: "Event Date",
        fieldType: "Date Picker",
        placeholder: "YYYY-MM-DD",
        required: true,
      },
      {
        label: "Dietary Requirements",
        fieldType: "Single Choice",
        options: ["None", "Vegetarian", "Vegan", "Gluten-Free"],
        required: false,
      },
      {
        label: "I agree to the event terms & conditions",
        fieldType: "Agree",
        required: true,
      },
    ],
  },
  {
    key: "feedback",
    name: "Feedback",
    icon: MessageCircle,
    fields: [
      {
        label: "Full Name",
        fieldType: "Short Text",
        placeholder: "Enter your name",
        required: false,
      },
      {
        label: "Email",
        fieldType: "Email",
        placeholder: "you@example.com",
        required: false,
      },
      {
        label: "How would you rate your experience?",
        fieldType: "Single Choice",
        options: ["1", "2", "3", "4", "5"],
        required: true,
      },
      {
        label: "Comments",
        fieldType: "Paragraph",
        placeholder: "Share your feedback",
        required: false,
      },
    ],
  },
  {
    key: "customer-survey",
    name: "Customer Survey",
    icon: ClipboardList,
    fields: [
      {
        label: "Full Name",
        fieldType: "Short Text",
        placeholder: "Enter your name",
        required: false,
      },
      {
        label: "Email",
        fieldType: "Email",
        placeholder: "you@example.com",
        required: true,
      },
      {
        label: "How did you hear about us?",
        fieldType: "Single Choice",
        options: [
          "Social Media",
          "Friend/Referral",
          "Search Engine",
          "Advertisement",
          "Other",
        ],
        required: false,
      },
      {
        label: "Which features do you use?",
        fieldType: "Multiple Choice",
        options: ["Email Campaigns", "Automation", "Templates", "Analytics"],
        required: false,
      },
      {
        label: "Overall Satisfaction",
        fieldType: "Single Choice",
        options: ["Very Satisfied", "Satisfied", "Neutral", "Unsatisfied"],
        required: true,
      },
      {
        label: "Additional Comments",
        fieldType: "Paragraph",
        placeholder: "Anything else to share?",
        required: false,
      },
    ],
  },
  {
    key: "demo-request",
    name: "Demo Request",
    icon: MonitorPlay,
    fields: [
      {
        label: "Full Name",
        fieldType: "Short Text",
        placeholder: "Enter your name",
        required: true,
      },
      {
        label: "Work Email",
        fieldType: "Email",
        placeholder: "you@company.com",
        required: true,
      },
      {
        label: "Company Name",
        fieldType: "Short Text",
        placeholder: "Enter company name",
        required: true,
      },
      {
        label: "Phone Number",
        fieldType: "Short Text",
        placeholder: "+1 234 567 8900",
        required: false,
      },
      {
        label: "Company Size",
        fieldType: "Single Choice",
        options: ["1-10", "11-50", "51-200", "201-500", "500+"],
        required: false,
      },
      {
        label: "Preferred Demo Date",
        fieldType: "Date Picker",
        placeholder: "YYYY-MM-DD",
        required: false,
      },
      {
        label: "Message",
        fieldType: "Paragraph",
        placeholder: "Tell us about your needs",
        required: false,
      },
    ],
  },
  {
    key: "waitlist-signup",
    name: "Waitlist Signup",
    icon: ListPlus,
    fields: [
      {
        label: "Full Name",
        fieldType: "Short Text",
        placeholder: "Enter your name",
        required: true,
      },
      {
        label: "Email",
        fieldType: "Email",
        placeholder: "you@example.com",
        required: true,
      },
      {
        label: "Where did you find us?",
        fieldType: "Single Choice",
        options: ["Social Media", "Friend/Referral", "Search Engine", "Other"],
        required: false,
      },
      {
        label: "Notify me when this becomes available",
        fieldType: "Agree",
        required: true,
      },
    ],
  },
  {
    key: "job-application",
    name: "Job Application",
    icon: Briefcase,
    fields: [
      {
        label: "Full Name",
        fieldType: "Short Text",
        placeholder: "Enter your name",
        required: true,
      },
      {
        label: "Email",
        fieldType: "Email",
        placeholder: "you@example.com",
        required: true,
      },
      {
        label: "Phone Number",
        fieldType: "Short Text",
        placeholder: "+1 234 567 8900",
        required: true,
      },
      {
        label: "Position Applied For",
        fieldType: "Short Text",
        placeholder: "e.g. Frontend Developer",
        required: true,
      },
      {
        label: "Resume / CV",
        fieldType: "Attatchment",
        placeholder: "Upload your resume",
        required: true,
      },
      {
        label: "Cover Letter",
        fieldType: "Paragraph",
        placeholder: "Tell us why you're a great fit",
        required: false,
      },
      {
        label: "I agree to the application terms",
        fieldType: "Agree",
        required: true,
      },
    ],
  },
  {
    key: "registration",
    name: "Registration",
    icon: UserPlus,
    fields: [
      {
        label: "Full Name",
        fieldType: "Short Text",
        placeholder: "Enter your name",
        required: true,
      },
      {
        label: "Email",
        fieldType: "Email",
        placeholder: "you@example.com",
        required: true,
      },
      {
        label: "Password",
        fieldType: "Password",
        placeholder: "Enter password",
        required: true,
      },
      {
        label: "Confirm Password",
        fieldType: "Password",
        placeholder: "Re-enter password",
        required: true,
      },
      {
        label: "I agree to the Terms & Conditions",
        fieldType: "Agree",
        required: true,
      },
    ],
  },
  {
    key: "login",
    name: "Login",
    icon: LogIn,
    fields: [
      {
        label: "Email",
        fieldType: "Email",
        placeholder: "you@example.com",
        required: true,
      },
      {
        label: "Password",
        fieldType: "Password",
        placeholder: "Enter password",
        required: true,
      },
    ],
  },
];
