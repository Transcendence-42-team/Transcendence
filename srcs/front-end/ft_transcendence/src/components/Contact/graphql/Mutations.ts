import { gql } from "@apollo/client";

export const ACCEPTE_CONTACT = gql`mutation ReplyAddContact($input: UpdateContact!){
	replyAddContact(reply: $input) {
		id
	}
}`

export const REFUSE_CONTACT = gql`mutation RefuseRequestContact($input: Int!){
	deleteContact(id: $input){
		id
	}
}`

export const ADD_USER_IN_CHANEL = gql`
  mutation AddUserInChanel($input: AddUserChanel!) {
	addUser(addUserChanel: $input) {
		user_id
	}
}`

export const CREATE_CONTACT = gql`mutation CreateContact($input: CreateContactInput!) {
	createContact(createContact: $input) {
		id
		pending
	}
}`
