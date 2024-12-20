export enum GeneralResponse {
  USER_DELETED = 'USER_DELETED_SUCCESSFULLY',
  USER_ADDED = 'USER_ADDED_SUCCESSFULLY',
  USER_EDITED = 'USER_EDITED_SUCCESSFULLY'
}

export enum UserType {
  Admin = 'Admin'
}

export enum SectionStateStatus {
  Loading = 'Loading',
  LoadingTransparent = 'LoadingTransparent',
  Ready = 'Ready',
  Disconnected = 'Disconnected',
  Error = 'Error',
  Empty = 'Empty',
  EmptyFilterResult = 'EmptyFilterResult'
}

export enum LoadingStatus {
  Hidden = 'Hidden',
  Visible = 'Visible',
  VisibleTransparent = 'VisibleTransparent',
}

export enum ScreenType {
  phone = 'phone',
  tablet = 'tablet',
  desktop = 'desktop',
}

export enum LanguageEnum {
  English = 'en',
  Arabic = 'ar',
}

export enum PermissionModuleFeature {
  ROLES_LIST = '1',
  ROLES_STORE = '2',
  ROLES_UPDATE = '3',
  ROLES_DELETE = '4',
  USERS_LIST = '5',
  USERS_STORE = '6',
  USERS_UPDATE = '7',
  USERS_DELETE = '8',
  CATEGORIES_LIST = '9',
  CATEGORIES_STORE = '10',
  CATEGORIES_UPDATE = '11',
  CATEGORIES_DELETE = '12',
  GROUPS_LIST = '13',
  GROUPS_STORE = '14',
  GROUPS_UPDATE = '15',
  GROUPS_DELETE = '16',
  FAQS_LIST = '17',
  FAQS_STORE = '18',
  FAQS_UPDATE = '19',
  FAQS_DELETE = '20',
  FAQS_SEARCH = '21',
  FAQS_APPROVE = '22',
  ANNOUNCEMENTS_LIST = '25',
  ANNOUNCEMENTS_STORE = '26',
  ANNOUNCEMENTS_UPDATE = '27',
  ANNOUNCEMENTS_DELETE = '28',
  ANNOUNCEMENT_APPROVE = '29',
  EVALUATIONS_LIST = '30',
  EVALUATIONS_STORE = '31',
  EVALUATIONS_UPDATE = '32',
  EVALUATIONS_DELETE = '33',
  CONFIGURATIONS_LIST = '36',
  CONFIGURATIONS_STORE = '37',
  CONFIGURATIONS_UPDATE = '38',
  CONFIGURATIONS_DELETE = '39',
  PERMISSION_LIST = '32'
}
