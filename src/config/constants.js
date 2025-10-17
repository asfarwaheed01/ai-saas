// export const backendURL = "http://51.21.148.115:8001/api";
// export const backendURL = "https://backend.todopharma.com/api";
export const backendURL = "https://saas.todopharma.com/api";

export const getToken = () => {
  const token = localStorage.getItem("access_token");
  return { token };
};

// export const AVATAR_IDS = [
//   { id: "Wayne_20240711", name: "Wayne" },
//   { id: "eb0a8cc8046f476da551a5559fbb5c82", name: "Avatar 1" },
//   { id: "cc2984a6003a4d5194eb58a4ad570337", name: "Avatar 2" },
//   { id: "336b72634e644335ad40bd56462fc780", name: "Avatar 3" },
//   { id: "37f4d912aa564663a1cf8d63acd0e1ab", name: "Avatar 4" },
//   { id: "ef08039a41354ed5a20565db899373f3", name: "Avatar 5" },
//   { id: "73c84e2b886940099c5793b085150f2f", name: "Avatar 6" },
// ];

// export const AVATAR_IDS = [
//   {
//     male: {
//       asian: ["Pedro_ProfessionalLook2_public": "Pedro (Professional)", "Wayne_20240711": "Wayne"],
//       hispanic: [
//         "eb0a8cc8046f476da551a5559fbb5c82": "Graham (Sitting)",
//         "Graham_Chair_Sitting_public": "Graham (Chair)",
//         "Bryan_FitnessCoach_public": "Bryan (Fitness Coach)",
//       ],
//       african_american: [
//         "Anthony_Chair_Sitting_public": "Anthony (Sitting)",
//         "1734569600": "Anthony",
//         "cc2984a6003a4d5194eb58a4ad570337": "Marcus",
//       ],
//     },
//     female: {
//       asian: [
//         "336b72634e644335ad40bd56462fc780": "Maya",
//         "Alessandra_Chair_Sitting_public": "Alessandra (Sitting)",
//         "Marianne_Chair_Sitting_public": "Marianne (Sitting)",
//         "eaf798c86e35400a8288f93beba66aca": "Luna",
//         "Rika_Chair_Sitting_public": "Rika (Sitting)",
//         "058e99d3b3954c52b0732eb4f1dce0d5": "Hana",
//       ],
//       hispanic: [
//         "37f4d912aa564663a1cf8d63acd0e1ab": "Sofia",
//         "ef08039a41354ed5a20565db899373f3": "Isabella",
//         "Ann_Therapist_public": "Ann (Therapist)",
//         "Anastasia_Chair_Sitting_public": "Anastasia (Sitting)",
//         "1734569600",
//       ],
//       african_american: [
//         "73c84e2b886940099c5793b085150f2f": "Aaliyah",
//         "Amina_Chair_Sitting_public": "Amina (Sitting),
//       ],
//     },
//   },
// ];

export const AVATAR_IDS = [
  {
    binary: {
      african_american: [
        {
          id: "cc2984a6003a4d5194eb58a4ad570337",
          name: "Marcus",
          age: "Young",
          languages: ["eng", "it", "fr"],
        },
      ],
    },
    male: {
      asian: [
        // {
        //   id: "Pedro_ProfessionalLook2_public",
        //   name: "Pedro (Professional)",
        //   age: "Young",
        //   languages: ["eng", "it"],
        // },
        {
          id: "Wayne_20240711",
          name: "Wayne",
          age: "Intermediate",
          languages: ["eng", "it", "fr"],
        },
      ],
      hispanic: [
        {
          id: "eb0a8cc8046f476da551a5559fbb5c82",
          name: "Graham (Sitting)",
          age: "Young",
          languages: ["eng", "it", "fr"],
        },
        {
          id: "Graham_Chair_Sitting_public",
          name: "Graham (Chair)",
          age: "Young",
          languages: ["eng", "it", "fr"],
        },
        {
          id: "Bryan_FitnessCoach_public",
          name: "Bryan (Fitness Coach)",
          age: "Young",
          languages: ["eng", "it", "fr"],
        },
      ],
      african_american: [
        {
          id: "Anthony_Chair_Sitting_public",
          name: "Anthony (Sitting)",
          age: "Intermediate",
          languages: ["eng", "it", "fr"],
        },
        // { id: "1734569600", name: "Anthony" },
        // {
        //   id: "cc2984a6003a4d5194eb58a4ad570337",
        //   name: "Marcus",
        //   age: "Young",
        //   languages: ["eng", "it", "fr"],
        // },
      ],
    },
    female: {
      asian: [
        {
          id: "336b72634e644335ad40bd56462fc780",
          name: "Maya",
          age: "Young",
          languages: ["eng", "it", "fr"],
        },
        {
          id: "Alessandra_Chair_Sitting_public",
          name: "Alessandra (Sitting)",
          age: "Young",
          languages: ["eng", "it", "fr"],
        },
        {
          id: "Marianne_Chair_Sitting_public",
          name: "Marianne (Sitting)",
          age: "Intermediate",
          languages: ["eng", "it", "fr"],
        },
        // { id: "eaf798c86e35400a8288f93beba66aca", name: "Luna" },
        {
          id: "Rika_Chair_Sitting_public",
          name: "Rika (Sitting)",
          age: "Intermediate",
          languages: ["eng", "it", "fr"],
        },
        // { id: "058e99d3b3954c52b0732eb4f1dce0d5", name: "Hana" },
      ],
      hispanic: [
        {
          id: "37f4d912aa564663a1cf8d63acd0e1ab",
          name: "Sofia",
          age: "Young",
          languages: ["eng", "it", "fr"],
        },
        // { id: "ef08039a41354ed5a20565db899373f3", name: "Isabella" },
        {
          id: "Ann_Therapist_public",
          name: "Ann (Therapist)",
          age: "Intermediate",
          languages: ["eng", "it", "fr"],
        },
        {
          id: "Anastasia_Chair_Sitting_public",
          name: "Anastasia (Sitting)",
          age: "Old",
          languages: ["eng", "it", "fr"],
        },
        // { id: "1734569600", name: "Maria" },
      ],
      african_american: [
        {
          id: "73c84e2b886940099c5793b085150f2f",
          name: "Aaliyah",
          age: "Young",
          languages: ["eng", "it", "fr"],
        },
        {
          id: "Amina_Chair_Sitting_public",
          name: "Amina (Sitting)",
          age: "Intermediate",
          languages: ["eng", "it", "fr"],
        },
      ],
    },
  },
];
