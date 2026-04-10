export const backendURL = "https://saas.todopharma.com/api";

export const getToken = () => {
  const token = localStorage.getItem("access_token");
  return { token };
};

// export const AVATAR_IDS = [
//   {
//     binary: {
//       african_american: [
//         {
//           id: "cc2984a6003a4d5194eb58a4ad570337",
//           name: "Marcus",
//           age: "Young",
//           languages: ["eng", "it", "fr"],
//         },
//       ],
//     },
//     male: {
//       asian: [
//         {
//           id: "Graham_Chair_Sitting_public",
//           name: "Graham (Chair)",
//           age: "Young",
//           languages: ["eng", "it", "fr"],
//         },
//       ],
//       hispanic: [
//         {
//           id: "eb0a8cc8046f476da551a5559fbb5c82",
//           name: "Graham (Sitting)",
//           age: "Young",
//           languages: ["eng", "it", "fr"],
//         },

//         {
//           id: "Bryan_FitnessCoach_public",
//           name: "Bryan (Fitness Coach)",
//           age: "Young",
//           languages: ["eng", "it", "fr"],
//         },
//       ],
//       african_american: [
//         {
//           id: "Anthony_Chair_Sitting_public",
//           name: "Anthony (Sitting)",
//           age: "Intermediate",
//           languages: ["eng", "it", "fr"],
//         },
//       ],
//     },
//     female: {
//       asian: [
//         {
//           id: "336b72634e644335ad40bd56462fc780",
//           name: "Maya",
//           age: "Young",
//           languages: ["eng", "it", "fr"],
//         },
//         {
//           id: "Alessandra_Chair_Sitting_public",
//           name: "Alessandra (Sitting)",
//           age: "Young",
//           languages: ["eng", "it", "fr"],
//         },
//         {
//           id: "Marianne_Chair_Sitting_public",
//           name: "Marianne (Sitting)",
//           age: "Intermediate",
//           languages: ["eng", "it", "fr"],
//         },
//         {
//           id: "Rika_Chair_Sitting_public",
//           name: "Rika (Sitting)",
//           age: "Intermediate",
//           languages: ["eng", "it", "fr"],
//         },
//       ],
//       hispanic: [
//         {
//           id: "37f4d912aa564663a1cf8d63acd0e1ab",
//           name: "Sofia",
//           age: "Young",
//           languages: ["eng", "it", "fr"],
//         },
//         {
//           id: "Ann_Therapist_public",
//           name: "Ann (Therapist)",
//           age: "Intermediate",
//           languages: ["eng", "it", "fr"],
//         },
//         {
//           id: "Anastasia_Chair_Sitting_public",
//           name: "Anastasia (Sitting)",
//           age: "Old",
//           languages: ["eng", "it", "fr"],
//         },
//       ],
//       african_american: [
//         {
//           id: "73c84e2b886940099c5793b085150f2f",
//           name: "Aaliyah",
//           age: "Young",
//           languages: ["eng", "it", "fr"],
//         },
//         {
//           id: "Amina_Chair_Sitting_public",
//           name: "Amina (Sitting)",
//           age: "Intermediate",
//           languages: ["eng", "it", "fr"],
//         },
//       ],
//     },
//   },
// ];

export const AVATAR_IDS = [
  {
    male: {
      asian: [
        {
          id: "49d91f1c-41c0-4c90-a28f-079c8fe4d618",
          name: "Asian Male",
          age: "Young",
          voice_id: "51afbab6-7af4-473b-95fc-6ce26aac8bb1",
          languages: ["eng", "it", "fr"],
        },
      ],
      hispanic: [
        {
          id: "1a2c53b6-8cc4-43b0-8e4c-a6edf356664f",
          name: "Hispanic Male",
          age: "Young",
          voice_id: "98a984cd-5f25-49b1-8844-2195c3d50e0f",
          languages: ["eng", "it", "fr"],
        },
      ],
      african_american: [
        {
          id: "a809ffc2-641a-474c-9b21-66c0b68124ca",
          name: "African Male",
          age: "Young",
          voice_id: "c466083f-30f0-465b-a836-0b77abfe7956",
          languages: ["eng", "it", "fr"],
        },
      ],
    },
    female: {
      asian: [
        {
          id: "ced1ac4b-62c1-418e-8ce8-bb381f73e1f6",
          name: "Asian Female",
          age: "Young",
          voice_id: "c84af063-5ce2-4370-8ef8-dcd0ef903d43",
          languages: ["eng", "it", "fr"],
        },
      ],
      hispanic: [
        {
          id: "d2b5f90d-03d4-48f2-aea7-995c8742568e",
          name: "Hispanic Female",
          age: "Young",
          voice_id: "4f3b1e99-b580-4f05-9b67-a5f585be0232",
          languages: ["eng", "it", "fr"],
        },
      ],
    },
  },
];
