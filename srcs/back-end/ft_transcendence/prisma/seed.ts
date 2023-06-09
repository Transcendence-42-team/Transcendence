import { PrismaService } from "./prisma.service";

const prisma = new PrismaService();

async function main() {
	
	// CARE if deleted instance in you db index will still increment itself 
	// take this into acount when you create your seed

	const N_USER = 10; // Number of User created
	const N_CONTACT = 10; // Number of Contact created 
	const N_CHANEL = 7; // Number of Chanel created
	const N_CHANEL_USER = 10; // Number of Chanel created

	
	// Creation of N Users
	for(let i = 0; i < N_USER + 1; i++) {
		const data = {
			email: "test_" + i,
			nickname: "asimon_" + i,
			token: "0" + i,
			intra_login: "asimon_" + i
		}
		
		await prisma.user.upsert({
			where: { nickname: data.nickname },
			update: {},
			create: {
				nickname: data.nickname,
				email: data.email,
				token: data.token,
				intra_login: data.intra_login
			}
		})
	}
	
	// Creation of N Contacts
	for(let i = 1; i < N_CONTACT + 1; i++) {
		
		await prisma.contact.upsert({
			where: { user_id_contact_id: {
				user_id: 1,
				contact_id: i
			}},
			update: {},
			create: {
				user_id: 1,
				contact_id: i
			}
		})
	}
	
	// Creation of N Chanels
	for (let i = 1; i < N_CHANEL + 1; i++) {
		await prisma.chanel.upsert({
			where: { id: i },
			update: {},
			create: {
				owner_id: i,
				chanel_name: "toto_" + i,
				chanel_size: i * 2,
				max_users: i * 4
			}
		})
	}
	
	const USER_TO_ADD = {
		user1: 1
	}

	const CHANEL_TO_ADD = {
		chanel1: 1
	}

	// Add Users in chanel
	for (let i = 4; i < N_CHANEL_USER + 4; i++) { // Value Need to be changed
		await prisma.users_Chanels.upsert({
			where: {
				user_id_chanel_id: {
					user_id: USER_TO_ADD.user1,
					chanel_id: i
				}
			},
			update: {},
			create: {
				user_id: USER_TO_ADD.user1,
				chanel_id: i,
				pending: true
			}
		})
	}
}

main().catch((e) => {
	console.log(e);
	process.exit(1);
})