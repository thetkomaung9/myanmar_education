/**
 * i18n type definitions for EduSphere Myanmar.
 * Myanmar content uses Unicode (U+1000–U+109F). Zawgyi encoding is NOT supported.
 */

export type SupportedLocale = 'en' | 'mm';

// ---------------------------------------------------------------------------
// nav
// ---------------------------------------------------------------------------
export interface NavTranslations {
  features: string;
  pricing: string;
  about: string;
  contact: string;
  requestDemo: string;
  howItWorks: string;
}

// ---------------------------------------------------------------------------
// hero
// ---------------------------------------------------------------------------
export interface HeroTranslations {
  headline: string;
  subHeadline: string;
  primaryCta: string;
  secondaryCta: string;
}

// ---------------------------------------------------------------------------
// features
// ---------------------------------------------------------------------------
export interface FeatureModuleTranslation {
  title: string;
  description: string;
}

export interface FeaturesTranslations {
  title: string;
  subtitle: string;
  authentication: FeatureModuleTranslation;
  studentManagement: FeatureModuleTranslation;
  teacherManagement: FeatureModuleTranslation;
  attendance: FeatureModuleTranslation;
  dashboard: FeatureModuleTranslation;
  eClass: FeatureModuleTranslation;
}

// ---------------------------------------------------------------------------
// howItWorks
// ---------------------------------------------------------------------------
export interface HowItWorksStepTranslation {
  title: string;
  description: string;
}

export interface HowItWorksTranslations {
  title: string;
  step1: HowItWorksStepTranslation;
  step2: HowItWorksStepTranslation;
  step3: HowItWorksStepTranslation;
}

// ---------------------------------------------------------------------------
// pricing
// ---------------------------------------------------------------------------
export interface PricingTierTranslation {
  name: string;
  description: string;
}

export interface PricingTranslations {
  title: string;
  subtitle: string;
  monthly: string;
  annual: string;
  save: string;
  contactUs: string;
  perMonth: string;
  perYear: string;
  mostPopular: string;
  tiers: {
    starter: PricingTierTranslation;
    standard: PricingTierTranslation;
    enterprise: PricingTierTranslation;
  };
  cta: {
    starter: string;
    standard: string;
    enterprise: string;
  };
}

// ---------------------------------------------------------------------------
// about
// ---------------------------------------------------------------------------
export interface AboutTranslations {
  title: string;
  vision: string;
  visionTitle: string;
  mission: string;
  missionTitle: string;
  story: string;
  storyTitle: string;
  teamTitle: string;
  impactTitle: string;
}

// ---------------------------------------------------------------------------
// contact
// ---------------------------------------------------------------------------
export interface ContactFormTranslations {
  schoolName: string;
  schoolNamePlaceholder: string;
  contactName: string;
  contactNamePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  schoolSize: string;
  schoolSizeOptions: {
    small: string;
    medium: string;
    large: string;
  };
  message: string;
  messagePlaceholder: string;
  contactMethod: string;
  contactMethodOptions: {
    email: string;
    phone: string;
    inPerson: string;
  };
  submit: string;
  submitting: string;
}

export interface ContactInfoTranslations {
  email: string;
  phone: string;
  address: string;
}

export interface ContactTranslations {
  title: string;
  subtitle: string;
  form: ContactFormTranslations;
  info: ContactInfoTranslations;
  success: string;
  error: string;
}

// ---------------------------------------------------------------------------
// auth
// ---------------------------------------------------------------------------
export interface LoginTranslations {
  title: string;
  subtitle: string;
  email: string;
  emailPlaceholder: string;
  password: string;
  passwordPlaceholder: string;
  rememberMe: string;
  forgotPassword: string;
  submit: string;
  invalidCredentials: string;
}

export interface ForgotPasswordTranslations {
  title: string;
  subtitle: string;
  email: string;
  emailPlaceholder: string;
  submit: string;
  confirmation: string;
  backToLogin: string;
}

export interface ResetPasswordTranslations {
  title: string;
  subtitle: string;
  newPassword: string;
  newPasswordPlaceholder: string;
  confirmPassword: string;
  confirmPasswordPlaceholder: string;
  submit: string;
  minLength: string;
  mismatch: string;
  success: string;
}

export interface AuthTranslations {
  login: LoginTranslations;
  forgotPassword: ForgotPasswordTranslations;
  resetPassword: ResetPasswordTranslations;
}

