class OnlineUsers {
  private users = new Map<string, UserData>();
  constructor() {}

  public addUser(data: UserData) {
    this.users.set(data.id, data);
  }

  public toArray() {
    return Array.from(this.users.values());
  }

  public isUserOnline(id: string) {
    return this.users.has(id);
  }

  public getUsernameById(id: string) {
    return this.users.get(id)?.username || "";
  }

  public deleteUser(id: string) {
    return this.users.delete(id);
  }
}

export const onlineUsers = new OnlineUsers();
