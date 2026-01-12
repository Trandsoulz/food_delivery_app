import { Account, Client } from "react-native-appwrite";

let client: Client = new Client();
let account : Account;

client.setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!).setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!).setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!);

account = new Account(client);

export { client, account };