// ---------------------------------------------------------------------------
// portals — shared labels
// ---------------------------------------------------------------------------
export interface PortalCommonTranslations {
  dashboard: string;
  announcements: string;
  attendance: string;
  materials: string;
  assignments: string;
  logout: string;
  profile: string;
  settings: string;
  notifications: string;
  search: string;
  export: string;
  import: string;
  add: string;
  edit: string;
  delete: string;
  save: string;
  cancel: string;
  confirm: string;
  back: string;
  next: string;
  finish: string;
  loading: string;
  noData: string;
  viewAll: string;
  totalStudents: string;
  totalTeachers: string;
  totalClasses: string;
  totalSchools: string;
  activeUsers: string;
  systemUptime: string;
  todayAttendance: string;
}

// ---------------------------------------------------------------------------
// portals — Super Admin
// ---------------------------------------------------------------------------
export interface SuperAdminTranslations {
  title: string;
  schools: string;
  users: string;
  schoolName: string;
  adminEmail: string;
  studentCount: string;
  status: string;
  actions: string;
  createSchool: string;
  editSchool: string;
  deleteSchool: string;
  searchSchools: string;
  allRoles: string;
  filterByRole: string;
  totalSchoolsMetric: string;
  totalUsersMetric: string;
  totalStudentsMetric: string;
  systemUptimeMetric: string;
}

// ---------------------------------------------------------------------------
// portals — School Admin
// ---------------------------------------------------------------------------
export interface SchoolAdminTranslations {
  title: string;
  students: string;
  teachers: string;
  classes: string;
  reports: string;
  studentCode: string;
  className: string;
  assignedTeacher: string;
  enrolledStudents: string;
  createClass: string;
  editClass: string;
  deleteClass: string;
  deleteClassBlocked: string;
  archiveStudent: string;
  archiveConfirm: string;
  searchStudents: string;
  filterByClass: string;
  exportCsv: string;
  attendanceTrend: string;
  last7Days: string;
  last30Days: string;
  enrolledStudentsMetric: string;
  activeTeachersMetric: string;
  activeClassesMetric: string;
  todayAttendanceMetric: string;
}

// ---------------------------------------------------------------------------
// portals — Teacher
// ---------------------------------------------------------------------------
export interface TeacherTranslations {
  title: string;
  myClasses: string;
  takeAttendance: string;
  uploadMaterial: string;
  createAssignment: string;
  pendingAttendance: string;
  upcomingDeadlines: string;
  assignmentTitle: string;
  assignmentDescription: string;
  dueDate: string;
  maxFileSize: string;
  submissionStatus: string;
  pending: string;
  submitted: string;
  graded: string;
  materialTitle: string;
  materialFile: string;
  fileTooLarge: string;
}

// ---------------------------------------------------------------------------
// portals — Student
// ---------------------------------------------------------------------------
export interface StudentTranslations {
  title: string;
  myAttendance: string;
  myMaterials: string;
  myAssignments: string;
  profile: string;
  enrolledCourses: string;
  recentAnnouncements: string;
  upcomingAssignments: string;
  present: string;
  absent: string;
  late: string;
  activeAssignments: string;
  pastAssignments: string;
  submitAssignment: string;
  unread: string;
  markAsRead: string;
  attendanceSummary: string;
  presentCount: string;
  absentCount: string;
  lateCount: string;
}

// ---------------------------------------------------------------------------
// portals — root
// ---------------------------------------------------------------------------
export interface PortalsTranslations {
  superAdmin: string;
  schoolAdmin: string;
  teacher: string;
  student: string;
  common: PortalCommonTranslations;
  superAdminPortal: SuperAdminTranslations;
  schoolAdminPortal: SchoolAdminTranslations;
  teacherPortal: TeacherTranslations;
  studentPortal: StudentTranslations;
}

// ---------------------------------------------------------------------------
// errors
// ---------------------------------------------------------------------------
export interface ErrorsTranslations {
  generic: string;
  notFound: string;
  unauthorized: string;
  forbidden: string;
  timeout: string;
  networkError: string;
  serverError: string;
  validationError: string;
  retry: string;
  goHome: string;
  sessionExpired: string;
  fileTooLarge: string;
  invalidFileType: string;
  requiredField: string;
  invalidEmail: string;
}

// ---------------------------------------------------------------------------
// Root dictionary
// ---------------------------------------------------------------------------
export interface TranslationDictionary {
  nav: NavTranslations;
  hero: HeroTranslations;
  features: FeaturesTranslations;
  howItWorks: HowItWorksTranslations;
  pricing: PricingTranslations;
  about: AboutTranslations;
  contact: ContactTranslations;
  auth: AuthTranslations;
  portals: PortalsTranslations;
  errors: ErrorsTranslations;
}
