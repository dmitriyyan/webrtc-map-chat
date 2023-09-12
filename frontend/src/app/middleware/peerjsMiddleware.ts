import { Peer } from "peerjs";
import type { DataConnection } from "peerjs";
import { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";

import { AppDispatch, RootState } from "../store";
import { setPeerId } from "../features/user/userSlice";
import {
  call,
  setIsRemoteStreamReady,
  videoChatDisconnect,
} from "../features/videoChat/videoChatSlice";

let remoteMediaStream: MediaStream | null = null;
let localMediaStream: MediaStream | null = null;

export const getRemoteMediaStream = () => {
  return remoteMediaStream;
};

export const getUserLocalStream = async () => {
  try {
    if (localMediaStream) {
      return localMediaStream;
    }

    localMediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    return localMediaStream;
  } catch (err) {
    console.error(err);
    alert("Cannot access your media devices :(");
    return null;
  }
};

const peerjsMiddleware: Middleware = (
  store: MiddlewareAPI<AppDispatch, RootState>,
) => {
  let peer: Peer | null = null;

  let localStream: MediaStream | null;
  getUserLocalStream().then((res) => {
    localStream = res;
  });

  const connections: DataConnection[] = [];

  return (next) => (action) => {
    if (!peer) {
      peer = new Peer({
        host: import.meta.env.VITE_REACT_APP_SIGNAL_HOST,
        port: import.meta.env.VITE_REACT_APP_SIGNAL_PORT,
        path: import.meta.env.VITE_REACT_APP_SIGNAL_PATH,
      });

      peer.on("open", (id) => {
        console.log(`Peer id: ${id}`);
        store.dispatch(setPeerId(id));
      });

      peer.on("call", (call) => {
        if (localStream) {
          call.answer(localStream);
          call.on("stream", (remoteStream) => {
            remoteMediaStream = remoteStream;
            store.dispatch(setIsRemoteStreamReady(true));
          });
        } else {
          alert(
            "Someone tried to call you, but we cannot get access to your media devices :(",
          );
        }
      });

      peer.on("connection", (connection) => {
        connections.push(connection);
      });
    }

    if (call.match(action)) {
      if (localStream) {
        const peerCall = peer.call(action.payload.peerId, localStream);
        peerCall.on("stream", (remoteStream) => {
          remoteMediaStream = remoteStream;
          store.dispatch(setIsRemoteStreamReady(true));
        });
      } else {
        alert("We cannot get access to your media devices :(");
      }
    }

    if (videoChatDisconnect.match(action)) {
      for (const connection of connections) {
        connection.peerConnection.close();
        connection.close();
      }

      remoteMediaStream = null;
      store.dispatch(setIsRemoteStreamReady(false));
    }

    next(action);
  };
};

export default peerjsMiddleware;
