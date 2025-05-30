/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onCall} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

admin.initializeApp();

interface UpdateUserData {
  uid: string;
  displayName?: string;
  photoURL?: string;
  email?: string;
}

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

/**
 * Lista todos os usuários do Firebase Authentication
 */
export const listUsers = onCall(async (request) => {
  // Verifica se o usuário está autenticado
  if (!request.auth) {
    throw new Error(
      "O usuário precisa estar autenticado para listar usuários."
    );
  }

  // Verifica se o usuário tem permissão de admin
  const userRecord = await admin.auth().getUser(request.auth.uid);
  const customClaims = userRecord.customClaims || {};
  if (!customClaims.admin && !customClaims.superAdmin) {
    throw new Error(
      "O usuário não tem permissão para listar usuários."
    );
  }

  try {
    // Lista todos os usuários
    const listUsersResult = await admin.auth().listUsers();
    return {
      users: listUsersResult.users.map((user) => ({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        roles: user.customClaims?.roles || ["CLIENTE"],
        createdAt: user.metadata.creationTime,
        lastLogin: user.metadata.lastSignInTime,
      })),
    };
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    throw new Error("Erro ao listar usuários.");
  }
});

/**
 * Atualiza os dados de um usuário
 */
export const updateUser = onCall(async (request) => {
  // Verifica se o usuário está autenticado
  if (!request.auth) {
    throw new Error(
      "O usuário precisa estar autenticado para atualizar usuários."
    );
  }

  // Verifica se o usuário tem permissão de admin
  const userRecord = await admin.auth().getUser(request.auth.uid);
  const customClaims = userRecord.customClaims || {};
  if (!customClaims.admin && !customClaims.superAdmin) {
    throw new Error(
      "O usuário não tem permissão para atualizar usuários."
    );
  }

  const data = request.data as UpdateUserData;
  const {uid, ...updateData} = data;

  try {
    await admin.auth().updateUser(uid, updateData);
    return {success: true};
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw new Error("Erro ao atualizar usuário.");
  }
});

/**
 * Remove um usuário
 */
export const deleteUser = onCall(async (request) => {
  // Verifica se o usuário está autenticado
  if (!request.auth) {
    throw new Error(
      "O usuário precisa estar autenticado para excluir usuários."
    );
  }

  // Verifica se o usuário tem permissão de admin
  const userRecord = await admin.auth().getUser(request.auth.uid);
  const customClaims = userRecord.customClaims || {};
  if (!customClaims.admin && !customClaims.superAdmin) {
    throw new Error(
      "O usuário não tem permissão para excluir usuários."
    );
  }

  const {uid} = request.data as {uid: string};

  try {
    await admin.auth().deleteUser(uid);
    return {success: true};
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    throw new Error("Erro ao excluir usuário.");
  }
});
