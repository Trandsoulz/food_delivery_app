import { CreateUserParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";

let client: Client = new Client();
let account: Account;
let databases: Databases;
let avatars: Avatars;

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  projectName: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_NAME!,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!,
};

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

account = new Account(client);
databases = new Databases(client);
avatars = new Avatars(client);

const userTable = "users";
const ordersTable = "orders";

async function logIn({ email, password }: SignInParams) {
  try {
    return await account.createEmailPasswordSession({ email, password });
  } catch (error) {
    throw new Error(error as string);
  }
}

async function signUp({ name, email, password }: CreateUserParams) {
  try {
    const user = await account.create({
      userId: ID.unique(),
      name,
      email,
      password,
    });

    if (!user.$id) throw new Error("User not created");

    // login user
    await logIn({ email, password });

    //   get avatar URL
    const avatarUrl = avatars.getInitialsURL(name)

    //   create user in DB
    return await databases.createDocument(appwriteConfig.databaseId, userTable, ID.unique(), {
      name,
      email,
      avatar: avatarUrl,
      accountId: user.$id,
    });
  } catch (error) {
    throw new Error(error as string);
  }
}

export { client, account, databases, avatars, logIn, signUp };
