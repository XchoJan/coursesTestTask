import {api, API_URL} from './config';

export default class Api {
  static url = API_URL;

  static getCourses(){
    return api.get('/courses.json')
  }
}
