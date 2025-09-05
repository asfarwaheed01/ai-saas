// export const backendURL = "http://51.21.148.115:8001/api";
export const backendURL = "https://backend.todopharma.com/api";

export const getToken = () => {
  const token = localStorage.getItem("access_token");
  return { token };
};

export const AVATAR_IDS = [
  { id: "Wayne_20240711", name: "Wayne" },
  { id: "eb0a8cc8046f476da551a5559fbb5c82", name: "Avatar 1" },
  { id: "cc2984a6003a4d5194eb58a4ad570337", name: "Avatar 2" },
  { id: "336b72634e644335ad40bd56462fc780", name: "Avatar 3" },
  { id: "37f4d912aa564663a1cf8d63acd0e1ab", name: "Avatar 4" },
  { id: "ef08039a41354ed5a20565db899373f3", name: "Avatar 5" },
  { id: "73c84e2b886940099c5793b085150f2f", name: "Avatar 6" },
];
