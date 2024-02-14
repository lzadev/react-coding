const CAT_ENPOINT_RANDOM_FACT = "https://catfact.ninja/fact";

export const getRandomFact = async () => {
  try {
    const resp = await fetch(CAT_ENPOINT_RANDOM_FACT);
    if (!resp.ok) throw new Error("Error fetching fact");
    const data = await resp.json();
    const { fact } = data;
    return fact;
  } catch (error) {
    return console.log(error);
  }
};
