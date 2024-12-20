import { environment } from '../../../environments/environment';

export class Constants {
  static API_URL_BASE = environment.base_url;
  static AUTH_TOKEN = 'auth_token';
  static DASHBOARD_USER = 'dashboard_user';
  static ITEMS_PER_PAGE = 10;

  // Auth Api
  static LOGIN_API = Constants.API_URL_BASE + '/login';
  static GET_USERS_API = Constants.API_URL_BASE + '/users';
  static ATTRACTIONS_API = Constants.API_URL_BASE + '/attractions';
  static CREATE_ATTRACTIONS_API = Constants.API_URL_BASE + '/auth/attractions/create';
  static UPDATE_ATTRACTIONS_API = Constants.API_URL_BASE + '/auth/attractions/update';
  static PETS_API = Constants.API_URL_BASE + '/pets';

  // Navigation Paths
  static LOGIN_PATH = 'login';
  static USERS_PATH = 'users';
  static ATTRACTIONS_PATH = 'attractions';
  static PETS_PATH = 'pets';

  // Success Messages
  static SUCCESS_ADD_USER = 'User added successfully!';
  static SUCCESS_UPDATE_USER = 'User updated successfully!';
  static SUCCESS_DELETE_USER = 'User deleted successfully!';
  static SUCCESS_ADD_ATTRACTION = 'Attraction added successfully!';
  static SUCCESS_UPDATE_ATTRACTION = 'Attraction updated successfully!';
  static SUCCESS_DELETE_ATTRACTION = 'Attraction deleted successfully!';
}
