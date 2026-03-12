// export const backendURL = "http://51.21.148.115:8001/api";
// export const backendURL = "https://backend.todopharma.com/api";
export const backendURL = "https://saas.todopharma.com/api";

export const getToken = () => {
  const token = localStorage.getItem("access_token");
  return { token };
};

export const AVATAR_IDS = [
  {
    binary: {
      african_american: [
        {
          // id: "cc2984a6003a4d5194eb58a4ad570337",
          id: "7299c55d-1f45-482d-915c-e5efdc9dd266",
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
        // {
        //   id: "Wayne_20240711",
        //   name: "Wayne",
        //   age: "Intermediate",
        //   languages: ["eng", "it", "fr"],
        // },
        {
          id: "Graham_Chair_Sitting_public",
          name: "Graham (Chair)",
          age: "Young",
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
        // {
        //   id: "Graham_Chair_Sitting_public",
        //   name: "Graham (Chair)",
        //   age: "Young",
        //   languages: ["eng", "it", "fr"],
        // },
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
        {
          id: "Rika_Chair_Sitting_public",
          name: "Rika (Sitting)",
          age: "Intermediate",
          languages: ["eng", "it", "fr"],
        },
      ],
      hispanic: [
        {
          id: "37f4d912aa564663a1cf8d63acd0e1ab",
          name: "Sofia",
          age: "Young",
          languages: ["eng", "it", "fr"],
        },
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
