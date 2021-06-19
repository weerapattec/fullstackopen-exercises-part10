import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    // Get the access token for the storage

    // const rawToken = await AsyncStorage.getItem(`${this.namespace}:token`);

    return await AsyncStorage.getItem(`${this.namespace}:token`);
  }

  async setAccessToken(accessToken) {
    // Add the access token to the storage

    await AsyncStorage.setItem(`${this.namespace}:token`, accessToken);
  }

  async removeAccessToken() {
    // Remove the access token from the

    await AsyncStorage.removeItem(`${this.namespace}:token`);
  }
}

export default AuthStorage;
