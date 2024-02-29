const parseTrelloIdToCreatedDate = (trelloId: string) => {
    return new Date(1000*parseInt(trelloId.substring(0,8),16));
}

export default parseTrelloIdToCreatedDate;