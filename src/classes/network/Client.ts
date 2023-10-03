// lib
import { Client as StompClient } from "@stomp/stompjs";
// interface
import { IConnection } from "../../interfaces/IPacket";
// type
import type { StompSubscription } from "@stomp/stompjs";

/**
 * Socket Client class
 */
class Client {
  private _socket: StompClient;
  private _subscriptionList: StompSubscription[] = [];
  public id: number;

  constructor(brokerURL: string, expoName: string) {
    this._socket = new StompClient({
      brokerURL,
      reconnectDelay: 5000, // try reconnect for every 5000 seconds
      heartbeatIncoming: 10000, // heartbeat used for checking connection
      heartbeatOutgoing: 10000,
      onConnect: () => {
        this._socket.publish({
          destination: `/pub/expo/${expoName}`,
          body: JSON.stringify({
            expoName,
          }),
        });

        const subscription = this._socket.subscribe(
          `/sub/expo/${expoName}/init`,
          (message) => {
            const connectionPkt: IConnection = JSON.parse(message.body);
            this.id = connectionPkt.user_id;
            console.log("Session id assigned from server : " + this.id);
          }
        );
        this._subscriptionList.push(subscription);
      },
    });
  }

  get Socket() {
    return this._socket;
  }
}

export default Client;
