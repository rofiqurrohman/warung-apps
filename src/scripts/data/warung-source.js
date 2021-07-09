import API_ENDPOINT from '../globals/api-endpoints';
import CONFIG from '../globals/config';

class WarungSource {
  static async listWarung() {
    const response = await fetch(API_ENDPOINT.LIST_WARUNG);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailWarung(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    return response.json();
  }

  static async sendReview(data) {
    const response = await fetch(API_ENDPOINT.REVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': CONFIG.KEY,
      },
      body: data,
    });
    const responseJson = await response.json();
    return responseJson;
  }
}

export default WarungSource;
