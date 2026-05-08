export const backendURL = "https://saas.todopharma.com/api";

export const getToken = () => {
  const token = localStorage.getItem("access_token");
  return { token };
};

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
