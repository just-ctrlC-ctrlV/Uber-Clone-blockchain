export const triptime = async (picklatlng, droplatlng) => {
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_MAPBOX_DIRECTION_URL}${picklatlng[0]},${picklatlng[1]};${droplatlng[0]},${droplatlng[1]}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
    )
      .then((res) => res.json())
      .then((res) => res.routes[0].duration);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
