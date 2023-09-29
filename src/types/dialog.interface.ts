type Companion = {
	img: string
	name: string
}

type Message = {
	text: string
	user: string
	time: number
}

type DialogData = {
	id: string
	messages: Message[]
	new: number
	lastUpd: number
	lastSenler: string
	users: string[]
}

type MessageItemProps = {
	pos: boolean
	time: number
	text: string
}

type AllMessages = DialogData[]