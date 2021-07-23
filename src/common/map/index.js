/* Map Event Modules */
const eventsModules = import.meta.globEager('./modules/*.js');

export default function() {
  let events = {};
  Object.keys(eventsModules).forEach(modulePath => {
    const module = eventsModules[modulePath].default || eventsModules[modulePath];
    events = {...events, ...module};
  })

  return events;
}
