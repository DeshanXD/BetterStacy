function getUserFromMention(message) {

    if(message.mentions.roles.values().next().value) return 'e'

    if (!message.mentions.users.values().next().value) return message.author.id

    return message.mentions.users.values().next().value.id


}
module.exports = getUserFromMention