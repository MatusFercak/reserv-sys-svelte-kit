import { Client, Account, Databases, Query } from 'appwrite';
import { writable } from 'svelte/store';
import { currentAccount } from '$lib/stores';

const client = new Client();
const account = new Account(client);
const databases = new Databases(client);

client.setEndpoint('https://cloud.appwrite.io/v1').setProject('reserv-system');

export const AppwriteServices = {
	login: async () => {
		await account.createOAuth2Session('google', 'http://127.0.0.1:5173/');
	},
	logout: async () => {
		await account.deleteSessions();
		currentAccount;
		currentAccount.set(0);
	},
	getAccount: async () => {
		try {
			let promise = await account.get();
			currentAccount.set(promise);
		} catch (error) {
			currentAccount.set(0);
		}
	},
	getReservations: async (dayID) => {
		let promise = await databases.listDocuments('public-system', 'reservations', [
			Query.equal('dayID', dayID)
		]);
		return promise;
	},
	getReservationsByEmail: async (email) => {
		let promise = await databases.listDocuments('public-system', 'reservations', [
			Query.equal('email', email)
		]);
		return promise;
	},
	createReservation: async (data) => {
		const promise = await databases.createDocument(
			'public-system',
			'reservations',
			data.reservationID,
			{
				timeID: data.timeID,
				time: data.time,
				name: data.name,
				email: data.email,
				dayID: data.dayID.toString(),
				isReserv: true
			}
		);
		return promise;
	},
	deleteReservation: async (data) => {
		console.log(data);
		const promise = await databases.deleteDocument(
			'public-system',
			'reservations',
			data.reservationID ? data.reservationID : data.$id
		);
	}
};
