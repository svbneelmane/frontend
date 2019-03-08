const getEvents = () => {
  const requestOptions = {
    method: 'GET',
  };

  return fetch("https://utsavb.bastionbot.org/events", requestOptions)
    .then((response) => response.json())
    .then(events => {
        return events;
    });
}