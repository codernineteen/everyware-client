type TransformData = {
  session_id: string;
  position: { x: number; z: number };
  quaternion: { y: number; w: number };
  state: string;
};

export interface IInit {
  session_id: string;
}

export interface IConnection {
  session_id: string;
  expo_name: string;
  transforms: TransformData[];
}

export interface IDisconnection {
  session_id: string;
}

export interface ITransform {
  session_id: string;
  expo_name: string;
  data: {
    position: { x: number; z: number };
    quaternion: { y: number; w: number };
    state: string;
  };
}

export interface IChatMessage {
  session_id: string;
  expo_name: string;
  message: string;
}

export interface IPacket {
  type: number;
  body: any;
}
