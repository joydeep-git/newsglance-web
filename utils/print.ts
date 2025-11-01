const print = (data: unknown): void => {

  if (process.env.NODE_ENV !== "production") {

    console.log(data);

  } else {

    console.log(`consoles are hidden in production to prevent exposing sensitive informations.`);

  }
}

export default print;
