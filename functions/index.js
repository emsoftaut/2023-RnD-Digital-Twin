/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.checkAdmin = functions.https.onCall((data, context) => {
    if(context.auth.uid === functions.config().admin.uid) {
        return {isAdmin: true};
    } else {
        return {isAdmin: false};
    }
});


exports.getAllUsers = functions.https.onCall(async (data, context) => {
    // Check if the function is called by an admin
    if (context.auth.uid !== functions.config().admin.uid) {
      return { error: 'Permission denied: must be an administrator.' };
    }
  
    const users = [];
    let nextPageToken;
    
    // Loop to get all users
    do {
      const result = await admin.auth().listUsers(1000, nextPageToken);
      result.users.forEach(userRecord => users.push(userRecord.toJSON()));
      nextPageToken = result.pageToken;
    } while (nextPageToken);
  
    return { users };
  });

  exports.toggleUserStatus = functions.https.onCall(async (data, context) => {
    // Check if the function is called by an admin
    console.log("Received toggle request:", data);
    if (context.auth.uid !== functions.config().admin.uid) {
      return { error: 'Permission denied: must be an administrator.' };
    }
    
    // Retrieve the UID and the status from the data object
    const { uid, status } = data;
    
    if (!uid) {
      return { error: 'UID must be provided.' };
    }
  
    try {
      // Update the user status
      await admin.auth().updateUser(uid, {
        disabled: status
      });
  
      return { success: true };
    } catch (error) {
      return { error: error.message };
    }
  });