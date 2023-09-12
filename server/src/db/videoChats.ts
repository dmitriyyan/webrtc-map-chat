class VideoChats {
  private chats = new Map<string, VideoChat>();
  constructor() {}

  public toArray() {
    return Array.from(this.chats.values());
  }

  public addChat(data: {
    chatId: string;
    userId: string;
    peerId: string;
    username: string;
  }) {
    this.chats.set(data.chatId, {
      id: data.chatId,
      participants: [
        {
          id: data.userId,
          peerId: data.peerId,
          username: data.username,
        },
      ],
    });
  }

  public getChat(id: string) {
    return this.chats.get(id);
  }

  public deleteChat(id: string) {
    return this.chats.delete(id);
  }
}

export const videoChats = new VideoChats();
