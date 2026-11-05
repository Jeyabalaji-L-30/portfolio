import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import AdsClickRoundedIcon from '@mui/icons-material/AdsClickRounded';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';

// All portfolio content lives here so the components stay purely presentational.

export const profile = {
  name: 'Jeyabalaji L',
  initials: 'JL',
  title: 'Digital Marketing Executive',
  roles: ['SEO Specialist', 'Meta Ads Expert', 'Social Media Marketer', 'Web Analyst'],
  tagline:
    'I help brands grow online through data-driven SEO, social media marketing, Meta Ads and user-friendly websites — turning traffic into real leads.',
  about: [
    '  Digital Marketing Executive passionate about content creation, social media, and digital advertising. I create engaging content, manage brand platforms, and use digital marketing strategies to help businesses grow online.',
  ],
  // Lives in /public
  photo: '/profile.png',
};

export const contacts = [
  { label: 'Email', value: 'balajijeya4@gmail.com', href: 'mailto:balajijeya4@gmail.com', icon: EmailRoundedIcon },
  { label: 'Phone', value: '+91 93421 12144', href: 'tel:+919342112144', icon: PhoneRoundedIcon },
  { label: 'LinkedIn', value: 'in/jeyabalaji-l', href: 'https://www.linkedin.com/in/jeyabalaji-l', icon: LinkedInIcon },
  { label: 'Location', value: 'Aruppukottai, Tamil Nadu', icon: PlaceRoundedIcon },
];

export const stats = [
  { value: '4+', label: 'Brands managed' },
  { value: '4', label: 'Social platforms' },
  { value: '10+', label: 'Tools mastered' },
];

export const focusAreas = [
  { title: 'SEO & Local SEO', text: 'Keywords, backlinks and Google Business Profile', icon: ManageSearchRoundedIcon },
  { title: 'Meta Ads', text: 'Lead generation and brand awareness campaigns', icon: AdsClickRoundedIcon },
  { title: 'Social Media', text: 'Content for Instagram, Facebook and LinkedIn', icon: CampaignRoundedIcon },
  { title: 'Web & Analytics', text: 'WordPress sites tracked with Google Analytics', icon: InsightsRoundedIcon },
];

export const navLinks = [
  { id: 'home', label: 'Home', icon: HomeRoundedIcon },
  { id: 'about', label: 'About', icon: PersonOutlineRoundedIcon },
  { id: 'experience', label: 'Experience', icon: WorkOutlineRoundedIcon },
  { id: 'skills', label: 'Skills', icon: AutoAwesomeOutlinedIcon },
  { id: 'education', label: 'Education', icon: SchoolOutlinedIcon },
  { id: 'contact', label: 'Contact', icon: MailOutlineRoundedIcon },
];

export const experience = [
  {
    role: 'Digital Marketing Executive',
    company: 'IT Malar Pvt Ltd',
    location: 'Aruppukottai, Tamil Nadu',
    period: 'Feb 2026 – Present',
    current: true,
    highlights: ['4 Brands', 'Instagram · Facebook · LinkedIn', 'Meta Ads', 'SEO & Local SEO', 'Google Analytics'],
    groups: [
      {
        title: 'Social Media & Content',
        icon: ShareRoundedIcon,
        points: [
          'Managed digital marketing for 4 business brands.',
          'Created social media posts, banners, reels and marketing content.',
          'Planned and managed Instagram, Facebook and LinkedIn content.',
          'Assisted with video shoots and basic video editing.',
        ],
      },
      {
        title: 'Paid Ads & Analytics',
        icon: AdsClickRoundedIcon,
        points: [
          'Ran and optimised Meta Ads for lead generation and brand awareness.',
          'Monitored performance using Google Analytics and Search Console.',
        ],
      },
      {
        title: 'SEO & Local Visibility',
        icon: TravelExploreRoundedIcon,
        points: [
          'Performed SEO, Local SEO and Off-Page SEO activities.',
          'Managed Google Business Profiles and improved local visibility.',
          'Conducted keyword research and competitor analysis.',
          'Built backlinks and improved website search rankings.',
        ],
      },
    ],
  },
];

export const skillGroups = [
  {
    title: 'Marketing',
    icon: CampaignRoundedIcon,
    blurb: 'Growing audiences and generating leads with social content and paid campaigns on Instagram, Facebook and LinkedIn.',
    items: ['Social Media Marketing', 'Meta Ads', 'Content Marketing', 'Lead Generation'],
  },
  {
    title: 'Search Optimisation',
    icon: ManageSearchRoundedIcon,
    blurb: 'Improving search rankings and local visibility through keyword research, backlinks and Google Business Profiles.',
    items: ['SEO', 'Local SEO', 'Off-Page SEO', 'Keyword Research', 'Google Business Profile'],
  },
  {
    title: 'Tools & Platforms',
    icon: InsightsRoundedIcon,
    blurb: 'Measuring performance, designing creatives and speeding up work with analytics, design and AI tools.',
    items: [
      'Google Analytics',
      'Search Console',
      'Google Business Profile',
      'Keyword Planner',
      'WordPress',
      'Canva',
      'Adobe Express',
      'ChatGPT',
      'Gemini',
      'Claude',
    ],
  },
  {
    title: 'Web Technologies',
    icon: CodeRoundedIcon,
    blurb: 'Building responsive, user-friendly websites that turn visitors into enquiries.',
    items: ['HTML', 'CSS', 'Basic JavaScript', 'WordPress'],
  },
];

export const education = [
  {
    tag: '2021 – 2025',
    title: 'B.E. Electronics & Communication Engineering',
    subtitle: 'P.S.R Engineering College, Sivakasi',
    icon: SchoolRoundedIcon,
  },
  {
    tag: 'School',
    title: 'HSC & SSLC',
    subtitle: 'Thamarai Matric Higher Secondary School, Erode',
    icon: MenuBookRoundedIcon,
  },
  {
    tag: 'Certification',
    title: 'Digital Marketing Certification',
    subtitle: 'Getin Technologies',
    icon: WorkspacePremiumRoundedIcon,
  },
];
