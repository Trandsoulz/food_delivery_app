import { CreateUserParams, SignInParams } from "@/type";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  TablesDB,
} from "react-native-appwrite";

let client: Client = new Client();
let account: Account;
let databases: Databases;
let avatars: Avatars;
let tablesDB: TablesDB;

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
tablesDB = new TablesDB(client);
avatars = new Avatars(client);

const userTable = "user";
// const ordersTable = "order";

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
    const avatarUrl = avatars.getInitialsURL(name);

    //   create user in DB
    return await tablesDB.createRow({
      databaseId: appwriteConfig.databaseId!,
      tableId: userTable,
      rowId: ID.unique(),
      data: { name, email, avatar: avatarUrl, accountId: user.$id, },
    });
  } catch (error) {
    throw new Error(error as string);
  }
}

async function getCurrentUser() {
  try {
    const currentUser = await account.get();
    if (!currentUser) throw new Error("Session not found");

    const user = await tablesDB.getRow({
      databaseId: appwriteConfig.databaseId!,
      tableId: userTable,
      rowId: "",
      queries: [Query.equal("accountId", currentUser.$id)],
    })

    //  gets the first user from the rows and it's details
    return user.rows[0];
    
  } catch (error) {
    throw new Error(error as string);
  }
}

export { client, account, databases, avatars, logIn, signUp, getCurrentUser };
