const getFeedbackCount = async (course, id) => {
    const kv = await Deno.openKv();
    const store = await kv.get(["feedbacks", course, id]);
    return store?.value ?? 0;
  };
  
  const incrementFeedbackCount = async (course, id) => {
    const kv = await Deno.openKv();
    const count = await getFeedbackCount(course, id);
    await kv.set(["feedbacks", course, id], count + 1);
  };
  
  export { getFeedbackCount, incrementFeedbackCount };